import React, { Component } from "react";

interface Props {
  word: string;
}
class Keyword extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="KeywordText">{this.props.word}</div>;
  }
}

export default Keyword;
