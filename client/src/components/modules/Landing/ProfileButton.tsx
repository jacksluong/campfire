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
      <div className="">
        <button onClick={this.toggleDropdown} className="Dropbutton">
          Dropdown
        </button>
        <div id="dropdown" className="Dropdown-content">
          <a className="Dropdown-item" onClick={this.handleProfile}>
            Profile
          </a>
          <a className="Dropdown-item" onClick={this.props.handleLogout}>
            Logout
          </a>
        </div>
      </div>
    );
  }
}
export default ProfileButton;
