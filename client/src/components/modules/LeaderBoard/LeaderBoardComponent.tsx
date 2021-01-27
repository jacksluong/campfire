import React, { Component, useReducer, useRef } from "react";
import LeaderboardSingleLog from "./LeaderBoardSingleLog";
import { get, post } from "../../../utilities";
import { response } from "express";

interface State {
  dummyElement: any[];
}
class LeaderBoardComponent extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      dummyElement: [],
    };
  }

  componentDidMount() {
    //todo: get request, replace dummy
    get("/api/leaderBoardInfo").then((response) => {
      console.log(response);
    });
    const dummy = [
      { name: "BBB", wordsTyped: 500, storiesPublished: 50 },
      { name: "BBB", wordsTyped: 500, storiesPublished: 50 },
      { name: "BBB", wordsTyped: 500, storiesPublished: 50 },
    ];
    let dummyElement = dummy.map((dummyUser) => (
      <LeaderboardSingleLog
        name={dummyUser.name}
        wordsTyped={dummyUser.wordsTyped}
        storiesPublished={dummyUser.storiesPublished}
      />
    ));
    this.setState({
      dummyElement: dummyElement,
    });
  }
  render() {
    return <div className="Leaderboard Component">{this.state.dummyElement}</div>;
  }
}
export default LeaderBoardComponent;
