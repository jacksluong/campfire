import React, { Component } from "react";
import Story from "../../../../../shared/Story";
import CommentsBlock from "./CommentsBlock";

interface Props {
  userId: string;
  story: Story;
}

interface State {
  maxCollapsedHeight: number;
  maxExpandedHeight: number;
  expanded: boolean;
  showComments: boolean;
  /* likes: number;
  hasLiked: boolean;
  showComments: boolean;
  temporaryExtraCommentLength: number; */
}

class StoryCard extends Component<Props, State> {

  containerDiv: HTMLDivElement;

  constructor(props) {
    super(props);
    this.state = {
      maxCollapsedHeight: 0,
      maxExpandedHeight: 0,
      expanded: false,
      showComments: false
      /* likes: this.props.usersThatLiked.length,
      hasLiked: false,
      showComments: false,
      temporaryExtraCommentLength: 0 */
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.animateFadeIn);
    let maxCollapsedHeight = Math.ceil(Math.random() * 200) + 300;
    let maxExpandedHeight = this.containerDiv.clientHeight;
    if (maxExpandedHeight < maxCollapsedHeight) maxCollapsedHeight = maxExpandedHeight;
    this.setState({
      maxCollapsedHeight: maxCollapsedHeight,
      maxExpandedHeight: maxExpandedHeight
    }, () => this.containerDiv.style.maxHeight = this.state.maxCollapsedHeight + "px");
  }

  animateFadeIn = () => {
    if (this.containerDiv.offsetTop - window.scrollY < window.innerHeight) {
      this.containerDiv.classList.toggle("show");
      window.removeEventListener("scroll", this.animateFadeIn);
    }
  }

  toggleExpand = () => {
    this.setState(prevState => ({ 
      maxCollapsedHeight: prevState.maxCollapsedHeight,
      expanded: !prevState.expanded,
      showComments: prevState.showComments
    }), () => this.containerDiv.style.maxHeight = (this.state.expanded ? this.state.maxExpandedHeight : this.state.maxCollapsedHeight) + "px");
  }

  render() {
    let story = this.props.story;
    let authors = "";
    if (story.contributorNames.length === 1) authors = story.contributorNames[0];
    else authors = story.contributorNames.slice(0, story.contributorNames.length - 1).join(", ") + ` and ${story.contributorNames[story.contributorNames.length - 1]}`;
    return (
      <div 
        className="StoryCard container" 
        onClick={this.toggleExpand}
        ref={(containerDiv) => this.containerDiv = containerDiv}
      >
        <div className="title">{story.name}</div>
        <div className="subtitle">{"by " + authors}</div>
        <div className="body">{story.content}</div>
        <div className="subtitle"><strong>{"Keywords:  " + story.keywords.join(", ")}</strong></div>
        <button className="LikeButton">{`${story.usersThatLiked.includes(this.props.userId) ? "Unlike" : "Like"} | ${story.usersThatLiked.length}`}</button>

        <CommentsBlock
          comments={story.comments}
          showComments={this.state.showComments}
          userId={this.props.userId}
          storyId={story._id}
        />
      </div>
    )
  }
}
export default StoryCard;