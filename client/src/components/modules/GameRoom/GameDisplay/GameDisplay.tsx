import React, { Component } from "react";
import StoryText from "./StoryText";
import Gathering from "./Gathering";
import GameInputField from "./GameInputField";
import Player from "../../../../../../shared/Player";

interface Props {
  players: Player[];
  currentStory: string;
  currentChef: string;
  storyInput: string;
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
        <StoryText currentStory={this.props.currentStory} storyInput={this.props.storyInput} />
        <Gathering players={this.props.players} currentChef={this.props.currentChef} />
        <GameInputField />
      </div>
    );
  }
}

export default GameDisplay;
