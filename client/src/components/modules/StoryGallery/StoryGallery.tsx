import React, { Component } from "react";
import Story from "../../../../../shared/Story";
import GalleryColumn from "./GalleryColumn";

interface Props {
  userId: string;
  storyList: Story[];
}

interface State {
  storyList: Story[];
  renderedStories: number;
}

class StoryGallery extends Component<Props, State> {

  taken = false;
  resizeThrottle = false;

  constructor(props) {
    super(props);
    this.state = { storyList: [], renderedStories: 0 };
  }

  componentDidMount() {
    window.addEventListener("resize", this.processResize);
  }

  shouldComponentUpdate(newProps) {
    return newProps.storyList.length !== this.state.storyList.length;
  }

  componentDidUpdate() {
    this.setState({ storyList: this.props.storyList });
  }

  processResize = () => {
    if (!this.resizeThrottle) {
      this.resizeThrottle = true;
      this.forceUpdate();
      setTimeout(() => this.resizeThrottle = false, 75);
    }
  }

  getNextStory = (): Story | boolean => {
    if (this.taken) {
      return true;
    }
    this.taken = true;

    let returnValue: any = false;
    if (this.state.renderedStories < this.state.storyList.length) {
      let nextStoryIndex = this.state.renderedStories;
      this.setState({
        renderedStories: nextStoryIndex + 1
      }, () => this.taken = false);
      returnValue = this.state.storyList[nextStoryIndex];
    }
    return returnValue;
  }

  render() {
    if (!this.props.storyList.length) return <div></div>;
    let numColumns = window.innerWidth > 600 ? 3 : 2;
    let columns = [];
    for (let i = 0; i < numColumns; i++) {
      columns.push(
        <GalleryColumn
          userId={this.props.userId}
          getNextStory={this.getNextStory}
          key={i}
        />
      );
    }
    return <div className="StoryGallery container">{columns}</div>;

    /* let storyListElement = storyListSorted
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
      <>
        <NavBar
          handleLogin={this.props.handleLogin}
          handleLogout={this.props.handleLogout}
          userId={this.props.userId}
          leftButtonText="home"
          leftButtonPath="/"
        />
        <div className="GalleryTitle-container">
          <span className="Gallery-title fade-in">Gallery</span>
        </div>
        <Link activeClass="active" to="gallery" spy={true} smooth={true} duration={1500}>
          <div className="boxArrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </Link>

        <div className="Gallery-container fade-in2" id="gallery">
          {storyListElement === null ? <p>loading</p> : storyListElement}
        </div>
      </>
    ); */
  }
}
export default StoryGallery;
