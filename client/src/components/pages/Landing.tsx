import { navigate, RouteComponentProps } from "@reach/router";
import React, { Component } from "react";

import Main from "../modules/Landing/Main";
import NavBar from "../modules/NavBar";

type Props = {
  userId: string;
  pfp: string;
  handleLogin: any;
  handleLogout: any;
};

class Landing extends Component<Props & RouteComponentProps, {}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const locationState: any = this.props.location?.state;
    if (locationState?.message && locationState?.message != "") {
      setTimeout(() => alert(locationState.message), 1500);
      navigate("/", { state: { message: "" } });
    }
  }

  render() {
    return (
      <div style={{ minWidth: "1000px" }}>
        <NavBar
          userId={this.props.userId}
          pfp={this.props.pfp}
          handleLogin={this.props.handleLogin}
          handleLogout={this.props.handleLogout}
          leftButtonText="explore"
          leftButtonPath="/gallery"
        />
        <Main userId={this.props.userId} />
      </div>
    );
  }
}
export default Landing;
