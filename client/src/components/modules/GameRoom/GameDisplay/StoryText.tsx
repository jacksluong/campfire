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

  componentDidMount() {
    window.addEventListener('resize', this.setStoryTextWidth);
  }

  componentDidUpdate() {
    this.setStoryTextWidth();
  }

  setStoryTextWidth = (): void => {
    document.getElementById("storyText").style.width = (Math.max(window.innerWidth, 920) - 300 - 20 - 30 - 30) + "px"; // sidebar + sidebar padding + storytext margin + storytext padding
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
