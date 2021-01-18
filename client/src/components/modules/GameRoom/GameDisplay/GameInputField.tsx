import React, { Component } from "react";
import { post } from "../../../../utilities";
import "./GameInputField.scss";
import { socket } from "../../../../client-socket";
import { Redirect } from "@reach/router";

interface Props {
  gameId: string;
  userId: string;
  disabled: boolean;
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

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
    });
  };

  handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    let body = {
      contributor: this.props.userId,
      content: this.state.value,
      gameId: this.props.gameId,
    };
    post("/api/inputSubmit", body).then((response) => {
      null;
    });
    //Reset the value
    this.setState({
      value: "",
    });
  };

  handleEndGame = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    console.log("reached endgame funtion");
    socket.emit("endgameRequest", this.props.gameId);
    socket.on("gameOver", (gameId: string) => {
      this.setState({
        redirect: `/end/${gameId}`,
      });
    });
  };

  render() {
    if (this.state.redirect) {
      console.log();
      return <Redirect to={this.state.redirect} />;
    } else {
      return (
        <div className="GameInputField-container">
          <input
            type="text"
            placeholder="Craft Your Sentence"
            value={this.state.value}
            onChange={this.handleChange}
            className="GameInputField-textbox"
            // disabled={this.props.disabled}
          />
          <button
            type="submit"
            className="GameInputField-button u-pointer"
            value="Submit"
            onClick={this.handleSubmit}
            // disabled={this.props.disabled}
          >
            Submit
          </button>
          <button
            type="submit"
            className="GameInputField-button u-pointer"
            onClick={this.handleEndGame}
          >
            End Game
          </button>
        </div>
      );
    }
  }
}

export default GameInputField;
