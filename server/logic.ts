import User from "../shared/User";
import Player from "../shared/Player";
import socketManager from "./server-socket";
import { gameOver } from "./api";

/** Consts */

const ROOM_CAPACITY = 8;

/** Game State */

export interface GameState {
  // Users
  gameId: string;
  players: Player[];
  spectators: string[]; // socket ids

  // Story
  currentStory: string;
  currentTurn: number;
  healthTimer: NodeJS.Timeout | undefined;

  // Voting
  readyVotes: number[]; // indices of players
  endVotes: (boolean | undefined)[]; // haven't voted, voted no, voted yes
  publishVotes: number[];

  // Status
  isPrivate: boolean;
  isPublished: boolean;
  gameOver: boolean | undefined;
}

const rooms: GameState[] = [];

/** Room Functions */

const createRoom = (isPrivate: boolean): GameState => {
  let r = Math.random().toString(36).substring(7);
  for (; rooms.find((state) => state.gameId == r); r = Math.random().toString(36).substring(7));
  let newGame: GameState = {
    gameId: r,
    players: [],
    spectators: [],

    currentStory: "",
    currentTurn: -1,
    healthTimer: undefined,

    readyVotes: [],
    endVotes: [],
    publishVotes: [],

    isPrivate: isPrivate,
    isPublished: false,
    gameOver: undefined,
  };
  rooms.push(newGame);
  return newGame;
};

const matchmake = (userId: string | undefined = undefined): string => {
  // if a user was in a game that's still in progress, return them there
  if (userId) {
    let room = getRoomByPlayer(userId);
    if (room?.gameOver === false) return room.gameId;
  }

  // otherwise find next open room
  let room = rooms.find((room) => !room.gameOver && room.currentTurn === -1 && !room.isPrivate);
  return (room ?? createRoom(false)).gameId;
};

const getRoomById = (gameId: string): GameState | undefined => {
  return rooms.find((room) => room.gameId == gameId);
};

const getRoomByPlayer = (userId: string): GameState | undefined => {
  return rooms.find((room) => {
    for (let player of room.players) {
      if (player.userId == userId) return true;
    }
  });
};

/** Player Functions */

const addPlayer = (gameId: string, user: User, socketId: string): GameState | undefined => {
  const gameState = getRoomById(gameId);
  if (!gameState) {
    return undefined;
  }

  // check if user was in-game (by socket or id)
  const existingPlayer: Player | undefined = gameState.players.find(
    (player) => player.socketId === socketId || player.userId === user?._id
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
        return gameState;
      }
    }

    // create player
    let userId = !user ? "guest" : user._id + "";
    let name = !user ? `guest${Math.ceil(Math.random() * 99999) + 1}` : user.name;
    gameState.players.push({
      userId: userId,
      socketId: socketId,
      pfp: user?.pfp,
      name: name,
      health: 100,
      wordFrequencies: [],
    });
    resetHealth(gameState);
    gameState.endVotes.push(undefined);
  }

  return gameState;
};

const disconnectPlayer = (socketId: string): GameState | undefined => {
  for (let index = 0; index < rooms.length; index++) {
    const room = rooms[index];
    if (room.gameOver) continue; // disregard finished games
    for (let i = 0; i < room.players.length; i++) {
      if (room.players[i].socketId == socketId) {
        if (room.currentTurn === -1) {
          // remove if game hasn't started
          remove(room.readyVotes, i);
          room.readyVotes = room.readyVotes.map((playerIndex) =>
            playerIndex > i ? playerIndex - 1 : playerIndex
          );
          room.players.splice(i, 1);
          resetHealth(room);
        } else {
          // take action if current turn or last active player was this person
          room.players[i].disconnected = true;
          if (getConnectedPlayers(room).length === 0) {
            rooms.splice(index, 1);
            return room;
          } else if (room.currentTurn === i) {
            if (room.healthTimer) clearTimeout(room.healthTimer);
            let nextPlayer = findNextAvailablePlayer(room);
            if (nextPlayer) {
              room.currentTurn = nextPlayer;
              room.healthTimer = decreaseHealth(room);
            } else {
              // all remaining players have no health
              room.gameOver = true;
              gameOver(room);
              return;
            }
          }
        }
        return room;
      }
    }
    if (remove(room.spectators, socketId)) return room;
  }
  return;
};

const getConnectedPlayers = (room: GameState): Player[] => {
  return room.players.filter((player) => !player.disconnected);
};

/** Gamewide Actions */

const addToStory = (gameId: string, text: string, nextPlayer: number): GameState => {
  const gameState = getRoomById(gameId)!;

  gameState.currentStory += text;
  gameState.currentTurn = nextPlayer;
  if (gameState.healthTimer) clearTimeout(gameState.healthTimer);
  gameState.healthTimer = decreaseHealth(gameState);

  return gameState;
};

const addToPlayer = (gameId: string, socketId: string, text: string): GameState => {
  //find room and player to update
  const room = getRoomById(gameId)!;
  const updatePlayer = room.players.find((player) => player.socketId === socketId)!;

  //input processing
  text = text.toLowerCase();
  let words = text.split(" ");
  words = words.slice(0, words.length - 1);
  console.log(words);

  //add each word into wordFrequencies
  words.forEach((word) => {
    console.log(`In addToPlayer: ${word}`);
    let frequentWord = updatePlayer.wordFrequencies.find((pair) => pair.word === word);
    if (frequentWord) {
      frequentWord.frequency++;
      console.log(
        `In addToPlayer (logic), Word Frequencies update: ${word}: ${frequentWord.frequency}`
      );
    } else {
      let newPair = { word: word, frequency: 1 };
      updatePlayer.wordFrequencies.push(newPair);
      console.log(`In addToPlayer (logic), Word Frequencies update: ${word}: 1`);
    }
  });
  console.log(updatePlayer.wordFrequencies);
  return room;
};

