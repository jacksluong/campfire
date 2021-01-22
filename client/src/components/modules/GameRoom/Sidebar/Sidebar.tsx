import React, { Component } from "react";
import Chat from "./Chat";
import PlayerDisplay from "./PlayerDisplay";
import Player from "../../../../../../shared/Player";
import "./Sidebar.scss";

interface Props {
  gameId: string;
  players: Player[];
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
      <div className="Sidebar-container">
        <PlayerDisplay
          players={this.props.players}
          spectators={this.props.spectators.length}
          currentTurn={this.props.currentTurn}
        />
        <Chat
          gameId={this.props.gameId}
          players={this.props.players}
          spectators={this.props.spectators}
        />
      </div>
    );
  }
}

export default Sidebar;
