import React, { Component } from "react";
import { Player } from "../../../pages/GameRoom";

interface Props {
  players: Player[];
  currentChef: string;
}
class Gathering extends Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="Gathering-container">Gathering Container</div>;
  }
}

export default Gathering;
