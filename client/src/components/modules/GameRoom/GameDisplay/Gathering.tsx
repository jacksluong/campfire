import React, { Component } from "react";
import Player from "../../../../../../shared/Player";

interface Props {
  players: Player[];
  currentTurn: number;
}
class Gathering extends Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Gathering container">
        
      </div>
    );
  }
}

export default Gathering;
