import React, { Component } from "react";
import Story from "../../../../../shared/Story";
import StoryInteractionBar from "./StoryInteractionBar";
import CommentsBlock from "./CommentsBlock";
interface Props {
  name: string;
  contributors: string[];
  content: string;
  usersThatLiked: string[];
  keywords: string[];

  userId: string;
}
interface State {
  liked: boolean;
}

class SingleStoryCard extends Component<Props, State> {
  constructor(props) {
    super(props);
  }
  likeFunction = () => {
    //Like function
    console.log("like");
    //console.log(this.props.userId);
  };

  render() {
    let contributorsElement = null;
    contributorsElement = this.props.contributors.map((contributor) => (
      <span>{contributor + ", "}</span>
    ));
    contributorsElement.pop();
    contributorsElement.push(
      <span>and {this.props.contributors[this.props.contributors.length - 1]}</span>
    );
    let keywordsElement = null;
    keywordsElement = this.props.keywords.map((keyword) => <span>{keyword + ", "}</span>);
    keywordsElement.pop();
    keywordsElement.push(<span> {this.props.keywords[this.props.keywords.length - 1]}</span>);

    return (
      <div className="SingleStoryCard-container">
        <div className="SingleStoryCard-StoryTitle">{this.props.name}</div>
        <div className="SingleStoryCard-Contributors">
          By: {"  "}
          {contributorsElement}
        </div>
        <div className="SingleStoryCard-Content">{this.props.content}</div>
        <div className="SingleStoryCard-Keywords">{keywordsElement}</div>
        <StoryInteractionBar
          numLikes={this.props.usersThatLiked.length}
          userId={this.props.userId}
          onClick={this.likeFunction}
        />
        <CommentsBlock />
      </div>
    );
  }
}

export default SingleStoryCard;
