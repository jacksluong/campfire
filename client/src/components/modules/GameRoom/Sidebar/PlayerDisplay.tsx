import React, { Component } from "react";
import Chat from "./Chat";
import { Player } from "../../../pages/GameRoom";
import PlayerRow from "./PlayerRow";

interface Props {
  players: Player[];
  currentChef: string;
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
        {this.props.players.map((player) => (
          <PlayerRow userId={player.userId} name={player.name} health={player.health} />
        ))}
      </div>
    );
  }
}

export default PlayerDisplay;
