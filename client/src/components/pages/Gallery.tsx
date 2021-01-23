import React, { Component } from "react";
import Story from "../../../../shared/Story";
import { get } from "../../utilities";
import SingleStoryCard from "../../components/modules/../modules/Landing/SingleStoryCard";
import { RouteComponentProps } from "@reach/router";

interface Props extends RouteComponentProps {
  userId: string;
}
interface State {
  storyList: Story[];
}
class Gallery extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      storyList: [],
    };
  }

  componentDidMount() {
    get("/api/stories").then((stories) => {
      this.setState({ storyList: stories.reverse() });
    });
  }

  render() {
    let storyListSorted = this.state.storyList.slice();
    storyListSorted.sort((a, b) => (a.usersThatLiked.length < b.usersThatLiked.length ? 1 : -1));

    let storyListElement = storyListSorted.map((story, i) => (
      <SingleStoryCard
        name={story.name}
        contributors={story.contributorNames}
        content={story.content}
        usersThatLiked={story.usersThatLiked}
        keywords={story.keywords}
        userId={this.props.userId}
        storyId={story._id}
        key={i}
        comments={story.comments}
      />
    ));

    return (
      <>
        <div className="GalleryTitle-container">
          <span className="Gallery-title fade-in">Gallery</span>
        </div>

        <div className="Gallery-container fade-in2">
          {storyListElement === null ? <p>loading</p> : storyListElement}
        </div>
      </>
    );
  }
}
export default Gallery;
