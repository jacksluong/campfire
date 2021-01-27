import React, { Component } from "react";
import { navigate } from "@reach/router";
interface Props {
  name: string;
  userId: string;
  pfp: string;
  wordsTyped: number;
  storiesPublished: number;
}
class LeaderboardSingleLog extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }
  handleProfileNavigate = (senderId: string) => {
    navigate(`/profile/${senderId}`);
  };
  render() {
    return (
      <tr className="EntryRow borderbottom">
        <td>
          <span
            onClick={() => this.handleProfileNavigate(this.props.userId)}
            className="CommentPic"
            style={{ backgroundImage: `url(${this.props.pfp})` }}
          ></span>
          <span
            onClick={() => this.handleProfileNavigate(this.props.userId)}
            className="LeaderBoardName"
          >{` ${this.props.name} `}</span>
        </td>
        <td>{`words:  ${this.props.wordsTyped} `}</td>
        <td>{`stories: ${this.props.storiesPublished} `}</td>
      </tr>
    );
  }
}
export default LeaderboardSingleLog;
