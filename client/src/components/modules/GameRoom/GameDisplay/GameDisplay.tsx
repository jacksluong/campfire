import React, { Component } from "react";
import StoryText from "./StoryText";
import Gathering from "./Gathering";
import GameInputField from "./GameInputField";
import Player from "../../../../../../shared/Player";
import { socket } from "../../../../client-socket";
import GameEndComponent from "./GameEndComponent";
import { get, post } from "../../../../utilities";
import { navigate } from "@reach/router";

interface Props {
  resetTimeout: () => void;
  players: Player[];
  currentStory: string;
  currentTurn: number;
  currentInput: string;
  gameId: string;
  userId: string;

  ended: boolean;
}

interface State {
  published: boolean;
  numPublishVotes: number;
}

class GameDisplay extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { published: false, numPublishVotes: 0 };
  }
  handleHome = () => {
    navigate(`/`);
  };

  handlePublish = () => {
    console.log("gameId", this.props.gameId);
    post("/api/votePublish", { gameId: this.props.gameId, socketId: socket.id }).then(
      (response) => {
        // console.log(response.votecount);
        this.setState((prevState) => ({
          numPublishVotes: response.votecount,
        }));
      }
    );
    // navigate(`/gallery`);
  };

  handlePlayAgain = (): void => {
    get("/api/matchmaking").then((response) => {
      console.log("play again! matched me to", response.gameId);
      navigate(`/gameroom/${response.gameId}`);
    });
  };

  componentDidMount() {
    socket.on("storyPublished", () => this.setState({ published: true }));
    socket.on("updatePublishVotes", (numPublishVotes) => {
      // console.log(numPublishVotes);
      this.setState({ numPublishVotes: numPublishVotes });
    });
  }
  render() {
    let input: any = "";
    if (
      this.props.players.find(
        (player) => player.socketId == socket.id || player.userId == this.props.userId
      )
    ) {
      input = (
        <GameInputField
          resetTimeout={this.props.resetTimeout}
          gameId={this.props.gameId}
          userId={this.props.userId}
          started={this.props.currentTurn !== -1}
          enabled={
            this.props.currentTurn !== -1 &&
            this.props.players[this.props.currentTurn].socketId === socket.id
          }
        />
      );
    }
    let voteTrackerAndPublishedButton =
      this.state.numPublishVotes >= Math.ceil(this.props.players.length / 2)
        ? `Published!`
        : `Publish ${this.state.numPublishVotes} / ${Math.ceil(this.props.players.length / 2)}`;
    return (
      <div className="GameDisplay container">
        <StoryText currentStory={this.props.currentStory} currentInput={this.props.currentInput} />
        {/* Check if the game is ended */}
        {this.props.ended ? (
          <GameEndComponent
            gameId={this.props.gameId}
            players={this.props.players}
            currentStory={this.props.currentStory}
          />
        ) : (<>
          <Gathering 
            gameId={this.props.gameId}
            players={this.props.players} 
            currentTurn={this.props.currentTurn} 
          />
        </>)}
        {this.props.ended ? (
          <span>
            <button onClick={this.handlePublish}>{voteTrackerAndPublishedButton}</button>
            <button onClick={this.handleHome}>Home</button>
            <button onClick={this.handlePlayAgain}>Again</button>
          </span>
        ) : (input)}
      </div>
    );
  }
}

export default GameDisplay;
