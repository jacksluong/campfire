import User from "./models/User"
import Story from "./models/Story"
import Player from "../shared/Player"

/** Interfaces */

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