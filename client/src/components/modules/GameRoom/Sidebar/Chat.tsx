import React, { Component } from "react";
import ChatInputField from "./ChatInputField";
import Player from "../../../../../../shared/Player";
import "./Chat.scss";
import { get, post } from "../../../../../src/utilities";
import { GameState } from "../../../../../../server/logic";
import SingleMessage from "./SingleMessage";

import Message from "../../../../../../shared/Message";
import { socket } from "../../../../client-socket";
interface Props {
  resetTimeout: () => void;
  gameId: string;
  players: Player[];
  spectators: string[];
}

interface State {
  messages: Message[];
}
class Chat extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    get("/api/chat", { gameId: this.props.gameId }).then((data) => {
      this.setState({
        messages: data.messages,
      });
    });

    socket.on("newMessage", (message: Message) => {
      this.setState({
        messages: this.state.messages.concat([message]),
      });
    });
  }

  render() {
    return (
      <div className="Chat-container">
        <h2>Chat</h2>
        <div className="Chat-historyContainer">
          {this.state.messages.map((m, i) => (
            <SingleMessage message={m} key={i} />
          ))}
        </div>
        <ChatInputField resetTimeout={this.props.resetTimeout} gameId={this.props.gameId} />
      </div>
    );
  }
}
export default Chat;
