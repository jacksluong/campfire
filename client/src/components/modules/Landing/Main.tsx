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

  /* componentDidMount() {
    let children = document.getElementById("mainContainer").children;
    for (let i = 0; i < 8; i++) {
      setTimeout(() => this.setState({ typeAnimation: "Campfire".slice(0, i + 1) + "_".repeat(7 - i) }), 150 * i + 250);
    }
    for (let i = 2; i < children.length; i++) {
      setTimeout(() => {
        (children[i] as HTMLElement).style.opacity = "1";
      }, 1000 * i - 400);
    }
  } */

  joinPublicGame = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    get("/api/matchmaking").then(response => {
      console.log("matched me to", response.gameId);
      navigate(`/gameroom/${response.gameId}`);
    });
  };
  
  createPrivateGame = () => {
    get("/api/createPrivate").then(response => {
      console.log("matched me to", response.gameId, "(private)");
      navigate(`/gameroom/${response.gameId}`);
    })
  };

  handleQuestionClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {};

  render() {
    return (
      <div className="Main container" id="mainContainer">
        <div className="background"></div>
        <div className="Title-container">{this.state.typeAnimation}</div>
        <h2 className="subtitle" id="landingSubtitle">Everyone has an imaginative spark waiting to be manifested. Find yours in this collaborative storytelling game.</h2>
        <div className="Buttons-container" id="landingButtons">
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
        <div className="Help-container" id="helpButton">
          <button className="u-small-radius" onClick={this.handleQuestionClick}>
            ?
          </button>
        </div>
      </div>
    );
  }
}
export default Main;
