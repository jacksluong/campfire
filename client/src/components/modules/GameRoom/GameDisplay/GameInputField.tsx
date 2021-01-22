import React, { Component } from "react";
import { post } from "../../../../utilities";
import "./GameInputField.css";
import { socket } from "../../../../client-socket";
import { navigate } from "@reach/router";

interface Props {
  resetTimeout: () => void;
  gameId: string;
  userId: string;
  started: boolean;
  enabled: boolean;
}
interface State {
  ready: boolean;
  value: string;
  endGameRequester: string;
  voted: boolean;
}

class GameInputField extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      value: "",
      endGameRequester: "",
      voted: false,
    };
  }

  componentDidMount() {
    socket.on("endGamePrompt", (response) =>
      this.setState({ endGameRequester: response, voted: false })
    );

    socket.on("endGameRequestCancel", () => {
      console.log("endGameRequestCancel message received.");
      this.setState({ value: "", endGameRequester: "" });
    });
  }

  handleReady = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const prevReady = this.state.ready;
    post("/api/voteReady", { gameId: this.props.gameId, socketId: socket.id }).then(() => {
      this.props.resetTimeout();
      this.setState({ ready: !prevReady });
    });
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
    if (this.state.endGameRequester.length === 0) {
      post("/api/inputChange", { gameId: this.props.gameId, content: event.target.value });
    }
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.endGameRequester.length > 0) {
      // someone requested to end game
      post("/api/voteEndGame", {
        gameId: this.props.gameId,
        socketId: socket.id,
        response: this.state.value.toLowerCase(),
      }).then(() => {
        this.setState({ voted: true });
      });
    } else {
      if (this.state.value.toLowerCase() === "end") {
        post("/api/endGameRequest", { socketId: socket.id, gameId: this.props.gameId }).then(() =>
          this.setState({ value: "" })
        );
      } else {
        post("/api/inputSubmit", {
          content: this.state.value,
          gameId: this.props.gameId,
        }).then(() => this.setState({ value: "" }));
      }
    }
  };

  render() {
    let placeholder: string;
    let enabled = this.props.enabled;
    console.log("enabled and endGameRequester is ", enabled, this.state.endGameRequester);
    if (this.state.endGameRequester.length > 0) {
      console.log("thinks request is still active")
      placeholder = enabled
        ? ""
        : `${this.state.endGameRequester} requested to end the story here. If you agree, type "y" and press enter.`; // TODO: update handleSubmit with this
      enabled = !enabled && !this.state.voted; // person's turn cannot respond to prompt, everyone else can
    } else {
      console.log("knows request is not active");
      placeholder = enabled ? "Craft your sentence here" : "It's someone else's turn right now!";
    }
    let display = !this.props.started ? (
      <button
        className={"GameInputField primary ready" + (this.state.ready ? " clicked" : "")}
        onClick={this.handleReady}
      >
        READY
      </button>
    ) : (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          maxLength={100}
          placeholder={placeholder}
          value={this.state.value}
          onChange={this.handleChange}
          className="GameInputField primary input"
          disabled={!enabled}
        />
      </form>
    );
    return display;
  }
}

export default GameInputField;
