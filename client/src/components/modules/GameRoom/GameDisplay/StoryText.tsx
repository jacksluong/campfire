import React, { Component } from "react";
import "./StoryText.scss";

interface Props {
  currentStory: string;
  currentInput: string;
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
