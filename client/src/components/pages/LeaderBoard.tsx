import React, { Component } from "react";
import { RouteComponentProps } from "@reach/router";
import Leaderboard from "../modules/LeaderBoard/LeaderBoardComponent";
import LeaderBoardComponent from "../modules/LeaderBoard/LeaderBoardComponent";

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
  componentDidMount() {}
  render() {
    return (
      <div className="LeaderBoard">
        <div className="title"> Leaderboard</div>
        <LeaderBoardComponent />
      </div>
    );
  }
}
export default LeaderBoard;
