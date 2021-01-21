import { navigate } from "@reach/router";
import React, { Component } from "react";
import { get } from "../../../utilities";

interface Props {
  userId: string;
  createPrivateGame: () => void;
}

interface State {
  clicked: boolean,
  codeInput: string | undefined
}

class PrivateGameButton extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      codeInput: undefined
    };
  }

  firstClick = (): void => {
    const createButton = document.getElementById("createButton");
    createButton.innerHTML = "Create Game";
    createButton.onclick = this.props.createPrivateGame;

    this.setState({clicked: true});
  }

  createPrivateGame = (): void => {
    get("/api/createPrivate").then(response => {
      console.log("matched me to", response.gameId);
      navigate(`/gameroom/${response.gameId}`);
    });
  }

  handleMouseEnter = (event: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
    this.setState({ codeInput: "" });
  }

  handleMouseLeave = (event: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
    if (this.state.codeInput.length === 0) this.setState({ codeInput: undefined });
  }

  handleInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    this.setState({ codeInput: event.currentTarget.value });
  }

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (this.state.codeInput?.length !== 0) navigate(`/gameroom/${this.state.codeInput}`);
  }

  render() {
    let secondButton;
    if (!this.state.clicked) secondButton = "";
    else if (this.state.codeInput !== undefined) {
      secondButton = (
        <>
          <br />
          <form onSubmit={this.handleSubmit}>
            <input type="text" id="codeButton" onInput={this.handleInput} className="Button" onMouseLeave={this.handleMouseLeave} />
          </form>
        </>
      )
    } else {
      secondButton = (
        <>
          <br />
          <button id="codeButton" className="Button" onMouseEnter={this.handleMouseEnter}>
          Enter Code
          </button>
        </>
      )
    }
    return (
      <div className="">
        <button id="createButton" onClick={this.firstClick} className="Button">
          Private Game
        </button>
        {secondButton}
      </div>
    );
  }
}

export default PrivateGameButton;
