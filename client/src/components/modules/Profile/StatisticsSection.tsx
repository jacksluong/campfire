import React, { Component } from "react";
import Keyword from "./Keyword";
import { Link, animateScroll as scroll } from "react-scroll";
import ProfileGallery from "./ProfileGallery";
import AOS from "aos";
import "aos/dist/aos.css";

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
    const script = document.createElement("script");
    script.src = "https://unpkg.com/aos@next/dist/aos.css";
    script.innerHTML = AOS.init({
      offset: 200,
      duration: 500,
    });
    script.async = true;
    document.body.appendChild(script);
  }
  render() {
    console.log("in render of stats");
    console.log(this.props.storiesWorkedOn);
    return (
      <div className="StatisticsSection container" data-aos="fade-left">
        <div className="BasicStats container">
          <h2>Stories Published: {this.props.storiesWorkedOn.length}</h2>
          <h2>Words Typed: {this.props.wordsTyped}</h2>
        </div>
        <div className="Keyword container">
          <h1>Keywords:</h1>
          {this.props.wordFrequencies.map((pair) => (
            <Keyword word={pair.word} />
          ))}
        </div>

        <div className="Stories container" id="profilegallery">
          <ProfileGallery userId={this.props.userId} />
        </div>
      </div>
    );
  }
}

export default StatisticsSection;
