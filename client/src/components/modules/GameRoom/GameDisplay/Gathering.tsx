import React, { Component } from "react";
import Player from "../../../../../../shared/Player";
import "./Gathering.scss";

interface Props {
  players: Player[];
  currentTurn: string;
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
