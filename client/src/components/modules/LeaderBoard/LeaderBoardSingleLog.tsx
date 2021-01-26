import React, { Component } from "react";
interface Props {
  name: string;
  wordsTyped: number;
  storiesPublished: number;
}
class LeaderboardSingleLog extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Log">
        <span>
          {this.props.name}
          {this.props.wordsTyped}
          {this.props.storiesPublished}
        </span>
      </div>
    );
  }
}
export default LeaderboardSingleLog;
