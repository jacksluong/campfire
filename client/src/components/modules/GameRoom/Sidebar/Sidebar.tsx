import React, { Component } from "react";
import Chat from "./Chat";
import PlayerDisplay from "./PlayerDisplay";
import Player from "../../../../../../shared/Player";

interface Props {
  resetTimeout: () => void;
  gameId: string;
  players: Player[];
  readyPlayers: number[];
  currentTurn: number;
  spectators: string[];
}

interface State {}

class Sidebar extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Sidebar container">
        <PlayerDisplay
          players={this.props.players}
          readyPlayers={this.props.readyPlayers}
          spectators={this.props.spectators.length}
          currentTurn={this.props.currentTurn}
        />
        <Chat
          resetTimeout={this.props.resetTimeout}
          gameId={this.props.gameId}
          players={this.props.players}
          spectators={this.props.spectators}
        />
      </div>
    );
  }
}

export default Sidebar;
