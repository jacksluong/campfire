import React, { Component } from "react";
import "./Passage.scss";
import Player from "../../../../../shared/Player";

interface Props {
  content: string;
  contributors: Player[];
}
class Passage extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Passage-container">
        <h2>Story</h2>
        {this.props.content}
        <h3>Contributors</h3>
        {this.props.contributors.map((player) => (
          <div>{player.name}</div>
        ))}
      </div>
    );
  }
}

export default Passage;
