import React, { Component } from "react";

interface Props {
  currentStory: string;
  storyInput: string;
}
class StoryText extends Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <div className="StoryText-container">This is a story.</div>;
  }
}

export default StoryText;
