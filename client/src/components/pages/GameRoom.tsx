import React, { Component } from "react";
import Sidebar from "../modules/GameRoom/Sidebar/Sidebar";
import GameDisplay from "../modules/GameRoom/GameDisplay/GameDisplay";
import { RouteComponentProps } from "@reach/router";
import Player from "../../../../shared/Player";
import { socket } from "../../client-socket";
import "../../../src/components/modules/GameRoom/GameRoom.scss";
import "../../../src/components/modules/GameRoom/Sidebar/Sidebar.scss";
import "../../../src/components/modules/GameRoom/GameDisplay/GameDisplay.scss";

import { get, post } from "../../utilities";
import { GameState } from "../../../../server/logic";

interface Props extends RouteComponentProps {
  gameId?: string;
  userId: string;
} // replaced "Props & RouteComponentProps" with "RouteComponentProps" because that's the primary way we are receiving props for this component

interface State {
  gameId: string;
  players: Player[];
  currentStory: string;
  currentTurn: number;
  currentInput: string;
}

//todo: replace players state with those from database
class GameRoom extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      gameId: "gameIdGoesHere",
      players: [],
      currentStory: "",
      currentTurn: -1,
      currentInput: "",
    };
  }

  componentDidMount() {
    console.log("props.gameId is ", this.props.gameId);
    socket.on("playersupdate", (gameState: GameState) => {
      // on player join or leave
      this.setState({
        players: gameState.players,
        currentTurn: gameState.currentTurn
      });
    });
    socket.emit("join", this.props.userId);
    socket.on("storyUpdate", (gameState: GameState) => {
      this.setState({
        currentStory: gameState.currentStory,
        currentTurn: gameState.currentTurn
      });
    });
  }

  render() {
    return (
      <div className="GameRoom-container">
        <div className="Sidebar-container">
          <Sidebar players={this.state.players} currentTurn={this.state.currentTurn} />
        </div>
        <div className="GameDisplay-container">
          <GameDisplay
            players={this.state.players}
            currentStory={this.state.currentStory}
            currentTurn={this.state.currentTurn}
            currentInput={this.state.currentInput}
            gameId={this.state.gameId}
            userId={this.props.userId}
          />
        </div>
      </div>
    );
  }
}

export default GameRoom;
