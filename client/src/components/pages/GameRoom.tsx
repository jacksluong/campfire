import React, { Component } from "react";
import Sidebar from "../modules/GameRoom/Sidebar/Sidebar";
import GameDisplay from "../modules/GameRoom/GameDisplay/GameDisplay";
import { RouteComponentProps } from "@reach/router";
import Player from "../../../../shared/Player";
import "../../../src/components/modules/GameRoom/GameRoom.scss";
import "../../../src/components/modules/GameRoom/Sidebar/Sidebar.scss";
import "../../../src/components/modules/GameRoom/GameDisplay/GameDisplay.scss";

// interface Props {} replaced "Props & RouteComponentProps" with "RouteComponentProps" because that's the primary way we are receiving props for this component

interface State {
  players: Player[];
  currentStory: string;
  currentChef: string;
  storyInput: string;
  winner: string | undefined; // player ID
}

let testingPlayers: Player[] = [
  { userId: "p1", name: "Tony Cui", health: 100 },
  { userId: "p2", name: "Jacky Luong", health: 100 },
  { userId: "p3", name: "Brandon Lei", health: 100 },
];

//todo: replace players state with those from database
class GameRoom extends Component<RouteComponentProps, State> {
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
      <div className="GameRoom-container">
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
      </div>
    );
  }
}

export default GameRoom;
