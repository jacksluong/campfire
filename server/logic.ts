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

const addPlayer = (user: User): void => {
  if (!user) {
    // NOTE: this is temporary; ideally, user will never be null, but currently that is not how it works, so adding this here to prevent the server crashing every time we join game room without being signed in
    const random = Math.ceil(Math.random() * 999) + 1;
    gameState.players.push({
      userId: `${random}`,
      name: `guest${random}`,
      health: 50,
    });
  } else {
    let idOfSessionUser = user._id + ""; // necessary to make it same string type as player.userId string for some reason
    let existingPlayer: Player | undefined = gameState.players.find(
      (player) => player.userId == idOfSessionUser
    );
    if (existingPlayer) {
      existingPlayer.disconnected = false;
      return;
    }
    if (gameState.currentTurn !== -1) {
      let average = 0;
      for (let player of gameState.players) average += player.health;
      average = Math.ceil(average / gameState.players.length);
      gameState.players.push({
        userId: idOfSessionUser,
        name: user.name,
        health: average,
      });
    } else {
      gameState.players.push({
        userId: idOfSessionUser,
        name: user.name,
        health: 100,
      });
    }
  }
  if (gameState.currentTurn == -1 && gameState.players.length >= 3) {
    gameState.currentTurn = Math.ceil(Math.random() * (gameState.players.length - 1) + 1);
  }
};
//>>>>>>> Stashed changes

const disconnectPlayer = (userId: string): void => {
  const disconnectedPlayer = gameState.players.filter((player) => player.userId == userId)[0];
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
