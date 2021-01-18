import React, { Component } from "react";
import Story from "../../../../../server/models/Story";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [],
    };
  }

  componentDidMount() {}
  render() {
    return <div className="Gallery-container"></div>;
  }
}
export default Gallery;
