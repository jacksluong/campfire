import { navigate, RouteComponentProps } from "@reach/router";
import React, { Component } from "react";
import Navigation from "../modules/End/Navigation";
import Passage from "../modules/End/Passage";

import BottomPanel from "../modules/End/BottomPanel";
import { get, post } from "../../../src/utilities";

interface Props extends RouteComponentProps {
  gameId?: string;
}
interface State {
  name: string;
  contributors: string[];
  content: string;
  usersThatLiked: string[];
  keywords: string[];
  enabled: boolean;
}

class End extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      contributors: [],
      content: "",
      usersThatLiked: [],
      keywords: [],
      enabled: true,
    };
  }
  componentDidMount() {
    get("/api/requestGameState", { gameId: this.props.gameId }).then((gameState) => {
      if (!gameState.players) {
        console.log(`gameId ${this.props.gameId} doesn't exist`);
        navigate("/");
      } else {
        let guests = gameState.players.find((player) => player.userId == "guest") ? "guests" : "";
        this.setState({
          name: `TITLE`,
          contributors: gameState.players
            .filter((player) => player.userId != "guest")
            .map((player) => player.name)
            .concat(guests),
          content: gameState.currentStory,
          usersThatLiked: ["USERS THAT LIKE", "TTT", "JJJ", "BBB"],
          keywords: ["KEYWORDS", "I", "LIKE", "CHEESE"],
        });
      }
    });
  }
  render() {
    return (
      <div className="End-container">
        <Navigation />
        <Passage content={this.state.content} contributors={this.state.contributors} />
        <BottomPanel gameId={this.props.gameId} />
      </div>
    );
  }
}
export default End;
