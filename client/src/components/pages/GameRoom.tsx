import React, { Component } from "react";
import Sidebar from "../modules/GameRoom/Sidebar/Sidebar";
import GameDisplay from "../modules/GameRoom/GameDisplay/GameDisplay";
import { RouteComponentProps } from "@reach/router";

export interface Player {
  userId: string;
  name: string;
  health: number;
}

interface Props {}

interface State {
  players: Player[];
  currentStory: string;
  currentChef: string;
  storyInput: string;
  winner: Player | undefined;
}

let testingPlayers: Player[] = [
  { userId: "p1", name: "TTT", health: 100 },
  { userId: "p1", name: "JJJ", health: 100 },
];

//todo: replace players state with those from database
class GameRoom extends Component<Props & RouteComponentProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      players: testingPlayers,
      currentStory: "",
      currentChef: "",
      storyInput: "",
      winner: undefined,
    };
  }

  render() {
    return (
      <>
        <div className="Sidebar-container">
          <Sidebar players={this.state.players} currentChef={this.state.currentChef} />
        </div>
        <div className="GameDisplay-container">
          <GameDisplay
            players={this.state.players}
            currentStory={this.state.currentStory}
            currentChef={this.state.currentChef}
            storyInput={this.state.storyInput}
          />
        </div>
      </>
    );
  }
}

export default GameRoom;
