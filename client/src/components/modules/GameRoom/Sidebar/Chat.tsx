import React, { Component } from "react";
import ChatInputField from "./ChatInputField";
import Player from "../../../../../../shared/Player";
import "./Chat.scss";

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
        <h2>Chat</h2>
        <ChatInputField />
      </div>
    );
  }
}
export default Chat;
