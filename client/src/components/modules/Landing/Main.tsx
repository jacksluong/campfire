import React, { Component } from "react";
import { RouteComponentProps, Link, Redirect, redirectTo } from "@reach/router";
import { socket } from "../../../client-socket";

import { get } from "../../../utilities";
import PrivateGameButton from "./PrivateGameButton";

interface Props {
  userId: string;
}
interface State {
  redirect: string;
}

class Main extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      redirect: null,
    };
  }
  handleQuickPlayClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log("abc");
    get("/api/whoami").then((user) => {
      if (!user) return;
      socket.on("matched", (gameId: string) => {
        console.log("gameId received is", gameId);
        this.setState({ redirect: `/gameroom/${gameId}` });
        console.log("redirect to", this.state.redirect);
      });
      socket.emit("matchmaking", user._id);
    });
  };
  createPrivateGame = () => {
    console.log("Create new private game");
    alert("create private game");
  };

  handleQuestionClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

  render() {
    if (this.state.redirect) {
      console.log("redirected to", this.state.redirect);
      return <Redirect noThrow={true} to={this.state.redirect} />;
    }
    return (
      <div className="Main Container">
        <div className="Title-container"> Campfire</div>
        <div className="Buttons-container">
          <button
            type="submit"
            value="Create Game"
            className="Button"
            onClick={this.handleQuickPlayClick}
          >
            Quick play
          </button>
          <PrivateGameButton
            userId={this.props.userId}
            createPrivateGame={this.createPrivateGame}
          />
        </div>
        <div className="Help-container">
          <button className="u-small-radius" onClick={this.handleQuestionClick}>
            ?
          </button>
        </div>
      </div>
    );
  }
}
export default Main;
