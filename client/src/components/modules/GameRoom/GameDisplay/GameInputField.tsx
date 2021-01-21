import React, { Component } from "react";
import { post } from "../../../../utilities";
import "./GameInputField.scss";
import { socket } from "../../../../client-socket";
import { navigate } from "@reach/router";

interface Props {
  gameId: string;
  userId: string;
  enabled: boolean;
}
interface State {
  value: string;
  redirect: string;
  endGameButtonShow: boolean;
  requestedToEndGame: boolean;
}

class GameInputField extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      redirect: null,
      endGameButtonShow: false,
      requestedToEndGame: false,
    };
  }

  componentDidMount() {
    socket.on("gameOver", (gameId: string) => {
      navigate(`/end/${gameId}`);
    });

    socket.on("endGamePrompt", (userId: string) => {
      if (!this.state.requestedToEndGame) {
        this.setState({
          endGameButtonShow: true,
        });
      }
    });

    socket.on("takeBackEndGameButton", () => {
      this.setState({
        endGameButtonShow: false,
      });
    });
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
    });
    post("/api/inputChange", { content: event.target.value });
    console.log(this.state.value);
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let body = {
      contributor: this.props.userId,
      content: this.state.value,
      gameId: this.props.gameId,
    };
    if (this.state.value.toLowerCase() === "end") {
      this.setState({
        value: "",
        requestedToEndGame: true,
      });
      post("/api/endGameRequest", body).then();
    } else {
      post("/api/inputSubmit", body).then((response) => {
        this.setState({
          value: "",
        });
      });
    }
  };

  handleEndGame = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    socket.emit("endGameConfirm", this.props.gameId);
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            maxLength={100}
            placeholder="Craft Your Sentence"
            value={this.state.value}
            onChange={this.handleChange}
            className="GameInputField-textbox"
            disabled={!this.props.enabled}
          />
        </form>

        {this.state.endGameButtonShow ? (
          <button
            type="submit"
            className="GameInputField-button u-pointer enabled"
            onClick={this.handleEndGame}
            // disabled={this.state.endGameDisabled}
          >
            End Game
          </button>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default GameInputField;
