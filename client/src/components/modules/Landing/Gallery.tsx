import React, { Component } from "react";
import Story from "../../../../../shared/Story";

interface State {
  storyList: Story[];
}
class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storyList: [],
    };
  }

  componentDidMount() {
    let dummyStory1: Story = {
      name: "dummyName",
      contributors: ["dummyNames", "Dummyname2"],
      content: "This is a story!",
      usersThatLiked: ["player1", "player2,"],
    };

    let newStoriesList = this.state.storyList.slice();

    this.setState((prevState) => {
      return {
        ...prevState,
      };
    });
  }

  render() {
    return <div className="Gallery-container"></div>;
  }
}
export default Gallery;
