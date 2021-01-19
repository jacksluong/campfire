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
        <div className="SingleStoryCard-StoryTitle">Story Title: {this.props.name}</div>
        <div className="SingleStoryCard-Contributors">Contributors: {this.props.contributors}</div>
        <div className="SingleStoryCard-Content">Content: {this.props.content}</div>
        <div className="SingleStoryCard-usersThatLiked">Like By: {this.props.usersThatLiked}</div>
        <div className="SingleStoryCard-Keywords">Keywords: {this.props.keywords}</div>
      </div>
    );
  }
}

export default SingleStoryCard;
