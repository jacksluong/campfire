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
    document.getElementById("storyText").style.width = (window.innerWidth - 300 - 30 - 30 - 20) + "px";
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
