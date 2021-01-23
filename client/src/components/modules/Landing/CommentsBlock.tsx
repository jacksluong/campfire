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
  handleShowButtonsClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.setState((prevState) => ({ showComments: !prevState.showComments }));
    console.log(this.state.showComments);
  };

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
          <>
            <button className="CommentButton-container" onClick={this.handleShowButtonsClick}>
              Hide comments
            </button>
            {commentsElement}
          </>
        ) : (
          <button className="CommentButton-container" onClick={this.handleShowButtonsClick}>
            Show comments | {commentsElement.length}
          </button>
        )}
      </div>
    );
  }
}
export default CommentsBlock;
