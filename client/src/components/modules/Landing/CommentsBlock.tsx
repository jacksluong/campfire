import React, { Component } from "react";
import Comment from "../../../../../shared/Comment";

interface Props {
  comments: Comment[];
  showComments: boolean;
}
interface State {
  // showComments: boolean;
  value: string;
}
class CommentsBlock extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      // showComments: false,
      value: "",
    };
  }

  componentDidMount = () => {
    //get comments
  };
  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
    });
  };
  handleNewCommentSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    console.log(this.state.value);
  };

  render() {
    //get comments
    let commentsElement = null;
    commentsElement = this.props.comments.map((comment) => <div>{comment.content}</div>);

    return (
      <div className="CommentsBlock-container">
        <div className="comments-container">
          {/* <br></br> */}
          {this.props.showComments ? commentsElement : null}
          <span>
            <input
              className="NewComment-container"
              type="text"
              placeholder="Write a comment"
              onChange={this.onChange}
            ></input>
            <button
              className="NewCommentButton-container"
              type="submit"
              value=""
              onClick={this.handleNewCommentSubmit}
            >
              Submit
            </button>
          </span>
        </div>
      </div>
    );
  }
}
export default CommentsBlock;
