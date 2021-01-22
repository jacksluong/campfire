import React, { Component } from "react";
import Chat from "./Chat";
import Player from "../../../../../../shared/Player";
import PlayerRow from "./PlayerRow";
// import "./SideBar.scss";
import "./PlayerDisplay.scss";
interface Props {
  players: Player[];
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
    return (
      <div className="PlayerDisplay-container">
        <h2>Players with {this.props.spectators} spectators</h2>
        {this.props.players.map((player, i) => (
          <PlayerRow userId={player.userId} name={player.name} health={player.health} disconnected={player.disconnected ?? false} key={i} />
        ))}
      </div>
    );
  }
}

export default PlayerDisplay;
