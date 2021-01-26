import React, { Component } from "react";
import Player from "../../../../../../shared/Player";
import { socket } from "../../../../client-socket";
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
          totalNumber={this.props.players.length}
          cursorPointer={this.props.players[this.props.currentTurn]?.socketId === socket.id}
          player={p}
          tagged={i === this.props.taggedPlayer && this.props.players[this.props.currentTurn].socketId === socket.id}
          handleClick={this.props.handlePlayerClick}
          currentTurn={this.props.currentTurn}
          key={i}
        />)}
        <div id="potato" className={this.props.currentTurn !== -1 ? "show" : ""}></div>
        <HelpButton gameId={this.props.gameId} />
      </div>
    );
  }
}

export default Gathering;
