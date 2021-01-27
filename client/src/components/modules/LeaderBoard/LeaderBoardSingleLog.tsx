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
      <tr>
        {/* <span>
          {`name: ${this.props.name} `}
          {`words typed: ${this.props.wordsTyped} `}
          {`stories published ${this.props.storiesPublished} `}
        </span> */}
        <td> {`name: ${this.props.name} `}</td>
        <td>{`words typed: ${this.props.wordsTyped} `}</td>
        <td>{`stories published ${this.props.storiesPublished} `}</td>
      </tr>
    );
  }
}
export default LeaderboardSingleLog;
