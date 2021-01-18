import React, { Component } from "react";
import "./Passage.scss";

interface Props {
  story: string;
}
class StoryText extends Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <div className="Passage-container">{this.props.story}</div>;
  }
}

export default StoryText;
