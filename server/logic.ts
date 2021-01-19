import User from "../shared/User";
import Player from "../shared/Player";

/** Interfaces */

export interface GameState {
  gameId: string;
  players: Player[];
  currentStory: string;
  currentTurn: number;
  currentInput: string;
  endVotes: number;
  gameOver: boolean;
}

/** Utils */

/** Game State */
const gameState: GameState = {
  gameId: "",
  players: [],
  currentStory: "",
  currentTurn: -1,
  currentInput: "",
  endVotes: 0,
  gameOver: false,
};

const addPlayer = (user: User, socketId: string): void => {
  const existingPlayer: Player | undefined = gameState.players.find((player) => player.socketId == socketId);
  if (existingPlayer) {
    existingPlayer.disconnected = false;
  } else {
    let userId = !user ? "guest" : (user._id + "");
    let name = !user ? `guest${Math.ceil(Math.random() * 99999) + 1}` : user.name;
    let health = 100;
    if (gameState.currentTurn !== -1) {
      let average = 0;
      for (let player of gameState.players) average += player.health;
      health = Math.ceil(average / gameState.players.length);
    }
    gameState.players.push({
      userId: userId,
      socketId: socketId,
      name: name,
      health: health,
      wordFrequencies: new Map<string, number>()
    });
    let startCondition = gameState.players.length >= 3; // NOTE: modify this after MVP
    if (gameState.currentTurn === -1 && startCondition) {
      gameState.currentTurn = Math.ceil(Math.random() * (gameState.players.length - 1) + 1); // start game, select random playter to start
    }
  }
};

const disconnectPlayer = (socketId: string): void => {
  const disconnectedPlayer = gameState.players.find((player) => player.socketId == socketId);
  disconnectedPlayer.disconnected = true;
};

const addToStory = (text: string): void => {
  // format text (remove whitespace, add period if necessary) here
  gameState.currentStory += text;
  gameState.currentTurn = (gameState.currentTurn + 1) % gameState.players.length;
};

const resetGameState = (): void => {
  gameState.gameId = "";
  gameState.players = [];
  gameState.currentStory = "";
  gameState.currentTurn = -1;
  gameState.currentInput = "";
  gameState.endVotes = 0;
  gameState.gameOver = false;
};

export { gameState, addPlayer, disconnectPlayer, addToStory, resetGameState };
