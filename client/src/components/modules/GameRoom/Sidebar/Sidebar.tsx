import React, { Component } from "react";
import Chat from "./Chat";
import PlayerDisplay from "./PlayerDisplay";
import { Player } from "../../../pages/GameRoom";

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
        <Chat />
        <PlayerDisplay />
      </div>
    );
  }
}

export default Sidebar;