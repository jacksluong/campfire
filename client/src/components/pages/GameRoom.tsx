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
}

interface State {
  isPrivate: boolean;
  timeout: any;
  players: Player[];
  readyPlayers: number[];
  spectators: string[];
  currentTurn: number;
  currentInput: string;
  taggedPlayer: number; // index of this player

  //story state vars
  currentStory: string;
  title: string;
  keywords: string[];

  ended: boolean;
}

const TIMEOUT_SECONDS = 60;

class GameRoom extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isPrivate: false,
      timeout: undefined,
      players: [],
      readyPlayers: [],
      spectators: [],
      currentTurn: -1,
      currentInput: "",
      taggedPlayer: -1,

      //story info
      currentStory: "",
      title: "",
      keywords: [],

      //control game display
      ended: false,
    };
  }
  
  componentDidMount() {
    socket.on("gameUpdate", (gameState) => {
      // on game start or player ready
      this.setState({
        readyPlayers: gameState.readyVotes,
        currentTurn: gameState.currentTurn,
        taggedPlayer: gameState.currentTurn === -1 ? -1 : (gameState.currentTurn + 1) % gameState.players.length
      });
      if (gameState.currentTurn !== -1) clearTimeout(this.state.timeout);
    });
    socket.on("playersUpdate", (gameState) => {
      console.log("received players update");
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
      let highestHealthIndex = -1;
      let highestHealth = -1;
      for (let i = 0; i < gameState.players.length; i++) {
        if (gameState.players[i].socketId === socket.id) continue;
        else if (highestHealth === -1) {
          highestHealthIndex = i;
          highestHealth = gameState.players[i].health;
        } else if (gameState.players[i].health > highestHealth) {
          highestHealthIndex = i;
          highestHealth = gameState.players[i].health;
        }
      }
      this.setState({
        currentStory: gameState.currentStory,
        players: gameState.players,
        currentTurn: gameState.currentTurn,
        currentInput: "",
        taggedPlayer: highestHealthIndex,
      });
    });
    socket.on("inputUpdate", (content: string) => {
      // on type
      this.setState({
        currentInput: content,
      });
    });

    //Game over here
    socket.on("gameOver", (data) => {
      this.setState({
        ended: true,
        title: data.title,
        keywords: data.keywords,
      });
      console.log("in gameroom gameover socket");
      console.log(`title: ${data.title}`);
      console.log(`keywords: ${data.keywords}`);
    });

    this.joinGame();
  }

  joinGame = () => {
    if (socket.id !== undefined) {
      post("/api/join", { gameId: this.props.gameId, socketId: socket.id });
    } else {
      setTimeout(this.joinGame, 80);
    }
  }

  componentWillUnmount() {
    this.resetTimeout(true);
    post("/api/leaveGame", { socketId: socket.id });
  }

  startTimeout = (): void => {
    this.setState({
      timeout: setTimeout(
        () =>
          navigate("/", {
            state: { message: "You were idle for too long and kicked out of the game." },
          }),
        1000 * TIMEOUT_SECONDS
      ),
    });
  };

  resetTimeout = (forceStop: boolean = false): void => {
    if (this.state.timeout) clearTimeout(this.state.timeout);
    if (
      !forceStop &&
      !this.state.isPrivate &&
      this.state.currentTurn === -1 &&
      !this.state.readyPlayers.includes(
        this.state.players.findIndex((player) => player.socketId === socket.id)
      )
    )
      this.startTimeout();
  };

  handlePlayerClick = (index: number) => {
    if (this.state.currentTurn !== -1) this.setState({ taggedPlayer: index });
  }

  handleStoryInputSubmit = (text: string): Promise<any> => {
    return post("/api/inputSubmit", {
      content: text,
      nextPlayer: this.state.taggedPlayer,
      gameId: this.props.gameId,
      socketId: socket.id,
    });
  };

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
          taggedPlayer={this.state.taggedPlayer}
          gameId={this.props.gameId}
          userId={this.props.userId}
          title={this.state.title}
          keywords={this.state.keywords}
          ended={this.state.ended}
          handlePlayerClick={this.handlePlayerClick}
          handleStoryInputSubmit={this.handleStoryInputSubmit}
        />
      </div>
    );
  }
}

export default GameRoom;
