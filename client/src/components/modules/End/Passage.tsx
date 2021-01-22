import React, { Component } from "react";
import "./Passage.scss";

interface Props {
  content: string;
  contributors: string[];
}
class Passage extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Passage-container">
        <h2>Story</h2>
        {this.props.content}
        <h3>Contributors</h3>
        {this.props.contributors.map((name) => (
          <div>{name}</div>
        ))}
      </div>
    );
  }
}

export default Passage;
