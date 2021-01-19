import { RouteComponentProps } from "@reach/router";
import React, { Component } from "react";
import Navigation from "../modules/End/Navigation";
import Passage from "../modules/End/Passage";
import "../modules/End/End.scss";
import BottomPanel from "../modules/End/BottomPanel";
import { socket } from "../../../../client/src/client-socket";
import { post } from "../../../src/utilities";
import Player from "../../../../shared/Player";

interface Props {}
interface State {
  name: string;
  contributors: Player[];
  content: string;
  usersThatLiked: string[];
  keywords: string[];
}

class End extends Component<Props & RouteComponentProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      contributors: [],
      content: "",
      usersThatLiked: [],
      keywords: [],
    };
  }
  componentDidMount() {
    socket.emit("requestGameState");
    socket.on("sendGameState", (gameState) => {
      this.setState({
        name: `TITLE`,
        contributors: gameState.players,
        content: gameState.currentStory,
        usersThatLiked: ["USERS THAT LIKE", "TTT", "JJJ", "BBB"],
        keywords: ["KEYWORDS", "I", "LIKE", "CHEESE"],
      });
    });
  }
  render() {
    return (
      <div className="End-container">
        <Navigation />
        <Passage content={this.state.content} contributors={this.state.contributors} />
        <BottomPanel
          name={this.state.name}
          contributors={this.state.contributors}
          content={this.state.content}
          usersThatLiked={this.state.usersThatLiked}
          keywords={this.state.keywords}
        />
      </div>
    );
  }
}
export default End;
