import React, { Component } from "react";
import Player from "../../../../../../shared/Player";
import HelpButton from "../../../modules/HelpButton";

interface Props {
  gameId: string;
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
        
        <HelpButton gameId={this.props.gameId} />
      </div>
    );
  }
}

export default Gathering;
