import React, { Component } from "react";
import StatisticsSection from "../modules/ProfilePage/StatisticsSection";
import ProfileSection from "../modules/ProfilePage/ProfileSection";
import { RouteComponentProps } from "@reach/router";

interface State {}

class ProfilePage extends Component<RouteComponentProps, State> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ProfilePage-container">
        <ProfileSection />
        <StatisticsSection />
      </div>
    );
  }
}
export default ProfilePage;
