import User from "../shared/User"
import Player from "../shared/Player"

/** Interfaces */

export interface GameState {
    gameId: string;
    players: Player[],
    currentStory: string,
    currentTurn: Player,
    currentInput: string,
    started: boolean
}

/** Utils */

let testingInitialPlayers: Player[] = [
  { userId: "p1", name: "Tony Cui", health: 100 },
  { userId: "p2", name: "Jacky Luong", health: 100 },
  { userId: "p3", name: "Brandon Lei", health: 100 },
];

/** Game State */
const gameState: GameState = {
    gameId: "",
    players: testingInitialPlayers,
    currentStory: "",
    currentTurn: { userId: "", name: "", health: 100 },
    currentInput: "",
    started: false
}

const addPlayer = (user: User): void => {
    if (!user) { // NOTE: this is temporary; ideally, user will never be null, but currently that is not how it works, so adding this here to prevent the server crashing every time we join game room without being signed in
        const random = Math.ceil(Math.random() * 999) + 1
        gameState.players.push({
            userId: `${random}`,
            name: `guest${random}`,
            health: 50,
        })
        return;
    }
    let existingPlayer: Player | undefined = gameState.players.find(player => player.userId == user._id) 
    if (existingPlayer) {
        existingPlayer.disconnected = false;
        return;
    };
    if (gameState.started) {
        let average = 0;
        for (let player of gameState.players) average += player.health;
        average = Math.ceil(average / gameState.players.length)
        gameState.players.push({
            userId: user._id,
            name: user.name,
            health: average,
        })
    } else {
        gameState.players.push({
            userId: user._id,
            name: user.name,
            health: 100,
        })
    }
}

const disconnectPlayer = (userId: string): void => {
    const disconnectedPlayer = gameState.players.filter(player => player.userId == userId)[0];
    disconnectedPlayer.disconnected = true;
}

export {
    gameState,
    addPlayer,
    disconnectPlayer
}