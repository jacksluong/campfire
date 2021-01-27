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
  taggedPlayer: number;

  gameId: string;
  userId: string;

  //story info
  title: string;
  keywords: string[];

  ended: boolean;
  handlePlayerClick: (number) => void;
  handleStoryInputSubmit: (string) => Promise<any>;
}

interface State {
  published: boolean;
  numPublishVotes: number;
  disabledPublish: boolean;
}

class GameDisplay extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { published: false, numPublishVotes: 0, disabledPublish: false };
  }
  handleHome = () => {
    navigate(`/`);
  };

  handleGallery = () => {
    navigate("/gallery");
  };

  handlePublish = () => {
    this.setState({
      disabledPublish: true,
    });
    console.log("gameId", this.props.gameId);
    post("/api/votePublish", {
      gameId: this.props.gameId,
      socketId: socket.id,
      title: this.props.title,
      keywords: this.props.keywords,
    }).then((response) => {
      // console.log(response.votecount);
      if (response.votes) {
        this.setState({ numPublishVotes: response.votecount });
      }
    });
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
      if (numPublishVotes) {
        this.setState({ numPublishVotes: numPublishVotes });
      }
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
          handleInputSubmit={this.props.handleStoryInputSubmit}
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
            title={this.props.title}
            keywords={this.props.keywords}
            players={this.props.players}
            currentStory={this.props.currentStory}
          />
        ) : (
          <>
            <Gathering
              gameId={this.props.gameId}
              players={this.props.players}
              currentTurn={this.props.currentTurn}
              taggedPlayer={this.props.taggedPlayer}
              handlePlayerClick={this.props.handlePlayerClick}
            />
          </>
        )}
        {this.props.ended ? (
          <span>
            <button onClick={this.handlePublish} disabled={this.state.disabledPublish}>
              {voteTrackerAndPublishedButton}
            </button>
            <button onClick={this.handleHome}>Home</button>
            <button onClick={this.handleGallery}>Gallery</button>
          </span>
        ) : (
          input
        )}
      </div>
    );
  }
}

export default GameDisplay;
