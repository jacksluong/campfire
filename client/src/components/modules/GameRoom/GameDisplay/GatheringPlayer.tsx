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

interface State {
  taggable: boolean;
}

class GatheringPlayer extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      taggable: false
    };
  }

  componentDidMount() {
    this.setPosition();
    this.updateVisual();
    window.addEventListener('resize', this.setPosition);
  }

  componentDidUpdate() {
    console.log("player index", this.props.index, "updated and health is", this.props.player.health);
    this.setPosition();
    this.updateVisual();
  }

  setPosition = () => {
    let gatheringPlayer = document.getElementById("player" + this.props.index);
    let center = {
      x: gatheringPlayer.parentElement.clientWidth / 2 - gatheringPlayer.clientWidth / 2,
      y: gatheringPlayer.parentElement.clientHeight / 2 - gatheringPlayer.clientHeight / 2
    }
    let radius = (Math.max(370, window.innerHeight - 280) - 120) / 2; // TODO: don't hardcode this number
    let position = {
      fromLeft: center.x + Math.sin(2 * Math.PI * this.props.index / this.props.totalNumber) * radius,
      fromTop: center.y - Math.cos(2 * Math.PI * this.props.index / this.props.totalNumber) * radius
    }

    gatheringPlayer.style.marginLeft = position.fromLeft + "px";
    gatheringPlayer.style.marginTop = position.fromTop + "px";

    if (this.props.currentTurn === this.props.index) {
      // current turn, so move the potato
      let potato = document.getElementById("potato");
      potato.style.marginLeft = position.fromLeft + 65 + "px";
      potato.style.marginTop = position.fromTop + 40 + "px";
      potato.style.transition = "1s";
    }
  }

  updateVisual = () => {
    let index = this.props.index;
    let gatheringPlayer = document.getElementById("player" + index);

    if (this.props.player.pfp) document.getElementById("gpGraphic" + index).style.backgroundImage = `url(${this.props.player.pfp})`;

    // who is taggable
    let taggable = this.props.cursorPointer && 
    this.props.currentTurn !== this.props.index && 
    this.props.player.health > 0 &&
    !this.props.player.disconnected;
    if (taggable && !gatheringPlayer.classList.contains("taggable")) {
      gatheringPlayer.classList.toggle("taggable");
    } else if (!taggable && gatheringPlayer.classList.contains("taggable")) {
      gatheringPlayer.classList.toggle("taggable");
    }
    // tagged player
    if (this.props.tagged && !gatheringPlayer.classList.contains("tagged")) {
      gatheringPlayer.classList.toggle("tagged");
    } else if (!this.props.tagged && gatheringPlayer.classList.contains("tagged")) {
      gatheringPlayer.classList.toggle("tagged");
    }
    // health
    document.getElementById("gpHealth" + index).style.background = this.props.player.health === 0 ? "darkgray" :
    `linear-gradient(to right, lightgreen, lightgreen ${this.props.player.health / (170 - this.props.totalNumber * 10) * 100}%, red ${this.props.player.health / (170 - this.props.totalNumber * 10) * 100}%)`;
  }

  handleClick = () => {
    let taggable = this.props.cursorPointer && 
    this.props.currentTurn !== this.props.index && 
    this.props.player.health > 0 &&
    !this.props.player.disconnected;
    if (taggable) this.props.handleClick(this.props.index);
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
