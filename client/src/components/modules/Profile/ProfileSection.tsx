import React, { Component } from "react";

interface Props {
  name: string;
  pfp: string;
}
class ProfileSection extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    document.getElementById("avatar").style.backgroundImage = `url(${this.props.pfp})`;
  }

  render() {
    return (
      <div className="ProfileSection container">
        <div className="ProfilePicture container">
          <div className="ProfilePicture avatar" id="avatar" />
        </div>
        <div className="AboutMe container">
          <h1>{this.props.name}</h1>
        </div>
        <div className="AboutMeDescription container">
          Are you oxygen? Cuz I can't live without u
        </div>
      </div>
    );
  }
}
export default ProfileSection;
