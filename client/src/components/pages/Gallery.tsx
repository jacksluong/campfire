import React, { Component } from "react";
import Story from "../../../../shared/Story";
import { get } from "../../utilities";
import SingleStoryCard from "../modules/Landing/SingleStoryCard";
import { RouteComponentProps } from "@reach/router";
import { Link, animateScroll as scroll } from "react-scroll";
import NavBar from "../modules/NavBar";
import StoryGallery from "../modules/StoryGallery/StoryGallery";

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
    });
  }

  render() {
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

        {/* <div className="Gallery-container fade-in2" id="gallery">
          {storyListElement === null ? <p>loading</p> : storyListElement}
        </div> */}
        <StoryGallery 
          userId={this.props.userId}
          storyList={this.state.storyList}
        />
      </>
    );
  }
}
export default Gallery;
