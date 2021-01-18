import React, { Component } from "react";
import "./Profile.css";

class ProfileSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ProfileSection-container">
        <div className="ProfilePicture-container">
          <div className="ProfilePicture-avatar" />
        </div>
        <div className="AboutMe-container">About me</div>
        <div className="AboutMeDescription-container">AboutMeDescription</div>
      </div>
    );
  }
}
export default ProfileSection;
