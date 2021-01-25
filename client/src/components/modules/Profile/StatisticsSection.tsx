import React, { Component } from "react";
import "./Profile.css";
import Keyword from "./Keyword";
import { Link, animateScroll as scroll } from "react-scroll";
import ProfileGallery from "./ProfileGallery";

interface Props {
  userId: string;
  wordsTyped: number;
  storiesWorkedOn: string[];
  wordFrequencies: { word: string; frequency: number }[];
}
class StatisticsSection extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log("in statss");
    console.log(this.props.storiesWorkedOn);
  }
  render() {
    console.log("in render of stats");
    console.log(this.props.storiesWorkedOn);
    return (
      <>
        <div className="StatisticsSection-container">
          <div className="BasicStats-container">
            <h2>Stories Published: {this.props.storiesWorkedOn.length}</h2>
            <h2>Words Typed: {this.props.wordsTyped}</h2>
          </div>
          <div className="Keywords-container">
            {this.props.wordFrequencies.map((pair) => (
              <Keyword word={pair.word} />
            ))}
          </div>
          <Link activeClass="active" to="profilegallery" spy={true} smooth={true} duration={1500}>
            <div className="ProfileArrow">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </Link>
          <div className="StatisticsSection-container" id="profilegallery">
            <ProfileGallery
              storiesWorkedOn={this.props.storiesWorkedOn}
              userId={this.props.userId}
            />
          </div>
        </div>
      </>
    );
  }
}

export default StatisticsSection;
