import React, { Component } from "react";
import "./Passage.scss";
import Player from "../../../../../shared/Player";
import { socket } from "../../../client-socket";
import { post } from "../../../utilities";

interface State {
  story: string;
  contributors: Player[];
}
class Passage extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      story: "",
      contributors: [],
    };
  }

  componentDidMount() {
    socket.emit("requestLoadStory");
    socket.on("endLoadStory", (gameState) => {
      this.setState({
        story: gameState.currentStory,
        contributors: gameState.players,
      });
    });
  }

  render() {
    return (
      <div className="Passage-container">
        <h2>Story</h2>
        {this.state.story}
        <h3>Contributors</h3>
        {this.state.contributors.map((player) => (
          <div>{player.name}</div>
        ))}
      </div>
    );
  }
}

export default Passage;
