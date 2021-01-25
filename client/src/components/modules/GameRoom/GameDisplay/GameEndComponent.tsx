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
    let playersElement = this.props.players.map((player) => <div>{player.name}</div>);
    return (
      <div className="EndGameComponent container">
        <div className="Story Title">{`Temporary Title`}</div>

        <div className="Story Content"> </div>
        {this.props.currentStory}
        <div className="Story contributors">{playersElement}</div>
        {/* <div className = "s "></div> */}
      </div>
    );
  }
}
export default GameEndComponent;
