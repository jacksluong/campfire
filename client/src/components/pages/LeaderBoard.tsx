import React, { Component } from "react";
import { RouteComponentProps } from "@reach/router";

interface Props extends RouteComponentProps {
  userId: string;
  handleLogin: any;
  handleLogout: any;
}

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div> </div>;
  }
}
export default LeaderBoard;
