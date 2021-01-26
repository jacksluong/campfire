import React, { Component } from "react";
import { RouteComponentProps } from "@reach/router";

interface Props extends RouteComponentProps {
  userId: string;
  pfp: string;
  handleLogin: any;
  handleLogout: any;
}

class LeaderBoard extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>Leaderboard</div>;
  }
}
export default LeaderBoard;
