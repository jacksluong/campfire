import React, { Component } from "react";
import Chat from "./Chat";
import PlayerDisplay from "./PlayerDisplay";
import Player from "../../../../../../shared/Player";

interface Props {
  players: Player[];
  currentChef: string;
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
        <Chat players={this.props.players} />
        <PlayerDisplay players={this.props.players} currentChef={this.props.currentChef} />
      </div>
    );
  }
}

export default Sidebar;
