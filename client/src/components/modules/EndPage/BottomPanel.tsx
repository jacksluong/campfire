import React, { Component } from "react";
import { socket } from "../../../client-socket";
import { post } from "../../../utilities";
import "./BottomPanel.scss";

class BottomPanel extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    socket.on("publishStory", (story) => {
      console.log(`"Reached publishStory API endpoint: ${story.name}`);
    });
  }

  handlePublish = () => {
    const body = {
      _id: "Story ID",
      name: "Story Name",
      contributors: "Contributors",
      content: "Story Content",
      usersThatLiked: "Liked Users",
      keywords: "Story Keywords",
    };
    post("/api/publishStory", body);
  };

  render() {
    return (
      <div className="BottomPanel-container">
        <button className="BottomPannel-button" type="submit" onClick={this.handlePublish}>
          Publish
        </button>
      </div>
    );
  }
}

export default BottomPanel;
