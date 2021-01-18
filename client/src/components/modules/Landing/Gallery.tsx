import React, { Component } from "react";
import Story from "../../../../../shared/Story";

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
    // let dummyStory1: Story = {
    //   name: "dummyName",
    //   _id: "123",
    //   contributors: ["dummyNames", "Dummyname2"],
    //   content: "This is a story!",
    //   usersThatLiked: ["player1", "player2,"],
    //   keywords: ["potato"],
    // };
    // let newStoriesList = [...this.state.storyList];
    // newStoriesList.push(dummyStory1);
    // this.setState((prevState) => {
    //   return {
    //     ...prevState,
    //     storyList: newStoriesList,
    //   };
    // });
  }

  render() {
    return <div className="Gallery-container"></div>;
  }
}
export default Gallery;
