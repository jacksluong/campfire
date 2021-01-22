import React, { Component } from "react";
import Story from "../../../../../shared/Story";
import StoryInteractionBar from "./StoryInteractionBar";
import CommentsBlock from "./CommentsBlock";
import { post } from "../../../utilities";
import AOS from "aos";
import "aos/dist/aos.css";
interface Props {
  name: string;
  contributors: string[];
  content: string;
  usersThatLiked: string[];
  keywords: string[];
  storyId: string;
  userId: string;
  comments: Map<string, string>;
}
interface State {
  likes: number;
  hasLiked: boolean;
}

class SingleStoryCard extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.usersThatLiked.length,
      hasLiked: false,
    };
  }
  componentDidMount() {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/aos@next/dist/aos.css";
    script.innerHTML = AOS.init({
      offset: 200,
      duration: 500,
    });
    script.async = true;
    document.body.appendChild(script);
    if (this.props.userId && this.props.usersThatLiked.includes(this.props.userId)) {
      this.setState({ hasLiked: true });
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
      <div className="SingleStoryCard-container" data-aos="fade-up" data-aos-easing="ease-in-out">
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
          hasLiked={this.state.hasLiked}
        />
        <CommentsBlock />
      </div>
    );
  }
}

export default SingleStoryCard;
