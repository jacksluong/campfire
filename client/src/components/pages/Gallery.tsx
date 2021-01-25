import React, { Component } from "react";
import Story from "../../../../shared/Story";
import { get } from "../../utilities";
import SingleStoryCard from "../../components/modules/../modules/Landing/SingleStoryCard";
import { RouteComponentProps } from "@reach/router";
import { Link, animateScroll as scroll } from "react-scroll";
import Comment from "../../../../shared/Comment";
import NavBar from "../modules/NavBar";

interface Props extends RouteComponentProps {
  userId: string;
  pfp: string;
  handleLogin: any;
  handleLogout: any;
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
      console.log(stories.length);
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
        <NavBar
          pfp={this.props.pfp}
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
    );
  }
}
export default Gallery;
