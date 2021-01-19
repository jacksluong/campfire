import React, { Component } from "react";
import { socket } from "../../../client-socket";
import { post } from "../../../utilities";
import "./BottomPanel.scss";
import Player from "../../../../../shared/Player";
import Story from "../../../../../shared/Story";

interface Props {
  name: string;
  contributors: Player[];
  content: string;
  usersThatLiked: string[];
  keywords: string[];
  enabled: boolean;
}
class BottomPanel extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  handlePublish = () => {
    const newStory = {
      name: this.props.name,
      contributorNames: this.props.contributors.map((player) => player.name),
      contributorsIds: this.props.contributors.map((player) => player.userId),
      content: this.props.content,
      usersThatLiked: this.props.usersThatLiked,
      keywords: this.props.keywords,
    };
    post("/api/publishStory", newStory).then((story) => {
      console.log("Story saved in database");
      alert("Story saved successfully!");
    });
  };

  render() {
    return (
      <div className="BottomPanel-container">
        <button
          className="BottomPannel-button"
          type="submit"
          onClick={this.handlePublish}
          disabled={!this.props.enabled}
        >
          Publish
        </button>
      </div>
    );
  }
}

export default BottomPanel;
