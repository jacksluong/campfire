import React, { Component } from "react";
import Player from "../../../../../../shared/Player";

interface Props {
  index: number;
  player: Player;
  tagged: boolean;
  handleClick: (number) => void;
  currentTurn: number;
}

class GatheringPlayer extends Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    let gatheringPlayer = document.getElementById("player" + this.props.index);
    // gatheringPlayer.style.
  }

  render() {
    return (
      <div 
        className="GatheringPlayer container" 
        id={"player" + this.props.index}
        onClick={this.props.handleClick}>
        <div className="indicator"></div>
        <div className="health"></div>
        <div className="graphic"></div>
        <div className="name"></div>
      </div>
    );
  }
}

export default GatheringPlayer;
