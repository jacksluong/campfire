import User from "../shared/User";
import Player from "../shared/Player";
import { resolveModuleNameFromCache } from "typescript";

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
  endVotes: number[];
  publishVotes: number;
  
  // Status
  isPrivate: boolean;
  isPublished: boolean;
  gameOver: boolean;
}

const rooms: GameState[] = [];

/** Primary Functions */

const addPlayer = (gameId: string, user: User, socketId: string): GameState | undefined => {
  const gameState = getRoomById(gameId);
  if (!gameState) {
    return undefined;
  }

  // check if user was in-game (by socket or id)
  const existingPlayer: Player | undefined = 
    gameState.players.find((player) => player.socketId == socketId || player.userId == user?._id);
  if (existingPlayer) {
    console.log(`returning ${existingPlayer.name} to game`);
    existingPlayer.socketId = socketId;
    existingPlayer.disconnected = false;
  } else {
    if (gameState.currentTurn !== -1 || gameState.players.length === ROOM_CAPACITY) {
      // add as spectator if game is in progress or full
      if (gameState.spectators.indexOf(socketId) === -1) {
        gameState.spectators.push(socketId);
        return gameState;
      }
    }

    // create player
    let userId = !user ? "guest" : (user._id + "");
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
    if (gameState.currentTurn === -1 && startCondition(gameState)) {
      gameState.currentTurn = Math.floor(Math.random() * gameState.players.length);
    }
  }

  return gameState;
};

const disconnectPlayer = (socketId: string): GameState | undefined=> {
  for (let index = 0; index < rooms.length; index++) {
    const room = rooms[index];
    for (let i = 0; i < room.players.length; i++) {
      if (room.players[i].socketId == socketId) {
        console.log("disconnecting ", room.players[i].name);
        if (room.currentTurn === -1) {
          // remove if game hasn't started
          room.players.splice(i, 1);
        } else {
          // take action if current turn or last active player was this person
          room.players[i].disconnected = true;
          if (getConnectedPlayers(room).length === 0) {
            rooms.splice(index, 1);
            return room;
          } else if (room.currentTurn === i) {
            while (room.players[room.currentTurn].disconnected) room.currentTurn = (room.currentTurn + 1) % room.players.length;
          }
        }
        return room;
      }
    }
    for (let i = 0; i < room.spectators.length; i++) {
      if (room.spectators[i] == socketId) {
        room.spectators.splice(i, 1);
        return room;
      }
    }
  }
  return;
};

const addToStory = (gameId: string, text: string): GameState => {
  console.log("adding to gameId", gameId, " with rooms list as", rooms);
  const gameState = getRoomById(gameId)!;

  gameState.currentStory += text;
  gameState.currentTurn = (gameState.currentTurn + 1) % gameState.players.length;
  while (gameState.players[gameState.currentTurn].disconnected) gameState.currentTurn = (gameState.currentTurn + 1) % gameState.players.length;

  return gameState;
};

/** Voting */

const processEndgameVote = (gameId: string, socketId: string): GameState => {
  // identify index of this player in given room
  const gameState = rooms.find(room => room.gameId == gameId)!; // assume game will be found
  let playerIndex = -1;
  for (let i = 0; i < gameState.players.length; i++) {
    if (gameState.players[i].socketId == socketId) {
      playerIndex = i;
      break;
    }
  }
  // add to endVotes if not already there
  if (!gameState.endVotes.find(index => index === playerIndex)) {
    gameState.endVotes.push(playerIndex);
  }
  // check end condition
  if (gameState.endVotes.length >= Math.ceil(getConnectedPlayers(gameState).length / 2)) {
    gameState.gameOver = true;
  }
  return gameState;
}

/** Utilities */

const getConnectedPlayers = (room: GameState): Player[] => {
  return room.players.filter(player => !player.disconnected);
}

const startCondition = (gameState: GameState): boolean => {
  return gameState.players.length === 3;
  // let minimum = gameState.isPrivate ? 2 : 3
  // return gameState.players.length >= minimum && gameState.readyVotes.length > gameState.players.length / 2;
}

const createRoom = (isPrivate: boolean): GameState => {
  let r = Math.random().toString(36).substring(7);
  for (; rooms.find(state => state.gameId == r); r = Math.random().toString(36).substring(7));
  let newGame: GameState = {
    gameId: r,
    players: [],
    spectators: [],
  
    currentStory: "",
    currentTurn: -1,
    currentInput: "",
    
    readyVotes: [],
    endVotes: [], // TODO: change votes properties to type array (to keep track of who actually did vote)
    publishVotes: 0,
  
    isPrivate: isPrivate,
    isPublished: false,
    gameOver: false
  };
  rooms.push(newGame);
  return newGame;
}

const getRoomById = (gameId: string): GameState | undefined => {
  return rooms.find(room => room.gameId == gameId);
}

const getRoomByPlayer = (userId: string): GameState | undefined => {
  return rooms.find(room => {
    for (let player of room.players) {
      if (player.userId == userId) return true;
    }
  })
}

const findOpenRoom = (): string => {
  let room = rooms.find(room => room.currentTurn === -1 && !room.isPrivate)
  return (room ?? createRoom(false)).gameId;
}

// TODO: room garbage collector

export { addPlayer, disconnectPlayer, addToStory, processEndgameVote, findOpenRoom, getRoomById, getRoomByPlayer };
