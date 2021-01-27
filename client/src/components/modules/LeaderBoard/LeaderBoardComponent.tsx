import React, { Component, useReducer, useRef } from "react";
import LeaderboardSingleLog from "./LeaderBoardSingleLog";
import { get, post } from "../../../utilities";
import { response } from "express";

interface State {
  dummyElement: any[];
  sortBy: string;
}
class LeaderBoardComponent extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      dummyElement: [],
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
        this.setState({ dummyElement: usersElement });
      });
  };

  componentDidMount() {
    this.handleLeaderBoardUpdate();
    //todo: get request, replace dummy

    // const dummy = [
    //   { name: "BBB", wordsTyped: 500, storiesPublished: 50 },
    //   { name: "BBB", wordsTyped: 500, storiesPublished: 50 },
    //   { name: "BBB", wordsTyped: 500, storiesPublished: 50 },
    // ];

    // let dummyElement = dummy.map((dummyUser) => (
    //   <LeaderboardSingleLog
    //     name={dummyUser.name}
    //     wordsTyped={dummyUser.wordsTyped}
    //     storiesPublished={dummyUser.storiesPublished}
    //   />
    // ));
    // this.setState({
    //   dummyElement: dummyElement,
    // });
  }
  render() {
    return <div className="Leaderboard Component">{this.state.dummyElement}</div>;
  }
}
export default LeaderBoardComponent;
