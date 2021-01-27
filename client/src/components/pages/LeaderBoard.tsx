import React, { Component } from "react";
import { RouteComponentProps } from "@reach/router";
import Leaderboard from "../modules/LeaderBoard/LeaderBoardComponent";
import LeaderBoardComponent from "../modules/LeaderBoard/LeaderBoardComponent";
import NavBar from "../modules/NavBar";
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
      <>
        <NavBar
          handleLogin={this.props.handleLogin}
          handleLogout={this.props.handleLogout}
          userId={this.props.userId}
          leftButtonText="home"
          leftButtonPath="/"
        />
        <div className="LeaderBoard">
          <br></br>
          <div className="title"> Leaderboard</div>
          <LeaderBoardComponent />
        </div>
      </>
    );
  }
}
export default LeaderBoard;
