import React, { Component } from "react";
import Player from "../../../../../../shared/Player";
import { socket } from "../../../../client-socket";

interface Props {
  index: number;
  totalNumber: number;
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
  }

  componentDidUpdate() {
    // console.log("player index", this.props.index, "logging");
    // console.log(this.props);
    this.setPosition();
  }

  setPosition = () => {
    let gatheringPlayer = document.getElementById("player" + this.props.index);
    let center = {
      x: gatheringPlayer.parentElement.clientWidth / 2 - gatheringPlayer.clientWidth / 2,
      y: gatheringPlayer.parentElement.clientHeight / 2 - gatheringPlayer.clientHeight / 2
    }
    let radius = 150;

    gatheringPlayer.style.marginLeft = (center.x + Math.sin(2 * Math.PI * this.props.index / this.props.totalNumber) * radius) + "px";
    gatheringPlayer.style.marginTop = (center.y - Math.cos(2 * Math.PI * this.props.index / this.props.totalNumber) * radius) + "px";
    
    if (this.props.player.pfp) gatheringPlayer.style.backgroundImage = `url(${this.props.player.pfp})`
    if (this.props.player.socketId === socket.id) gatheringPlayer.style.backgroundColor = "green";
    else if (this.props.tagged) gatheringPlayer.style.backgroundColor = "yellow";
    else if (this.props.currentTurn === this.props.index)gatheringPlayer.style.backgroundColor = "orange";
    else if (this.props.player.health === 0) gatheringPlayer.style.backgroundColor = "red";
    else gatheringPlayer.style.backgroundColor = "blue";
  }

  handleClick = () => {
    this.props.handleClick(this.props.index);
  }

  render() {
    return (
      <div 
        className="GatheringPlayer container" 
        id={"player" + this.props.index}
        onClick={this.handleClick}>
        <div className="indicator"></div>
        <div className="health"></div>
        <div className="graphic"></div>
        <div className="name"></div>
      </div>
    );
  }
}

export default GatheringPlayer;
