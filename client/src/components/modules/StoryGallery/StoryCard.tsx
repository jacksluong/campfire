import React, { Component } from "react";
import Story from "../../../../../shared/Story";
import CommentsBlock from "./CommentsBlock";

interface Props {
  userId: string;
  story: Story;
}

interface State {
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
      showComments: false
      /* likes: this.props.usersThatLiked.length,
      hasLiked: false,
      showComments: false,
      temporaryExtraCommentLength: 0 */
    };
  }

  componentDidMount() {
    window.addEventListener("scroll", this.animateFadeIn);
  }

  animateFadeIn = () => {
    if (this.containerDiv.offsetTop - window.scrollY < window.innerHeight) {
      this.containerDiv.classList.toggle("show");
      window.removeEventListener("scroll", this.animateFadeIn);
    }
  }

  render() {
    let story = this.props.story;
    let authors = "";
    if (story.contributorNames.length === 1) authors = story.contributorNames[0];
    else authors = story.contributorNames.slice(0, story.contributorNames.length - 1).join(", ") + ` and ${story.contributorNames[story.contributorNames.length - 1]}`;
    return (
      <div 
        className="StoryCard container" 
        ref={(containerDiv) => this.containerDiv = containerDiv}
      >
        <h2>{story.name}</h2>
        <p>{"By:  " + authors}</p>
        <p>{story.content}</p>
        <h3><strong>{"Keywords:  " + story.keywords.join(", ")}</strong></h3>
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