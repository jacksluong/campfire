import React, { Component } from "react";

interface Props {}

class StoryInteractionBar extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }
  handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //Like function
  };
  render() {
    return (
      <div className="StoryInteractionBar-container">
        <button type="submit" className="LikeButton" onClick={this.handleClick}>
          Like
        </button>
      </div>
    );
  }
}

export default StoryInteractionBar;
