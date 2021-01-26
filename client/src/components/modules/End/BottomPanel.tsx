import React, { Component } from "react";
import { socket } from "../../../client-socket";
import { post } from "../../../utilities";

interface Props {
  gameId: string;
}

interface State {
  enabled: boolean;
  published: boolean;
}
class BottomPanel extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = { enabled: true, published: false };
  }

  componentDidMount() {
    socket.on("storyPublished", () => this.setState({ published: true }));
  }

  handlePublish = () => {
    console.log("gameId", this.props.gameId);
    post("/api/votePublish", { gameId: this.props.gameId, socketId: socket.id });
    this.setState({ enabled: false });
  };

  render() {
    return (
      <div className="BottomPanel-container">
        {this.state.published ? (
          ""
        ) : (
          <button
            className="BottomPannel-button"
            type="submit"
            onClick={this.handlePublish}
            disabled={!this.state.enabled}
          >
            Publish
          </button>
        )}
      </div>
    );
  }
}

export default BottomPanel;
