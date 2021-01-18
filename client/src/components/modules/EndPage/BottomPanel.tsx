import React, { Component } from "react";
import "./BottomPanel.scss";

class BottomPanel extends Component<{}, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <div className="BottomPanel-container">
        <button className="BottomPannel-button" type="submit">
          Publish
        </button>
      </div>
    );
  }
}

export default BottomPanel;
