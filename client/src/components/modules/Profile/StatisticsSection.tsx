import React, { Component } from "react";
import "./Profile.css";
import Keyword from "./Keyword";
import { Link, animateScroll as scroll } from "react-scroll";

interface Props {
  wordsTyped: number;
  storiesWorkedOn: string[];
  wordFrequencies: { word: string; frequency: number }[];
}
class StatisticsSection extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="StatisticsSection-container">
        <div className="BasicStats-container">
          <h2>Stories Published: 1500</h2>
          <h2>Words Typed: {this.props.wordsTyped}</h2>
        </div>
        <div className="Keywords-container">
          {this.props.wordFrequencies.map((pair) => (
            <Keyword word={pair.word} />
          ))}
        </div>
        <Link activeClass="active" to="gallery" spy={true} smooth={true} duration={1500}>
          <div className="ProfileArrow">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </Link>
      </div>
    );
  }
}

export default StatisticsSection;
