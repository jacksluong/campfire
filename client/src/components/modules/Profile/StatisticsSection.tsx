import React, { Component } from "react";
import Keyword from "./Keyword";
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

  render() {
    return (
      <div className="StatisticsSection container">
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
