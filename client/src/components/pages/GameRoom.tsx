import React, { Component } from "react";
import Sidebar from "../modules/GameRoom/Sidebar/Sidebar";
import GameDisplay from "../modules/GameRoom/GameDisplay/GameDisplay";
import { navigate, RouteComponentProps } from "@reach/router";
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
  userId: string;
  players: Player[];
  spectators: number;
  currentStory: string;
  currentTurn: number;
  currentInput: string;
}

//todo: replace players state with those from database
class GameRoom extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      players: [],
      spectators: 0,
      currentStory: "",
      currentTurn: -1,
      currentInput: "",
    };
  }

  componentDidMount() {
    socket.on("playersUpdate", (gameState: GameState) => {
      // on player join or leave
      this.setState({
        players: gameState.players,
        spectators: gameState.spectators.length,
        currentStory: gameState.currentStory,
        currentTurn: gameState.currentTurn,
        currentInput: gameState.currentInput
      });
    });
    socket.on("storyUpdate", (gameState: GameState) => {
      this.setState({
        currentStory: gameState.currentStory,
        currentTurn: gameState.currentTurn,
        currentInput: "",
      });
    });
    socket.on("updateChange", (content: string) => {
      this.setState({
        currentInput: content,
      });
    });
    socket.emit("join", { userId: this.props.userId, gameId: this.props.gameId });
  }

  componentWillUnmount() {
    post("/api/leaveGame", { socketId: socket.id });
  }

  render() {
    return (
      <div className="GameRoom-container">
        <div className="Sidebar-container">
          <Sidebar
            players={this.state.players}
            currentTurn={this.state.currentTurn}
            spectators={this.state.spectators}
          />
        </div>
        <div className="GameDisplay-container">
          <GameDisplay
            players={this.state.players}
            currentStory={this.state.currentStory}
            currentTurn={this.state.currentTurn}
            currentInput={this.state.currentInput}
            gameId={this.props.gameId}
            userId={this.props.userId}
          />
        </div>
      </div>
    );
  }
}

export default GameRoom;
