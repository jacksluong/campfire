import React, { Component } from "react";
import { post } from "../../../../utilities";
import "./GameInputField.css";
import { socket } from "../../../../client-socket";

interface Props {
  gameId: string;
  userId: string;
  started: boolean;
  enabled: boolean;
}
interface State {
  ready: boolean;
  value: string;
  redirect: string;
  endGameButtonShow: boolean;
  endGameDisabled: boolean;
  requestedToEndGame: boolean;
}

class GameInputField extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      value: "",
      redirect: null,
      endGameButtonShow: false,
      endGameDisabled: false,
      requestedToEndGame: false,
    };
  }

  componentDidMount() {
    socket.on("endGamePrompt", (userId: string) => {
      if (!this.state.requestedToEndGame) {
        this.setState({ endGameButtonShow: true });
      }
    });

    socket.on("takeBackEndGameButton", () => {
      this.setState({
        endGameButtonShow: false,
      });
    });
  }

  handleReady = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const prevReady = this.state.ready;
    this.setState({ ready: !prevReady });
    post("/api/voteReady", { gameId: this.props.gameId, socketId: socket.id }).then(() => this.setState({ ready: !prevReady }));
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      value: event.target.value,
    });
    post("/api/inputChange", { gameId: this.props.gameId, content: event.target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (this.state.value.toLowerCase() === "end") {
      let body = {
        socketId: socket.id,
        gameId: this.props.gameId
      };
      this.setState({
        value: "",
        requestedToEndGame: true,
      });
      post("/api/endGameRequest", body).then();
    } else {
      let body = {
        content: this.state.value,
        gameId: this.props.gameId
      };
      post("/api/inputSubmit", body).then((response) => {
        this.setState({
          value: "",
        });
      });
    }
  };

  handleEndGame = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    post("/api/voteEndGame", { gameId: this.props.gameId, socketId: socket.id }).then(() => {
      this.setState({ endGameDisabled: true });
    })
  };

  render() {
    let primary = !this.props.started ?
      <button className={"GameInputField primary ready" + (this.state.ready ? " clicked" : "")} onClick={this.handleReady}>READY</button> :
      (<>
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
            className="GameInputField-button u-pointer enabled"
            onClick={this.handleEndGame}
            disabled={this.state.endGameDisabled}
          >
            End Game
          </button>
        ) : (
          ""
        )}
      </>);
    return primary;
  }
}

export default GameInputField;
