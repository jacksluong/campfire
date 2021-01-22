import React, { Component } from "react";
import "./ChatInputField.scss";
import { get, post } from "../../../../../src/utilities";
import { socket } from "../../../../client-socket";

interface Props {
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
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const body = { gameId: this.props.gameId, socketId: socket.id, content: this.state.value };
    post("/api/message", body);
    this.setState({
      value: "",
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          maxLength={100}
          placeholder="Enter Chat Message"
          value={this.state.value}
          onChange={this.handleChange}
          className="ChatInputField-textbox"
        />
      </form>
    );
  }
}

export default ChatInputField;
