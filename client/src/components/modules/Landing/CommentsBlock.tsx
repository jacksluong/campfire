import React, { Component } from "react";
import Comment from "../../../../../shared/Comment";

interface Props {
  comments: Comment[];
}
class CommentsBlock extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }
  componentDidMount = () => {
    //get comments
  };
  render() {
    let commentsElement = null;
    commentsElement = this.props.comments.map((comment) => <div>{comment.content}</div>);
    return <div className="CommmentsBlock">{commentsElement}</div>;
  }
}
export default CommentsBlock;
