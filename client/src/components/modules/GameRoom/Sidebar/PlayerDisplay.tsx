import React, { Component } from "react";
import Player from "../../../../../../shared/Player";
import PlayerRow from "./PlayerRow";

const SPECTATOR_IMAGE = "https://imgur.com/nNut6eg.png";
interface Props {
  players: Player[];
  readyPlayers: number[];
  currentTurn: number;
  spectators: number;
}

interface State {}

class PlayerDisplay extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let header = this.props.spectators === 0 ? (
      <div className="header">
        <h2 className="heading">Players</h2>
      </div>
    ) : (
      <div className="header">
        <h2 className="heading">Players</h2>
        <img src={SPECTATOR_IMAGE} height="25" />
        <span>{this.props.spectators}</span>
      </div>
    )
    return (
      <div className="PlayerDisplay container">
        {header}
        {this.props.players.map((player, i) => (
          <PlayerRow 
            name={player.name} 
            health={player.health} 
            disconnected={player.disconnected ?? false} 
            isTyping={this.props.currentTurn === i}
            key={i} />
        ))}
      </div>
    );
  }
}

export default PlayerDisplay;
