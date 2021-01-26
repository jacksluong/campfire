import React, { Component } from "react";
import Player from "../../../../../../shared/Player";
import HelpButton from "../../../modules/HelpButton";
import GatheringPlayer from "./GatheringPlayer";

interface Props {
  gameId: string;
  players: Player[];
  currentTurn: number;
  taggedPlayer: number;
  handlePlayerClick: (number) => void;
}
class Gathering extends Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Gathering container">
        {this.props.players.map((p, i) => <GatheringPlayer
          index={i}
          player={p}
          tagged={i === this.props.taggedPlayer}
          handleClick={this.props.handlePlayerClick}
          currentTurn={this.props.currentTurn}
        />)}
        <HelpButton gameId={this.props.gameId} />
      </div>
    );
  }
}

export default Gathering;
