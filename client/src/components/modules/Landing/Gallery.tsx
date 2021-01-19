import React, { Component } from "react";
import Story from "../../../../../shared/Story";
import { get } from "../../../utilities";
import SingleStoryCard from "./SingleStoryCard";
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
      this.setState({ storyList: stories });
      console.log(this.state.storyList);
    });
  }

  render() {
    let storyListElement = null;
    storyListElement = this.state.storyList.map((story) => (
      <SingleStoryCard
        name={story.name}
        contributors={story.contributors}
        content={story.content}
        usersThatLiked={story.usersThatLiked}
        keywords={story.keywords}
      />
    ));
    console.log(storyListElement);

    return (
      <>
        <div className="Gallery-title">Gallery</div>

        <div className="Gallery-container">
          {storyListElement === null ? <p>loading</p> : storyListElement}
        </div>
      </>
    );
  }
}
export default Gallery;
