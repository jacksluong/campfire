import React, { Component } from "react";

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
        <h1>{this.props.name}</h1>
        <p>{this.props.health}</p>
      </div>
    );
  }
}

export default PlayerDisplay;
