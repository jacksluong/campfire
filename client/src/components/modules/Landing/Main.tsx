import React, { Component } from "react";
import { navigate } from "@reach/router";
import { socket } from "../../../client-socket";

import { get } from "../../../utilities";
import PrivateGameButton from "./PrivateGameButton";

interface Props {
  userId: string;
}
interface State {}

class Main extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  joinPublicGame = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    get("/api/matchmaking").then((response) => {
      console.log("matched me to", response.gameId);
      navigate(`/gameroom/${response.gameId}`);
    });
  };

  createPrivateGame = () => {
    get("/api/createPrivate").then((response) => {
      console.log("matched me to", response.gameId, "(private)");
      navigate(`/gameroom/${response.gameId}`);
    });
  };

  handleQuestionClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

  render() {
    return (
      <div className="Main Container">
        <div className="Title-container"> Campfire</div>
        <div className="Buttons-container">
          <button
            type="submit"
            value="Create Game"
            className="Button"
            onClick={this.joinPublicGame}
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
