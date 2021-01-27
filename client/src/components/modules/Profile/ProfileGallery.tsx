import React, { Component } from "react";
import Story from "../../../../../shared/Story";
import { get } from "../../../../src/utilities";
import SingleStoryCard from "../Landing/SingleStoryCard";

interface Props {
  userId: string;
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
  componentDidMount() {
    get("/api/userInfo", { userId: this.props.userId }).then((user) => {
      get("/api/profileStories", {
        storiesWorkedOn: user.storiesWorkedOn,
      }).then((stories) => {
        this.setState({ storyList: stories.reverse() });
      });
    });
  }

  render() {
    let storyListSorted = this.state.storyList.slice();
    storyListSorted.sort((a, b) => (a.usersThatLiked.length < b.usersThatLiked.length ? 1 : -1));

    let storyListElement = storyListSorted
      .reverse()
      .map((story, i) => (
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
      <div className="ProfileStories-Container">
        {storyListElement === null ? <p>loading</p> : storyListElement}
      </div>
    );
  }
}
export default ProfileGallery;
