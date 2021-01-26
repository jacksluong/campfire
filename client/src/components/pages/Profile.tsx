import React, { Component, useReducer } from "react";
import StatisticsSection from "../modules/Profile/StatisticsSection";
import ProfileSection from "../modules/Profile/ProfileSection";
import { RouteComponentProps } from "@reach/router";
import { get, post } from "../../../src/utilities";
import NavBar from "../modules/NavBar";
interface State {
  name: string;
  wordsTyped: number;
  storiesWorkedOn: string[];
  wordFrequencies: { word: string; frequency: number }[];
}

interface Props extends RouteComponentProps {
  userId?: string;
  pfp: string;
  handleLogin: any;
  handleLogout: any;
}

class Profile extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      wordsTyped: 0,
      storiesWorkedOn: [],
      wordFrequencies: [],
    };
  }

  PROFILE_WORDS: number = 5;

  componentDidMount() {
    console.log("requesting userinfo");
    get("/api/userInfo", { userId: this.props.userId }).then((user) => {
      let words =
        user.wordFrequencies.length <= this.PROFILE_WORDS
          ? user.wordFrequencies.sort((word) => word.frequency)
          : user.wordFrequencies.sort((word) => word.frequency).slice(0, 5);
      this.setState({
        name: user.name,
        wordsTyped: user.wordsTyped,
        storiesWorkedOn: user.storiesWorkedOn,
        wordFrequencies: words,
      });
      console.log(`In Profile.tsx" ${user.storiesWorkedOn as string[]}`);
      console.log(user.storiesWorkedOn);
    });
  }

  render() {
    console.log("in render of profile");
    console.log(this.state.storiesWorkedOn);
    return (
      <div>
        <NavBar
          pfp={this.props.pfp}
          handleLogin={this.props.handleLogin}
          handleLogout={this.props.handleLogout}
          userId={this.props.userId}
          leftButtonText="home"
          leftButtonPath="/"
        />
        <div className="Profile container">
          <ProfileSection name={this.state.name} />
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
