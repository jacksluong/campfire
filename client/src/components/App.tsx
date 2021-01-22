import React, { Component } from "react";
import { navigate, Router } from "@reach/router";
import { get, post } from "../utilities";
import NotFound from "./pages/NotFound";
import Skeleton from "./pages/Skeleton";
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import "../utilities.scss";
import GameRoom from "./pages/GameRoom";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Gallery from "./pages/Gallery";
import End from "./pages/End";

type State = {
  userId: string;
};

class App extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami")
      .then((user: User) => {
        if (user._id) {
          // They are registered in the database and currently logged in.
          this.setState({ userId: user._id });
        }
      })
      .then(() =>
        socket.on("connect", () => {
          post("/api/initsocket", { socketid: socket.id });
          socket.on("redirectHome", () => navigate("/"));
        })
      );
  }

  handleLogin = (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if ("tokenObj" in res) {
      console.log(`Logged in as ${res.profileObj.name}`);
      const userToken = res.tokenObj.id_token;
      post("/api/login", { token: userToken }).then((user: User) => {
        this.setState({ userId: user._id });
        post("/api/initsocket", { socketid: socket.id });
      });
    }
  };

  handleLogout = () => {
    this.setState({ userId: undefined });
    post("/api/logout");
  };

  render() {
    // NOTE:
    return (
      <Router>
        <GameRoom path="/gameroom/:gameId" userId={this.state.userId} />
        <Gallery path="/gallery" userId={this.state.userId} />
        <Landing
          path="/"
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          userId={this.state.userId}
        />
        <Profile path="/profile" />
        <End path="/end/:gameId" />
        <NotFound default={true} />
      </Router>
    );
  }
}

export default App;
