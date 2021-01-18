import { Link } from "@reach/router";
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
  }

  render() {
    return (
      <div className="">
        <button onClick={this.toggleDropdown} className="Dropbutton">
          Dropdown
        </button>
        <div id="dropdown" className="Dropdown-content">
          <Link to="/profile" className="Dropdown-item">Profile</Link>
          <span className="Dropdown-item" onClick={this.props.handleLogout}>Logout</span>
        </div>
      </div>
    );
  }
}
export default ProfileButton;
