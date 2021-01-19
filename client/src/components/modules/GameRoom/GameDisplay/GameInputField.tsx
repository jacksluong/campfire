import React, { Component } from "react";
import { post } from "../../../../utilities";
import "./GameInputField.scss";
import { socket } from "../../../../client-socket";
import { navigate, Redirect } from "@reach/router";

interface Props {
  gameId: string;
  userId: string;
  enabled: boolean;
}
interface State {
  value: string;
  redirect: string;
}

class GameInputField extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      redirect: null,
    };
  }

  componentDidMount() {
    socket.on("gameOver", (gameId: string) => {
      navigate(`/end/${gameId}`);
    });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    let body = {
      contributor: this.props.userId,
      content: this.state.value + " ",
      gameId: this.props.gameId,
    };
    post("/api/inputSubmit", body).then((response) => {
      this.setState({
        value: "",
      });
    });
  };

  handleEndGame = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    console.log("reached endgame funtion");
    socket.emit("endgameRequest", this.props.gameId);
  };

  render() {
    return (
      <div className="GameInputField-container">
        <input
          type="text"
          placeholder="Craft Your Sentence"
          value={this.state.value}
          onChange={this.handleChange}
          className="GameInputField-textbox"
          disabled={!this.props.enabled}
        />

        <button
          type="submit"
          className={"GameInputField-button u-pointer " + (this.props.enabled ? "enabled" : "")}
          value="Submit"
          onClick={this.handleSubmit}
          disabled={!this.props.enabled}
        >
          Submit
        </button>
        <button
          type="submit"
          className="GameInputField-button u-pointer enabled"
          onClick={this.handleEndGame}
        >
          End Game
        </button>
      </div>
    );
  }
}

export default GameInputField;
