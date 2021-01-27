import React, { Component, useReducer } from "react";
import StatisticsSection from "../modules/Profile/StatisticsSection";
import ProfileSection from "../modules/Profile/ProfileSection";
import { RouteComponentProps } from "@reach/router";
import { get, post } from "../../../src/utilities";
import NavBar from "../modules/NavBar";
import User from "../../../../shared/User";
import { updateTry } from "typescript";
interface State {
  name: string;
  viewingPfp: string;
  wordsTyped: number;
  storiesWorkedOn: string[];
  wordFrequencies: { word: string; frequency: number }[];
}

interface Props extends RouteComponentProps {
  userId?: string;
  handleLogin: any;
  handleLogout: any;
}

class Profile extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      viewingPfp: "",
      wordsTyped: 0,
      storiesWorkedOn: [],
      wordFrequencies: [],
    };
  }

  PROFILE_WORDS: number = 5;

  componentDidMount() {
    get("/api/userInfo", { userId: this.props.userId }).then((user) => {
      user.wordFrequencies.sort((word1, word2) => word2.frequency - word1.frequency);
      console.log(user.wordFrequencies);
      const wordLength = user.wordFrequencies.length;
      if (wordLength >= this.PROFILE_WORDS) {
        user.wordFrequencies = user.wordFrequencies.slice(0, 5);
      }
      this.setState({
        name: user.name,
        wordsTyped: user.wordsTyped,
        storiesWorkedOn: user.storiesWorkedOn,
        wordFrequencies: user.wordFrequencies,
        viewingPfp: user.pfp,
      });
      console.log();
    });
  }

  render() {
    return (
      <div>
        <NavBar
          handleLogin={this.props.handleLogin}
          handleLogout={this.props.handleLogout}
          userId={this.props.userId}
          leftButtonText="home"
          leftButtonPath="/"
        />
        <div className="Profile container">
          <ProfileSection name={this.state.name} pfp={this.state.viewingPfp} />
          <StatisticsSection
            userId={this.props.userId}
            wordsTyped={this.state.wordsTyped}
            storiesWorkedOn={this.state.storiesWorkedOn}
            wordFrequencies={this.state.wordFrequencies}
          />
        </div>
      </div>
    );
  }
}
export default Profile;
