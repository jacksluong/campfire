import React, { Component } from "react";
interface Props {
  index: number;
  isMe: boolean;
  name: string;
  health: number;
  maxHealth: number;
  isTyping: boolean;
  disconnected: boolean;
}

class PlayerDisplay extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    document.getElementById("sidebarHealthBar" + this.props.index).style.background = `linear-gradient(to right, lightgreen, lightgreen ${this.props.health / this.props.maxHealth * 100}%, red ${this.props.health / this.props.maxHealth * 100}%)`;
  }

  componentDidUpdate() {
    document.getElementById("sidebarHealthBar" + this.props.index).style.background = `linear-gradient(to right, lightgreen, lightgreen ${this.props.health / this.props.maxHealth * 100}%, red ${this.props.health / this.props.maxHealth * 100}%)`;
  }

  render() {
    let classes = "PlayerRow";
    if (this.props.disconnected) classes += " disconnected";
    else if (this.props.isMe) classes += " me";
    return (
      <div className={classes}>
        <div className="name">
          {this.props.name}
        </div>
        <div className="health" id={"sidebarHealthBar" + this.props.index}></div>
      </div>
    );
  }
}

export default PlayerDisplay;
