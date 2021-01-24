import React, { Component } from "react";
interface Props {
  name: string;
  health: number;
  isTyping: boolean;
  disconnected: boolean;
}

const MAX_HEALTH = 150; // seconds

class PlayerDisplay extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.isTyping) this.animateDecreaseHealth(this.props.health);
    else {
      document.getElementById("sidebarHealthBar").style.background = `linear-gradient(to right, lightgreen, lightgreen ${this.props.health}%, red ${this.props.health}%)`;
    }
  }

  animateDecreaseHealth = (health: number): void => {
    document.getElementById("sidebarHealthBar").style.background = `linear-gradient(to right, lightgreen, lightgreen ${health}%, red ${health}%)`;
    setTimeout(() => {
      this.animateDecreaseHealth(health - 1);
    }, 1000 * (100 / MAX_HEALTH));
  }

  render() {
    return (
      <div className={this.props.disconnected ? "PlayerRow disconnected" : "PlayerRow"}>
        <div className="name">
          {this.props.name}
        </div>
        <div className="health" id="sidebarHealthBar"></div>
      </div>
    );
  }
}

export default PlayerDisplay;
