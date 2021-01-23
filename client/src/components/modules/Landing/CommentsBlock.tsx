import React, { Component } from "react";
import Comment from "../../../../../shared/Comment";

interface Props {
  comments: Comment[];
  showComments: boolean;
}
interface State {
  // showComments: boolean;
}
class CommentsBlock extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      // showComments: false,
    };
  }

  componentDidMount = () => {
    //get comments
  };
  render() {
    //get comments
    let commentsElement = null;
    commentsElement = this.props.comments.map((comment) => <div>{comment.content}</div>);

    return (
      <div className="u-widthfill">
        <div className="comments-container">
          {/* <br></br> */}
          {this.props.showComments ? commentsElement : null}
          <input
            className="NewComment-container"
            type="text"
            defaultValue="Write a comment"
          ></input>
        </div>
      </div>
    );
  }
}
export default CommentsBlock;
