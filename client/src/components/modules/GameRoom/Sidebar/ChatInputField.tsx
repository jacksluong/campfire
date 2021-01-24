import React, { Component } from "react";
import { get, post } from "../../../../../src/utilities";
import { socket } from "../../../../client-socket";

interface Props {
  resetTimeout: () => void;
  gameId: string;
}

interface State {
  value: string;
}
class ChatInputField extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
    });
    this.props.resetTimeout();
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == 'Enter' && this.state.value.length > 0) {
      const body = { 
        gameId: this.props.gameId, 
        socketId: socket.id, 
        content: this.state.value 
      };
      post("/api/message", body);
      this.setState({
        value: "",
      });
      this.props.resetTimeout();
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <input
        type="text"
        maxLength={100}
        placeholder="Enter Chat Message"
        value={this.state.value}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        className="ChatInputField"
      />
    );
  }
}

export default ChatInputField;
