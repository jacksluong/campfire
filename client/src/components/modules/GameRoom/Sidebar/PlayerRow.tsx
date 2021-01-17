import React, { Component } from "react";
// import "./SideBar.scss";
import "../../../../utilities.scss";
import "./PlayerRow.scss";
interface Props {
  userId: string;
  name: string;
  health: number;
  disconnected: boolean;
}

interface State {}

class PlayerDisplay extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className={this.props.disconnected ? "PlayerRow-container disconnected" : "PlayerRow-container"}>
        <span>
          <b>{this.props.name + " | "}</b>
        </span>
        <span>{this.props.health}</span>
      </div>
    );
  }
}

export default PlayerDisplay;
