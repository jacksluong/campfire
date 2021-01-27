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
          {`name: ${this.props.name} `}
          {`words typed: ${this.props.wordsTyped} `}
          {`stories published ${this.props.storiesPublished} `}
        </span>
      </div>
    );
  }
}
export default LeaderboardSingleLog;
