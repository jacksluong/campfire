import React, { Component } from "react";
import { navigate, Router } from "@reach/router";
import { get, post } from "../utilities";
import NotFound from "./pages/NotFound";
import { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import { socket } from "../client-socket";
import User from "../../../shared/User";
import "../styles/output.css";
import GameRoom from "./pages/GameRoom";
import Landing from "./pages/Landing";
import Profile from "./pages/Profile";
import Gallery from "./pages/Gallery";

type State = {
  userId: string;
  userPfp: string;
};

class App extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      userId: undefined,
      userPfp: undefined,
    };
  }

  componentDidMount() {
    get("/api/whoami")
      .then((user: User) => {
        if (user._id) {
          // They are registered in the database and currently logged in.
          this.setState({ userId: user._id, userPfp: user.pfp });
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
        this.setState({ userId: user._id, userPfp: user.pfp });
        post("/api/initsocket", { socketid: socket.id });
      });
    }
  };

  handleLogout = () => {
    this.setState({ userId: undefined, userPfp: undefined });
    post("/api/logout");
  };

  render() {
    return (
      <Router>
        <Landing
          path="/"
          userId={this.state.userId}
          pfp={this.state.userPfp}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
        />
        <GameRoom path="/gameroom/:gameId" userId={this.state.userId} />
        <Gallery
          path="/gallery"
          userId={this.state.userId}
          pfp={this.state.userPfp}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
        />
        <Profile
          userId={this.state.userId}
          path="/profile/:userId"
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
        />
        <NotFound default={true} />
      </Router>
    );
  }
}

export default App;
