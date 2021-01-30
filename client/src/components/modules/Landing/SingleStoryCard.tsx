import React, { Component } from "react";
import Story from "../../../../../shared/Story";
import StoryInteractionBar from "./StoryInteractionBar";
import CommentsBlock from "./CommentsBlock";
import { post } from "../../../utilities";
// import AOS from "aos";
// import "aos/dist/aos.css";
import Comment from "../../../../../shared/Comment";
interface Props {
  name: string;
  contributors: string[];
  content: string;
  usersThatLiked: string[];
  keywords: string[];
  storyId: string;
  userId: string;

  comments: any[];
}
interface State {
  likes: number;
  hasLiked: boolean;
  showComments: boolean;
  temporaryExtraCommentLength: number;
}

class SingleStoryCard extends Component<Props, State> {

  containerDiv: HTMLDivElement;

  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.usersThatLiked.length,
      hasLiked: false,
      showComments: false,
      temporaryExtraCommentLength: 0,
    };
  }
  incrementTemporaryExtraCommentLength = () => {
    this.setState((prevState) => ({
      temporaryExtraCommentLength: prevState.temporaryExtraCommentLength + 1,
    }));
  };
  componentDidMount() {
    if (this.props.userId && this.props.usersThatLiked.includes(this.props.userId)) {
      this.setState({ hasLiked: true });
    }

    window.addEventListener("scroll", this.animateFadeIn);
  }
  animateFadeIn = () => {
    if (this.containerDiv.offsetTop - window.scrollY < window.innerHeight) {
      this.containerDiv.classList.toggle("show");
      window.removeEventListener("scroll", this.animateFadeIn);
    }
  }
  likeFunction = () => {
    //Like function
    const body = { storyId: this.props.storyId, userId: this.props.userId };
    // console.log(this.state.hasLiked);
    if (this.props.userId) {
      post("/api/likeStory", body).then((response) => {
        // this.setState({
        //   likes: response.likes,
        //   hasLiked: !response.hasLiked,
        // });
        this.setState((prevState) => ({
          likes: response.likes,
          hasLiked: !prevState.hasLiked,
        }));
      });
    } else {
      console.log(`ID: ${this.props.userId} not logged in`);
    }
    this.forceUpdate();

    //console.log(this.props.storyId);
    //console.log(this.props.userId);
  };
  ShowButtonsClick = () => {
    // console.log("yeet");
    this.setState((prevState) => ({ showComments: !prevState.showComments }));
    console.log(this.state.showComments);
  };

  render() {
    let contributorsElement = null;
    contributorsElement = this.props.contributors.map((contributor, i) => (
      <span key={i}>{contributor + ", "}</span>
    ));
    contributorsElement.pop();
    contributorsElement.push(
      <span key={this.props.contributors.length}>
        and {this.props.contributors[this.props.contributors.length - 1]}
      </span>
    );

    let keywordsElement = this.props.keywords.map((keyword, i) => (
      <span key={i}>{keyword + ", "}</span>
    ));
    keywordsElement.pop();
    keywordsElement.push(
      <span key={this.props.keywords.length}>
        {this.props.keywords[this.props.keywords.length - 1]}
      </span>
    );

    return (
      <div className="SingleStoryCard-container" ref={(containerDiv) => this.containerDiv = containerDiv}>
        <div className="SingleStoryCard-StoryTitle">{this.props.name}</div>
        <div className="SingleStoryCard-Contributors">
          By: {"  "}
          {contributorsElement}
        </div>
        <div className="SingleStoryCard-Content">{this.props.content}</div>
        <div className="SingleStoryCard-Keywords">
          <span className="u-bold">{"Keywords: "}</span>
          {keywordsElement}
        </div>
        <StoryInteractionBar
          numLikes={this.state.likes}
          userId={this.props.userId}
          onClick={this.likeFunction}
          hasLiked={this.state.hasLiked}
          comments={this.props.comments}
          onShowButtonsClick={this.ShowButtonsClick}
          showComments={this.state.showComments}
          temporaryExtraCommentLength={this.state.temporaryExtraCommentLength}
        />
        <CommentsBlock
          comments={this.props.comments}
          showComments={this.state.showComments}
          userId={this.props.userId}
          storyId={this.props.storyId}
          incrementTemporaryExtraCommentLength={this.incrementTemporaryExtraCommentLength}
        />
      </div>
    );
  }
}

export default SingleStoryCard;
