import React, { Component } from "react";
import Story from "../../../../../shared/Story";
import StoryInteractionBar from "./StoryInteractionBar";
import CommentsBlock from "./CommentsBlock";
import { post } from "../../../utilities";
interface Props {
  name: string;
  contributors: string[];
  content: string;
  usersThatLiked: string[];
  keywords: string[];
  storyId: string;

  userId: string;
}
interface State {
  likes: number;
}

class SingleStoryCard extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.usersThatLiked.length,
    };
  }
  componentDidMount() {}
  likeFunction = () => {
    //Like function
    const body = { storyId: this.props.storyId, userId: this.props.userId };
    if (this.props.userId) {
      post("/api/likeStory", body).then((response) => {
        this.setState((prevState) => ({
          likes: response.likes,
        }));
      });
    } else {
      console.log(`ID: ${this.props.userId} not logged in`);
    }

    //console.log(this.props.storyId);
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
          numLikes={this.state.likes}
          userId={this.props.userId}
          onClick={this.likeFunction}
        />
        <CommentsBlock />
      </div>
    );
  }
}

export default SingleStoryCard;
