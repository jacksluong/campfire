import React, { Component } from "react";
import "./Profile.css";

interface Props {
  wordsTyped: number;
  storiesWorkedOn: string[];
  // wordFrequencies: Map<string, number>;
}
class StatisticsSection extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="StatisticsSection-container">stats</div>;
  }
}
export default StatisticsSection;
