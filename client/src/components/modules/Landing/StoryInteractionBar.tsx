import React, { Component } from "react";
import { post } from "../../../utilities";

interface Props {
  numLikes: number;
  userId: string;
  onClick: () => void;
}
interface State {
  value: string;
}

class StoryInteractionBar extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }
  handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //Like function
    this.props.onClick();
    //console.log("click");
  };
  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
    });
  };
  render() {
    return (
      <div className="StoryInteractionBar-container">
        <button type="submit" className="LikeButton-container" onClick={this.handleClick}>
          {`Like | ${this.props.numLikes}`}
        </button>
        <input className="NewComment-container" type="text" defaultValue="Write a comment"></input>
      </div>
    );
  }
}

export default StoryInteractionBar;
