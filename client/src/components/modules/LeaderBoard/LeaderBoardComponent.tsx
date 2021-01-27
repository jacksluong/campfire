import React, { Component, useReducer, useRef } from "react";
import LeaderboardSingleLog from "./LeaderBoardSingleLog";
import { get, post } from "../../../utilities";
import { response } from "express";

interface State {
  leaderBoardEntries: any[];
  sortBy: string;
}

class LeaderBoardComponent extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      leaderBoardEntries: [],
      sortBy: "storiesPublished",
    };
  }
  handleLeaderBoardUpdate = () => {
    let usersElement = null;
    get("/api/leaderBoardInfo", { sortBy: this.state.sortBy })
      .then((response) => {
        console.log(response);
        let UsersArray = response.slice();
        // console.log(UsersArray);
        usersElement = UsersArray.map((entry) => {
          return (
            <LeaderboardSingleLog
              name={entry.name}
              wordsTyped={entry.wordsTyped}
              storiesPublished={entry.storiesWorkedOn.length}
            />
          );
        });
      })
      .then(() => {
        this.setState({ leaderBoardEntries: usersElement });
      });
  };

  componentDidMount() {
    this.handleLeaderBoardUpdate();
  }
  render() {
    return (
      <div className="Leaderboard Component">
        {/* <div className="sortOptions"> </div> */}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Words Typed</th>
              <th>Stories Published</th>
            </tr>
          </thead>
          <tbody>
            {this.state.leaderBoardEntries}
            {/* <tr>
              <td>The table body</td>
              <td>with two columns</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    );
  }
}
export default LeaderBoardComponent;
