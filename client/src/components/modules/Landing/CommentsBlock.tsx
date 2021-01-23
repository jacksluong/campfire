import React, { Component } from "react";
import Comment from "../../../../../shared/Comment";

interface Props {
  comments: Comment[];
}
interface State {
  showComments: boolean;
}
class CommentsBlock extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      showComments: false,
    };
  }
  handleShowButtonsClick = (event: HTMLButtonElement) => {};

  componentDidMount = () => {
    //get comments
  };
  render() {
    let commentsElement = null;
    commentsElement = this.props.comments.map((comment) => <div>{comment.content}</div>);
    return (
      <div className="comments-container">
        {/* <br></br> */}
        {this.state.showComments ? (
          commentsElement
        ) : (
          <button className="CommentButton-container">Show comments</button>
        )}
      </div>
    );
  }
}
export default CommentsBlock;
