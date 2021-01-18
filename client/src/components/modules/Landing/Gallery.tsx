import React, { Component } from "react";
import Story from "../../../../../shared/Story";
import { get } from "../../../utilities";

interface State {
  storyList: Story[];
}
class Gallery extends Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = {
      storyList: [],
    };
  }

  componentDidMount() {
    get("/api/stories").then((stories) => {
      this.setState({storyList: stories});
    })
  }

  render() {
    return <div className="Gallery-container"></div>;
  }
}
export default Gallery;
