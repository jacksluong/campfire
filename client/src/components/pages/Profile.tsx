import React, { Component } from "react";
import StatisticsSection from "../modules/Profile/StatisticsSection";
import ProfileSection from "../modules/Profile/ProfileSection";
import { RouteComponentProps } from "@reach/router";

interface State {}

class Profile extends Component<RouteComponentProps, State> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Profile-container">
        <ProfileSection />
        <StatisticsSection />
      </div>
    );
  }
}
export default Profile;
