import User from "../shared/User"
import Story from "../shared/Story"
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

let testingPlayers: Player[] = [
  { userId: "p1", name: "Tony Cui", health: 100 },
  { userId: "p2", name: "Jacky Luong", health: 100 },
  { userId: "p3", name: "Brandon Lei", health: 100 },
];

/** Game State */
const gameState: GameState = {
    gameId: "",
    players: testingPlayers,
    currentStory: "",
    currentTurn: { userId: "", name: "", health: 100 },
    currentInput: "",
    started: false
}

const addPlayer = (user: User): void => {
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

export {
    gameState,
    addPlayer
}