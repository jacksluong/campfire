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
    let storyListElement = this.state.storyList.map((story, i) => (
      <SingleStoryCard
        name={story.name}
        contributors={story.contributorNames}
        content={story.content}
        usersThatLiked={story.usersThatLiked}
        keywords={story.keywords}
        userId={this.props.userId}
        storyId={story._id}
        key={i}
      />
    ));

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
