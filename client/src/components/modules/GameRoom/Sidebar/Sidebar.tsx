import React, { Component } from "react";
import Chat from "./Chat";
import PlayerDisplay from "./PlayerDisplay";
import Player from "../../../../../../shared/Player";
import "./Sidebar.scss";

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
        <PlayerDisplay players={this.props.players} currentChef={this.props.currentChef} />
        <Chat players={this.props.players} />
      </div>
    );
  }
}

export default Sidebar;
