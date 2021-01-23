import React, { Component } from "react";
import "./Profile.css";

interface Props {
  name: string;
}
class ProfileSection extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="ProfileSection-container">
        <div className="ProfilePicture-container">
          <div className="ProfilePicture-avatar" />
        </div>
        <div className="AboutMe-container">About me: {this.props.name}</div>
        <div className="AboutMeDescription-container">AboutMeDescription</div>
      </div>
    );
  }
}
export default ProfileSection;
