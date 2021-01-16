import User from "./models/User"
import Story from "./models/Story"

/** Interfaces */

export interface Player {
    userId: string;
    name: string;
    health: number;
}

interface GameState {
    gameId: string;
    players: Player[],
    currentStory: string,
    inputText: string,
    storyInput: string // userId of the player who's turn is rn
}

/** Utils */

/** Game State */
const gameState: GameState = {
    gameId: "",
    players: [],
    currentStory: "",
    inputText: "",
    storyInput: ""
}