import { Link, navigate } from "@reach/router";
import React, { Component } from "react";
import { get, post } from "../../../src/utilities";

interface Props {
  userId: string;
  handleLogout: () => void;
}

interface State {
  show: boolean;
  pfp: string;
}

class ProfileButton extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { show: false, pfp: undefined };
  }

  componentDidMount() {
    get("/api/whoami").then((user) => {
      this.setState({
        pfp: user.pfp,
      });
    });
  }

  toggleDropdown = (): void => {
    this.setState((prevState) => ({
      show: !prevState.show,
    }));
    document.getElementById("dropdown").classList.toggle("show");
  };

  handleMouseLeave = (): void => {
    if (this.state.show) {
      this.setState({ show: false });
      document.getElementById("dropdown").classList.toggle("show");
    }
  };

  handleProfile = (): void => {
    navigate(`/profile/${this.props.userId}`);
  };

  handleLeaderBoard = (): void => {
    navigate(`/leaderboard`);
  };

  render() {
    if (this.state.pfp) {
      document.getElementById("toggler").style.backgroundImage = `url(${this.state.pfp})`;
    }
    return (
      <div className="ProfileButton" onMouseLeave={this.handleMouseLeave}>
        <button onClick={this.toggleDropdown} id="toggler"></button>
        <div id="dropdown" className="dropdown">
          <div className="item" id="firstDropdownItem" onClick={this.handleProfile}>
            profile
          </div>
          <div className="item" id="secondDropdownItem" onClick={this.handleLeaderBoard}>
            ranks
          </div>
          <div className="item" id="thirdDropdownItem" onClick={this.props.handleLogout}>
            logout
          </div>
        </div>
      </div>
    );
  }
}
export default ProfileButton;
