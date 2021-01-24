import React, { Component } from "react";
import ChatInputField from "./ChatInputField";
import Player from "../../../../../../shared/Player";
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
  chatBottom: HTMLDivElement;

  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    socket.on("newMessage", (message: Message) => {
      this.setState({
        messages: this.state.messages.concat([message]),
      });
      this.chatBottom.scrollIntoView();
    });
  }

  render() {
    return (
      <div className="Chat container">
        <div className="messagesContainer">
          {this.state.messages.map((m, i) => (
            <SingleMessage message={m} key={i} />
          ))}
          <div ref={element => this.chatBottom = element}></div>
        </div>
        <ChatInputField resetTimeout={this.props.resetTimeout} gameId={this.props.gameId} />
      </div>
    );
  }
}
export default Chat;
