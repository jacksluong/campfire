import User from "../shared/User";
import Player from "../shared/Player";

/** Consts */

const ROOM_CAPACITY = 8;

/** Game State */

export interface GameState {
  // Users
  gameId: string;
  players: Player[];
  spectators: string[]; // socket ids of players who joined

  // Story
  currentStory: string;
  currentTurn: number;
  currentInput: string;

  // Voting
  readyVotes: number[]; // indices of players
  endVotes: number;
  publishVotes: number;

  // Status
  isPublished: boolean;
  gameOver: boolean;
}

const gameState: GameState = {
  gameId: "",
  players: [],
  spectators: [],

  currentStory: "",
  currentTurn: -1,
  currentInput: "",

  readyVotes: [],
  endVotes: 0, // TODO: change votes properties to type array (to keep track of who actually did vote)
  publishVotes: 0,

  isPublished: false,
  gameOver: false,
};

/** Primary Functions */

const addPlayer = (user: User, socketId: string): void => {
  // check if user was in-game (by socket or id)
  const existingPlayer: Player | undefined = gameState.players.find(
    (player) => player.socketId == socketId || player.userId == user?._id
  );
  if (existingPlayer) {
    console.log(`returning ${existingPlayer.name} to game`);
    existingPlayer.socketId = socketId;
    existingPlayer.disconnected = false;
  } else {
    if (gameState.currentTurn !== -1 || gameState.players.length === ROOM_CAPACITY) {
      // add as spectator if game is in progress or full
      if (gameState.spectators.indexOf(socketId) === -1) {
        gameState.spectators.push(socketId);
        return;
      }
    }

    // create player
    let userId = !user ? "guest" : user._id + "";
    let name = !user ? `guest${Math.ceil(Math.random() * 99999) + 1}` : user.name;
    let health = 100;
    gameState.players.push({
      userId: userId,
      socketId: socketId,
      name: name,
      health: health,
      wordFrequencies: new Map<string, number>(),
    });

    // game start condition
    if (gameState.currentTurn === -1 && startCondition()) {
      gameState.currentTurn = Math.floor(Math.random() * gameState.players.length);
    }
  }
};

const disconnectPlayer = (socketId: string): void => {
  const disconnectedPlayer = gameState.players.find((player) => player.socketId == socketId);
  if (disconnectedPlayer) {
    console.log("disconnecting ", disconnectPlayer.name);
    disconnectedPlayer.disconnected = true;
  }
};

const addToStory = (text: string): void => {
  // NOTE: format text (remove whitespace, add period if necessary) here
  gameState.currentStory += text;
  gameState.currentTurn = (gameState.currentTurn + 1) % gameState.players.length;
};

const resetGameState = (): void => {
  // can't change the pointer of gameState because we export this pointer
  gameState.gameId = "";
  gameState.players = [];
  gameState.spectators = [];
  gameState.currentStory = "";
  gameState.currentTurn = -1;
  gameState.currentInput = "";
  gameState.endVotes = 0;
  gameState.publishVotes = 0;
  gameState.isPublished = false;
  gameState.gameOver = false;
};

/** Utilities */

const startCondition = (): boolean => {
  return gameState.players.length >= 3; // NOTE: modify this after MVP
};

export { gameState, addPlayer, disconnectPlayer, addToStory, resetGameState };
