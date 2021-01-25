import { Link, navigate } from "@reach/router";
import React, { Component } from "react";

interface Props {
  userId: string;
  imageUrl: string;
  handleLogout: () => void;
}

interface State {}

class ProfileButton extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  toggleDropdown = (): void => {
    document.getElementById("dropdown").classList.toggle("show");
  };

  handleProfile = (): void => {
    navigate(`/profile/${this.props.userId}`);
  };

  render() {
    return (
      <div className="ProfileButton">
        <button onClick={this.toggleDropdown} className="toggler"></button>
        <div id="dropdown" className="content">
          <div className="item" onClick={this.handleProfile}>
            profile
          </div>
          <div className="item" onClick={this.props.handleLogout}>
            logout
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileButton;
