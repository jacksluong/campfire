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
    let words =
      this.props.wordFrequencies.length !== 0 ? (
        <div>
          <h1>Keywords:</h1>
          {this.props.wordFrequencies.map((pair) => (
            <Keyword word={pair.word} />
          ))}
        </div>
      ) : (
        <h1>Keywords: No keywords at the moment.</h1>
      );
    return (
      <div className="StatisticsSection container">
        <div className="BasicStats container">
          <h2>Stories Published: {this.props.storiesWorkedOn.length}</h2>
          <h2>Words Typed: {this.props.wordsTyped}</h2>
        </div>
        <div className="Keyword container">{words}</div>

        <div className="Stories container" id="profilegallery">
          <ProfileGallery userId={this.props.userId} />
        </div>
      </div>
    );
  }
}

export default StatisticsSection;
