import React, { Component } from "react";
import Story from "../../../../../shared/Story";
import { get } from "../../../../src/utilities";
import SingleStoryCard from "../Landing/SingleStoryCard";

interface Props {
  userId: string;
  storiesWorkedOn: string[];
}
interface State {
  storyList: Story[];
}
class ProfileGallery extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      storyList: [],
    };
  }
  updated: boolean;
  componentDidMount() {
    this.updated = false;
    console.log("In Component Did Mount of Profile Gallery");
  }

  componentDidUpdate() {
    if (!this.updated) {
      console.log("in component did update of profile gallery");
      this.updated = true;
      get("/api/profileStories", {
        storiesWorkedOn: this.props.storiesWorkedOn,
      }).then((stories) => {
        this.setState({ storyList: stories.reverse() });
        console.log(`Stories Received: ${stories}`);
      });
    }
  }

  render() {
    console.log("in render of profilegallery");
    console.log(this.props.storiesWorkedOn);
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

    return <>{storyListElement === null ? <p>loading</p> : storyListElement}</>;
  }
}
export default ProfileGallery;