const processReadyVote = (gameId: string, socketId: string): GameState => {
  // identify index of this player in given room
  const gameState = rooms.find((room) => room.gameId == gameId)!; // assume game will be found
  let playerIndex = -1;
  for (let i = 0; i < gameState.players.length; i++) {
    if (gameState.players[i].socketId == socketId) {
      playerIndex = i;
      break;
    }
  }
  // add to endVotes if not already there, remove otherwise
  if (gameState.readyVotes.includes(playerIndex)) remove(gameState.readyVotes, playerIndex);
  else gameState.readyVotes.push(playerIndex);
  // check start condition
  if (gameState.currentTurn === -1 && startCondition(gameState)) {
    gameState.currentTurn = Math.floor(Math.random() * gameState.players.length);
    gameState.healthTimer = decreaseHealth(gameState);
  }
  return gameState;
};

const processEndgameVote = (gameId: string, socketId: string, response: boolean): GameState => {
  // identify index of this player in given room
  const gameState = rooms.find((room) => room.gameId == gameId)!; // assume game will be found
  let playerIndex = -1;
  for (let i = 0; i < gameState.players.length; i++) {
    if (gameState.players[i].socketId == socketId) {
      playerIndex = i;
      break;
    }
  }
  // set player's vote in endVotes
  gameState.endVotes[playerIndex] = response;
  // check for majority of yes/no
  if (
    gameState.endVotes.filter((vote) => vote).length >=
    Math.ceil(getConnectedPlayers(gameState).length / 2)
  ) {
    gameState.gameOver = true;
    dispose(gameState);
  } else if (
    gameState.endVotes.filter((vote) => vote === false).length >
    getConnectedPlayers(gameState).length / 2
  ) {
    gameState.gameOver = false;
    gameState.endVotes = gameState.endVotes.map(() => undefined);
  }
  return gameState;
};

const processPublishVote = (gameId: string, socketId: string): GameState => {
  // identify index of this player in given room
  const gameState = rooms.find((room) => room.gameId == gameId)!; // assume game will be found
  let playerIndex = -1;
  for (let i = 0; i < gameState.players.length; i++) {
    if (gameState.players[i].socketId == socketId) {
      playerIndex = i;
      break;
    }
  }
  // add to publishVotes if not already there
  if (!gameState.publishVotes.includes(playerIndex)) {
    gameState.publishVotes.push(playerIndex);
  }
  // check end condition
  if (gameState.publishVotes.length >= Math.ceil(getConnectedPlayers(gameState).length / 2)) {
    gameState.isPublished = true;
  }
  return gameState;
};

const startCondition = (gameState: GameState): boolean => {
  let minimum = gameState.isPrivate ? 2 : 3;
  return (
    gameState.players.length >= minimum && gameState.readyVotes.length === gameState.players.length
  );
};

/** Utility */

const findNextAvailablePlayer = (gameState: GameState): number | undefined => {
  let currentTurn = gameState.currentTurn;
  let iterations = 0;
  while (gameState.players[currentTurn].health === 0 || gameState.players[currentTurn].disconnected) {
    currentTurn = (currentTurn + 1) % gameState.players.length;
    iterations++;
    if (iterations === gameState.players.length) return undefined;
  }
  console.log("next available player is", currentTurn);
  return currentTurn;
}

const resetHealth = (gameState: GameState) => {
  gameState.players.forEach(player => player.health = (170 - 10 * gameState.players.length));
}

const decreaseHealth = (gameState: GameState): NodeJS.Timeout | undefined => {
  let currentPlayer = gameState.players[gameState.currentTurn];
  if (currentPlayer.health === 0) {
    // find next player with health and update everyone in the room
    let nextPlayer = findNextAvailablePlayer(gameState);
    if (nextPlayer) {
      gameState.currentTurn = nextPlayer;
      socketManager.emitToRoom("storyUpdate", gameState);
      return decreaseHealth(gameState);
    } else {
      console.log("game ended by health");
      gameState.gameOver = true;
      gameOver(gameState);
      return undefined;
    }
  }
  // or continue the timer
  return setTimeout(() => {
    currentPlayer.health -= 1;
    gameState.healthTimer = decreaseHealth(gameState);
  }, 1000);
}

const dispose = (room: GameState): void => {
  // room garbage collector
  setTimeout(() => {
    rooms.splice(rooms.indexOf(room), 1);
  }, 1000 * 60 * 60 * 1);
};

const remove = <T>(array: T[], element: T): boolean => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == element) {
      array.splice(i, 1);
      return true;
    }
  }
  return false;
};

export default {
  createRoom,
  matchmake,

  getRoomById,
  getRoomByPlayer,

  addPlayer,
  disconnectPlayer,
  getConnectedPlayers,

  addToStory,
  addToPlayer,
  processReadyVote,
  processEndgameVote,
  processPublishVote,
};
