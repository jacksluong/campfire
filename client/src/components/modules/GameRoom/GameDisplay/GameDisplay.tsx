import React, { Component } from "react";
import StoryText from "./StoryText";
import Gathering from "./Gathering";
import GameInputField from "./GameInputField";
import Player from "../../../../../../shared/Player";
import { socket } from "../../../../client-socket";
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
    let input: any = "";
    if (this.props.players.find(player => player.socketId == socket.id || player.userId == this.props.userId)) {
      input = <GameInputField
        gameId={this.props.gameId}
        userId={this.props.userId}
        enabled={
          this.props.currentTurn !== -1 &&
          this.props.players[this.props.currentTurn].socketId === socket.id
        }
      />
    }
    return (
      <div className="GameDisplay-container">
        <StoryText currentStory={this.props.currentStory} currentInput={this.props.currentInput} />
        <Gathering players={this.props.players} currentTurn={this.props.currentTurn} />
        {input}
      </div>
    );
  }
}

export default GameDisplay;
