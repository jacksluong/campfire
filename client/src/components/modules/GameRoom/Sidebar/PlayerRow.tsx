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
    if (this.props.isTyping) this.animateDecreaseHealth(this.props.health);
    else {
      document.getElementById("sidebarHealthBar" + this.props.index).style.background = `linear-gradient(to right, lightgreen, lightgreen ${this.props.health}%, red ${this.props.health}%)`;
    }
  }

  animateDecreaseHealth = (health: number): void => {
    document.getElementById("sidebarHealthBar" + this.props.index).style.background = `linear-gradient(to right, lightgreen, lightgreen ${health}%, red ${health}%)`;
    setTimeout(() => {
      this.animateDecreaseHealth(health - 1);
    }, 1000 * (100 / this.props.maxHealth));
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
