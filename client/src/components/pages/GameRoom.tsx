import React, { Component } from "react";
import Sidebar from "../modules/GameRoom/Sidebar/Sidebar";
import GameDisplay from "../modules/GameRoom/GameDisplay/GameDisplay";
import { RouteComponentProps } from "@reach/router";
import Player from "../../../../shared/Player";
import { socket } from "../../client-socket"
import "../../../src/components/modules/GameRoom/GameRoom.scss";
import "../../../src/components/modules/GameRoom/Sidebar/Sidebar.scss";
import "../../../src/components/modules/GameRoom/GameDisplay/GameDisplay.scss";

import { get, post } from "../../utilities";
import { GameState } from "../../../../server/logic";

interface Props {
  userId: string
} // replaced "Props & RouteComponentProps" with "RouteComponentProps" because that's the primary way we are receiving props for this component

interface State {
  players: Player[];
  currentStory: string;
  currentTurn: string;
  currentInput: string;
}

//todo: replace players state with those from database
class GameRoom extends Component<Props & RouteComponentProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      currentStory: "",
      currentTurn: "",
      currentInput: "",
    };
  }

  componentDidMount() {
    socket.on("playersupdate", (gameState: GameState) => { // on player join or leave
      this.setState({
        players: gameState.players
      });
    })
    socket.emit("join", this.props.userId);
  }

  render() {
    console.log("Game room rendered with players list", this.state.players);
    return (
      <div className="GameRoom-container">
        <div className="Sidebar-container">
          <Sidebar players={this.state.players} currentTurn={this.state.currentTurn} />
        </div>
        <div className="GameDisplay-container">
          <GameDisplay
            players={this.state.players}
            currentStory={this.state.currentStory}
            currentChef={this.state.currentTurn}
            storyInput={this.state.currentInput}
          />
        </div>
      </div>
    );
  }
}

export default GameRoom;
