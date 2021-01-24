import React, { Component } from "react";
import Sidebar from "../modules/GameRoom/Sidebar/Sidebar";
import GameDisplay from "../modules/GameRoom/GameDisplay/GameDisplay";
import { navigate, RouteComponentProps } from "@reach/router";
import Player from "../../../../shared/Player";
import { socket } from "../../client-socket";

import { get, post } from "../../utilities";

interface Props extends RouteComponentProps {
  gameId?: string;
  userId: string;
} // replaced "Props & RouteComponentProps" with "RouteComponentProps" because that's the primary way we are receiving props for this component

interface State {
  isPrivate: boolean;
  timeout: any;
  userId: string;
  players: Player[];
  readyPlayers: number[];
  spectators: string[];
  currentStory: string;
  currentTurn: number;
  currentInput: string;
}

const TIMEOUT_SECONDS = 60;

class GameRoom extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isPrivate: false,
      timeout: undefined,
      userId: "",
      players: [],
      readyPlayers: [],
      spectators: [],
      currentStory: "",
      currentTurn: -1,
      currentInput: "",
    };
  }

  componentDidMount() {
    socket.on("gameUpdate", gameState => {
      // on game start or player ready
      this.setState({
        readyPlayers: gameState.readyVotes,
        currentTurn: gameState.currentTurn
      })
      if (gameState.currentTurn !== -1) clearTimeout(this.state.timeout);
    })
    socket.on("playersUpdate", (gameState) => {
      // on player join or leave
      this.setState({
        isPrivate: gameState.isPrivate,
        players: gameState.players,
        readyPlayers: gameState.readyVotes,
        currentTurn: gameState.currentTurn,
        spectators: gameState.spectators,
      });
      if (!gameState.isPrivate) this.resetTimeout();
    });
    socket.on("storyUpdate", (gameState) => {
      // on input submit
      this.setState({
        currentStory: gameState.currentStory,
        currentTurn: gameState.currentTurn,
        currentInput: "",
      });
    });
    socket.on("inputUpdate", (content: string) => {
      // on type
      this.setState({
        currentInput: content,
      });
    });
    socket.on("gameOver", () => {
      navigate(`/end/${this.props.gameId}`);
    });
    socket.emit("join", { userId: this.props.userId, gameId: this.props.gameId });
  }

  componentWillUnmount() {
    post("/api/leaveGame", { socketId: socket.id });
  }

  startTimeout = (): void => {
    this.setState({ 
      timeout: setTimeout(() => 
        navigate("/", { state: { message: "You were idle for too long and kicked out of the game." } })
    , 1000 * TIMEOUT_SECONDS)
    });
  }

  resetTimeout = (): void => {
    if (this.state.timeout) clearTimeout(this.state.timeout);
    if (!this.state.isPrivate &&
      this.state.currentTurn === -1 && 
      !this.state.readyPlayers.includes(this.state.players.findIndex(player => player.socketId === socket.id))) 
      this.startTimeout();
  }

  render() {
    return (
      <div className="GameRoom container">
        <Sidebar
          resetTimeout={this.resetTimeout}
          gameId={this.props.gameId}
          players={this.state.players}
          readyPlayers={this.state.readyPlayers}
          currentTurn={this.state.currentTurn}
          spectators={this.state.spectators}
        />
        <GameDisplay
          resetTimeout={this.resetTimeout}
          players={this.state.players}
          currentStory={this.state.currentStory}
          currentTurn={this.state.currentTurn}
          currentInput={this.state.currentInput}
          gameId={this.props.gameId}
          userId={this.props.userId}
        />
      </div>
    );
  }
}

export default GameRoom;
