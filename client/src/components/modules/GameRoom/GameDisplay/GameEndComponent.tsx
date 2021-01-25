import React, { Component } from "react";
import Player from "../../../../../../shared/Player";

interface Props {
  gameId: string;
  players: Player[];
  currentStory: String;
}
interface State {}
class GameEndComponent extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    let lastElement = this.props.players[this.props.players.length - 1];
    let playersElement = this.props.players.map((player) => <span>{`${player.name}, `}</span>);
    playersElement.pop();
    playersElement.push(<span>{` and ${lastElement.name}`}</span>);

    return (
      <div className="EndGameComponent container">
        <div className="Title">{`Temporary Title`}</div>
        <div className="Contributors">By {playersElement}</div>

        <div className="Story Content"> </div>
        {this.props.currentStory}
        {/* <div className = "s "></div> */}
      </div>
    );
  }
}
export default GameEndComponent;
