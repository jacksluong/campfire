import React, { Component } from "react";
import "./SideBar.scss";
import "../../../../utilities.css";
import "./PlayerRow.scss";
interface Props {
  userId: string;
  name: string;
  health: number;
}

interface State {}

class PlayerDisplay extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="PlayerRow-container">
        <span>
          <b>{this.props.name + " | "}</b>
        </span>
        <span>{this.props.health}</span>
      </div>
    );
  }
}

export default PlayerDisplay;
