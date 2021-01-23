import React, { Component } from "react";
import { post } from "../../../utilities";
import Comment from "../../../../../shared/Comment";

interface Props {
  numLikes: number;
  userId: string;
  onClick: () => void;
  onShowButtonsClick: () => void;

  hasLiked: boolean;
  comments: Comment[];
  showComments: boolean;
}
interface State {
  value: string;
  showComments: boolean;
}

class StoryInteractionBar extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      showComments: false,
    };
  }
  //Likebutton
  handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //Like function
    this.props.onClick();
    this.forceUpdate();
    //console.log(this.props.hasLiked);
  };
  //Show comments button
  handleShowButtonsClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // this.setState((prevState) => ({ showComments: !prevState.showComments }));
    // console.log(this.state.showComments);
    this.props.onShowButtonsClick();
  };

  render() {
    return (
      <div className="StoryInteractionBar-container">
        <button type="submit" className={`LikeButton-container`} onClick={this.handleClick}>
          {`${this.props.hasLiked ? "Unlike" : "Like"} | ${this.props.numLikes}`}
        </button>
        {this.props.showComments ? (
          <>
            <button className="CommentButton-container" onClick={this.handleShowButtonsClick}>
              Hide comments
            </button>
          </>
        ) : (
          <button className="CommentButton-container" onClick={this.handleShowButtonsClick}>
            Show comments | {this.props.comments.length}
          </button>
        )}
      </div>
    );
  }
}

export default StoryInteractionBar;
