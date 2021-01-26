import React, { Component } from "react";
import { RouteComponentProps, Link, navigate } from "@reach/router";
import Player from "../../../../../shared/Player";
import { get } from "../../../utilities";
import { socket } from "../../../client-socket";

type Props = {};

type State = {
  redirect: string;
};

class Navigation extends Component<Props & RouteComponentProps, State> {
  constructor(props) {
    super(props);
  }

  handlePlayAgain = (): void => {
    get("/api/matchmaking").then((response) => {
      console.log("play again! matched me to", response.gameId);
      navigate(`/gameroom/${response.gameId}`);
    });
  };

  render() {
    return (
      <div className="Navigation-container">
        <Link to="/" className="Navigation-link">
          Home
        </Link>
        <span onClick={this.handlePlayAgain} className="Navigation-link">
          Play Again
        </span>
      </div>
    );
  }
}
export default Navigation;
