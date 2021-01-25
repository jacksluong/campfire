import { Link, navigate } from "@reach/router";
import React, { Component } from "react";

interface Props {
  userId: string;
  pfp: string;
  imageUrl: string;
  handleLogout: () => void;
}

interface State {
  show: boolean;
}

class ProfileButton extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { show: false }
  }

  componentDidMount() {
    if (this.props.pfp) {
      document.getElementById("toggler").style.backgroundImage = `url(${this.props.pfp})`;
    }
  }

  toggleDropdown = (): void => {
    if (!this.state.show) {
      this.setState({ show: true });
      document.getElementById("dropdown").classList.toggle("show");
    }
  };

  handleMouseLeave = (): void => {
    if (this.state.show) {
      this.setState({ show: false });
      document.getElementById("dropdown").classList.toggle("show");
    }
  }

  handleProfile = (): void => {
    navigate(`/profile/${this.props.userId}`);
  };

  render() {
    return (
      <div className="ProfileButton" onMouseLeave={this.handleMouseLeave}>
        <button onClick={this.toggleDropdown} id="toggler"></button>
        <div id="dropdown" className="dropdown">
          <div className="item" id="firstDropdownItem" onClick={this.handleProfile}>
            profile
          </div>
          <div className="item" id="secondDropdownItem" onClick={this.props.handleLogout}>
            logout
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileButton;
