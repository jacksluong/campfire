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
      <tr className="EntryRow borderbottom">
        <td> {` ${this.props.name} `}</td>
        <td>{`words:  ${this.props.wordsTyped} `}</td>
        <td>{`stories: ${this.props.storiesPublished} `}</td>
      </tr>
    );
  }
}
export default LeaderboardSingleLog;
