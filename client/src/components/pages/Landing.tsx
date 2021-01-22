import { navigate, RouteComponentProps } from "@reach/router";
import React, { Component } from "react";

import Main from "../modules/Landing/Main";
import NavBar from "../modules/Landing/NavBar";

type Props = {
  userId: string;
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
      <div>
        <NavBar
          handleLogin={this.props.handleLogin}
          handleLogout={this.props.handleLogout}
          userId={this.props.userId}
        />
        <Main userId={this.props.userId} />
        <br />
        {/* Edit later */}
        <br />
        <br />
        <br />
      </div>
    );
  }
}
export default Landing;
