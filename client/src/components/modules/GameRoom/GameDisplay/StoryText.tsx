import React, { Component } from "react";

interface Props {
  currentStory: string;
  currentInput: string;
}
class StoryText extends Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="StoryText container" id="storyText">
        <span className="story">{this.props.currentStory + " "}</span>
        <span className="input">{this.props.currentInput}</span></div>
    );
  }
}

export default StoryText;
