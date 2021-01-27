import React, { Component } from "react";
import Player from "../../../../../../shared/Player";
import { socket } from "../../../../client-socket";

interface Props {
  index: number;
  totalNumber: number;
  cursorPointer: boolean;
  player: Player;
  tagged: boolean;
  handleClick: (number) => void;
  currentTurn: number;
}

class GatheringPlayer extends Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.setPosition();
    this.updateVisual();
    window.addEventListener('resize', this.setPosition);
  }

  componentDidUpdate() {
    this.setPosition();
    this.updateVisual();
  }

  setPosition = () => {
    let gatheringPlayer = document.getElementById("player" + this.props.index);
    let center = {
      x: gatheringPlayer.parentElement.clientWidth / 2 - gatheringPlayer.clientWidth / 2,
      y: gatheringPlayer.parentElement.clientHeight / 2 - gatheringPlayer.clientHeight / 2
    }
    let radius = 150; // TODO: don't hardcode this number
    let position = {
      fromLeft: center.x + Math.sin(2 * Math.PI * this.props.index / this.props.totalNumber) * radius,
      fromTop: center.y - Math.cos(2 * Math.PI * this.props.index / this.props.totalNumber) * radius
    }

    gatheringPlayer.style.marginLeft = position.fromLeft + "px";
    gatheringPlayer.style.marginTop = position.fromTop + "px";

    if (this.props.currentTurn === this.props.index) {
      // current turn, so move the potato
      let potato = document.getElementById("potato");
      potato.style.marginLeft = position.fromLeft + 50 + "px";
      potato.style.marginTop = position.fromTop + 40 + "px";
      potato.style.transition = "1s";
    }
  }

  updateVisual = () => {
    let index = this.props.index;
    let gatheringPlayer = document.getElementById("player" + index);

    if (this.props.player.pfp) document.getElementById("gpGraphic" + index).style.backgroundImage = `url(${this.props.player.pfp})`;

    // my turn but isn't me
    gatheringPlayer.style.cursor = (this.props.cursorPointer && this.props.currentTurn !== this.props.index) ? "pointer" : "default";
    // tagged player
    gatheringPlayer.style.backgroundColor = this.props.tagged ? "#032540" : "transparent";
    // health
    document.getElementById("gpHealth" + index).style.background = this.props.player.health === 0 ? "darkgray" :
    `linear-gradient(to right, lightgreen, lightgreen ${this.props.player.health}%, red ${this.props.player.health}%)`;
  }

  handleClick = () => {
    this.props.handleClick(this.props.index);
  }

  render() {
    let index = this.props.index;
    return (
      <div 
        className="GatheringPlayer container" 
        id={"player" + this.props.index}
        onClick={this.handleClick}>
        {this.props.player.socketId === socket.id ? <div id="gpIndicator"></div> : ""}
        <div id={"gpHealth" + index} className="gpHealth"></div>
        <div id={"gpGraphic" + index} className="gpGraphic"></div>
        <div className="gpName">{this.props.player.name}</div>
      </div>
    );
  }
}

export default GatheringPlayer;
