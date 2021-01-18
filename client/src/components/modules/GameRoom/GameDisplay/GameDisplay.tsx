import React, { Component } from "react";
import StoryText from "./StoryText";
import Gathering from "./Gathering";
import GameInputField from "./GameInputField";
import Player from "../../../../../../shared/Player";
import "./GameDisplay.scss";

interface Props {
  players: Player[];
  currentStory: string;
  currentTurn: number;
  currentInput: string;
  gameId: string;
  userId: string;
}

interface State {}

class GameDisplay extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="GameDisplay-container">
        <StoryText currentStory={this.props.currentStory} currentInput={this.props.currentInput} />
        <Gathering players={this.props.players} currentTurn={this.props.currentTurn} />
      </div>
    );
  }
}

export default GameDisplay;
