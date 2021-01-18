import React, { Component } from "react";
import Story from "../../../../../shared/Story";
interface Props {
  name: string;
  contributors: string[];
  content: string;
  usersThatLiked: string[];
  keywords: string[];
}

class SingleStoryCard extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="SingleStoryCard-container">
        Story card
        <div className="SingleStoryCard-StoryTitle">{this.props.name}</div>
        <div className="SingleStoryCard-Contributors">{this.props.contributors}</div>
        <div className="SingleStoryCard-Content">{this.props.content}</div>
        <div className="SingleStoryCard-usersThatLiked">{this.props.usersThatLiked}</div>
        <div className="SingleStoryCard-Keywords">{this.props.keywords}</div>
      </div>
    );
  }
}

export default SingleStoryCard;
