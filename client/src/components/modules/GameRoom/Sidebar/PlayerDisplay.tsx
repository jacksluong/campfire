import React, { Component } from "react";
import Chat from "./Chat";

interface Props {}

interface State {}

class PlayerDisplay extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="PlayerDisplay-container">
        <Chat />
        <PlayerDisplay />
      </div>
    );
  }
}

export default PlayerDisplay;
