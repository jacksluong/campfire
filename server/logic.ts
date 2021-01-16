import User from "../shared/User"
import Story from "../shared/Story"
import Player from "../shared/Player"

/** Interfaces */

export interface GameState {
    gameId: string;
    players: Player[],
    currentStory: string,
    inputText: string,
    storyInput: string, // userId of the player who's turn is rn
    started: boolean
}

/** Utils */

/** Game State */
const gameState: GameState = {
    gameId: "",
    players: [],
    currentStory: "",
    inputText: "",
    storyInput: "",
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
}