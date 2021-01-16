import React, { Component } from "react";
import ChatInputField from "./ChatInputField";
import Player from "../../../../../../shared/Player";

interface Props {
  players: Player[];
}
class Chat extends Component<Props, {}> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Chat-container">
        This is the Chat.
        <ChatInputField />
      </div>
    );
  }
}
export default Chat;
