import React, { Component, useReducer } from "react";
import StatisticsSection from "../modules/Profile/StatisticsSection";
import ProfileSection from "../modules/Profile/ProfileSection";
import { RouteComponentProps } from "@reach/router";
import { get, post } from "../../../src/utilities";
interface State {
  name: string;
  wordsTyped: number;
  storiesWorkedOn: string[];
  // wordFrequencies: Map<string, number>;
}

interface Props extends RouteComponentProps {
  userId?: string;
}

class Profile extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      wordsTyped: 0,
      storiesWorkedOn: [],
      // wordFrequencies: ["" : 0],
    };
  }

  componentDidMount() {
    console.log("requesting userinfo");
    get("/api/userInfo", { userId: this.props.userId }).then((user) => {
      this.setState({
        name: user.name,
        wordsTyped: user.wordsTyped,
        storiesWorkedOn: user.storiesWorkedOn,
        // wordFrequencies: user.wordFrequencies,
      });
    });
  }

  render() {
    return (
      <div className="Profile-container">
        <ProfileSection name={this.state.name} />
        <StatisticsSection
          wordsTyped={this.state.wordsTyped}
          storiesWorkedOn={this.state.storiesWorkedOn}
          // wordFrequencies={this.state.wordFrequencies}
        />
      </div>
    );
  }
}
export default Profile;
