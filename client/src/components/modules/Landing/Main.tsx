import React, { Component } from "react";
import { navigate } from "@reach/router";

import { get } from "../../../utilities";
import PrivateGameButton from "./PrivateGameButton";

interface Props {
  userId: string;
}
interface State {
  typeAnimation: string;
} 

class Main extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { typeAnimation: "________" }
  }

  componentDidMount() {
    let children = document.getElementById("mainContainer").children;
    for (let i = 0; i < 8; i++) {
      setTimeout(() => this.setState({ typeAnimation: "campfire".slice(0, i + 1) + "_".repeat(7 - i) }), 150 * i + 250);
    }
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
      <div className="Main container" id="mainContainer">
        <div className="backgroundImg"></div>
        <div className="backgroundColor"></div>
        <div className="title">{this.state.typeAnimation}</div>
        <h3 className="subtitle" id="landingSubtitle">find your inner creative spark in this collaborative storytelling game.</h3>
        <div className="buttonsContainer" id="landingButtons">
          <button
            type="submit"
            value="Create Game"
            className="gameButton"
            onClick={this.joinPublicGame}
          >
            QUICK PLAY
          </button>
          <PrivateGameButton
            userId={this.props.userId}
            createPrivateGame={this.createPrivateGame}
          />
        </div>
      </div>
    );
  }
}
export default Main;
