import React, { Component } from "react";
import Story from "../../../../../shared/Story";
import SingleStoryCard from "../Landing/SingleStoryCard";
import StoryCard from "./StoryCard";

interface Props {
  userId: string;
  getNextStory: () => Story | boolean;
}

interface State {
  rendered: Story[];
}

class GalleryColumn extends Component<Props, State> {

  containerDiv: HTMLDivElement;
  scrollThrottle = false;

  constructor(props) {
    super(props);
    this.state = {
      rendered: []
    };
  }

  componentDidMount() {
    // when posting a comment, use res.send to send back the comment that contains content, name, and pfp
    window.addEventListener("scroll", this.processScroll);
  }

  componentDidUpdate() {
    // added a story, load more if necessary
    this.checkSpace();
  }

  processScroll = () => {
    if (!this.scrollThrottle) {
      this.scrollThrottle = true;
      this.checkSpace();
      setTimeout(() => this.scrollThrottle = false, 50);
    }
  }

  checkSpace = () => {
    if (this.containerDiv.offsetTop + this.containerDiv.clientHeight - window.scrollY < window.innerHeight + 150) {
      let nextStory = this.props.getNextStory();
      if (nextStory === false) {
        // no more stories
        window.removeEventListener("scroll", this.processScroll);
      } else if (nextStory === true) {
        // occupied, check again in a bit
        setTimeout(this.checkSpace, 50);
      } else {
        // here's a story
        this.setState(prevState => ({
          rendered: prevState.rendered.concat(nextStory as Story)
        }));
      }
    }

    /* if (this.state.rendered.length === this.props.storyList.length) {
      window.removeEventListener("scroll", this.processScroll);
      return;
    }
    if (this.containerDiv.offsetTop + this.containerDiv.clientHeight - window.scrollY < window.innerHeight + 200) {
      // load story into column
      this.setState(prevState => ({
        rendered: prevState.rendered.concat(this.props.storyList[prevState.rendered.length])
      }));
    } */
  }
  
  render() {
    return (
      <div 
        className="GalleryColumn container"
        ref={(containerDiv) => this.containerDiv = containerDiv}
      >
        {this.state.rendered.map((story, i) => {
          return <StoryCard 
            userId={this.props.userId}
            story={story}
            key={i}
          />
        })}
      </div>
    )
  }
}
export default GalleryColumn;