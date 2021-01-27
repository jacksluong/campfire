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
      sortBy: "wordsTyped",
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
  handleChange = (string: string) => {
    this.setState({ sortBy: string }, this.handleLeaderBoardUpdate);
  };

  render() {
    // let selected = this.state.sortBy;

    return (
      <div className="Leaderboard Component">
        {/* <div className="sortOptions"> </div> */}

        <table>
          <thead>
            <tr className="borderbottom">
              <th
                className={"" + (this.state.sortBy === "name" ? " active" : "")}
                onClick={() => {
                  this.handleChange("name");
                }}
              >
                Name
              </th>
              <th
                className={"" + (this.state.sortBy === "wordsTyped" ? " active" : "")}
                onClick={() => {
                  this.handleChange("wordsTyped");
                }}
              >
                Words Typed
              </th>
              <th
                className={
                  "lastColumn" + (this.state.sortBy === "storiesPublished" ? " active" : "")
                }
                onClick={() => {
                  this.handleChange("storiesPublished");
                }}
              >
                Stories Published
              </th>
            </tr>
          </thead>
          <tbody>{this.state.leaderBoardEntries}</tbody>
        </table>
      </div>
    );
  }
}
export default LeaderBoardComponent;
