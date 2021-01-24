import React, { Component } from "react";
import "./Profile.css";

interface Props {
  word: string;
}
class Keyword extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="Keyword">{this.props.word}</div>;
  }
}

export default Keyword;
