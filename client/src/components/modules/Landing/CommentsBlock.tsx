import { response } from "express";
import React, { Component } from "react";
import Comment from "../../../../../shared/Comment";
import { post } from "../../../utilities";
import { navigate } from "@reach/router";

interface Props {
  comments: Comment[];
  showComments: boolean;
  storyId: string;
  userId: string;
  incrementTemporaryExtraCommentLength: () => void;
}
interface State {
  value: string;
  newComments: Comment[];
}
class CommentsBlock extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      newComments: [],
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

  handleProfileNavigate = (senderId: string) => {
    navigate(`/profile/${senderId}`);
  };
  handleNewCommentSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // console.log(this.state.value);
    if (this.props.userId && this.state.value.length > 0) {
      const body = {
        storyId: this.props.storyId,
        userId: this.props.userId,
        content: this.state.value,
      };
      post("/api/newComment", body).then((response) => {
        //response is a new comment with name, senderId, content
        // console.log(response);
        let newComments = [...this.state.newComments];
        newComments.push(response);
        this.setState({ newComments: newComments });
        // console.log(this.state.newComments);
        this.props.incrementTemporaryExtraCommentLength();
        this.setState({ value: "" });
      });
    } else {
      alert("Log in/dont leave comments blank");
    }
    this.setState({ value: "" });
  };

  render() {
    //get comments
    let commentsElement = null;
    let totalComments = [...this.props.comments].concat([...this.state.newComments]);
    commentsElement = totalComments.map((comment) => (
      <div className="CommentContainer">
        <span
          onClick={() => this.handleProfileNavigate(comment.senderId)}
          className="CommentPic"
          style={{ backgroundImage: `url(${comment.pfp})` }}
        ></span>
        {console.log(`Comment pfp url: ${comment.pfp}`)}
        <span onClick={() => this.handleProfileNavigate(comment.senderId)} className="CommentName">
          {comment.name}
        </span>
        {comment.content}
      </div>
    ));

    return (
      <div className="CommentsBlock-container">
        <div className="comments-container">{this.props.showComments ? commentsElement : null}</div>
        {this.props.userId ? (
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
        ) : null}
      </div>
    );
  }
}
export default CommentsBlock;
