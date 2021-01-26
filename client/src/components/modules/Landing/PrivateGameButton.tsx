import { navigate } from "@reach/router";
import React, { Component } from "react";
import { get } from "../../../utilities";

interface Props {
  userId: string;
  createPrivateGame: () => void;
}

interface State {
  clicked: boolean;
  codeInput: string;
}

class PrivateGameButton extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      codeInput: ""
    };
  }

  firstClick = (): void => {
    const createButton = document.getElementById("createButton");
    createButton.innerHTML = "CREATE GAME";
    createButton.onclick = this.props.createPrivateGame;

    this.setState({clicked: true});
  }

  createPrivateGame = (): void => {
    get("/api/createPrivate").then(response => {
      console.log("matched me to", response.gameId);
      navigate(`/gameroom/${response.gameId}`);
    });
  }

  handleInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
    this.setState({ codeInput: event.currentTarget.value });
  }

  handleSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key == 'Enter' && this.state.codeInput.length !== 0) navigate(`/gameroom/${this.state.codeInput}`);
  }

  render() {
    let secondButton = !this.state.clicked ? "" :
      (<>
        <div style={{ textAlign: "center", margin: "5px 0px" }}>or</div>
        <input 
          type="text" 
          id="codeButton" 
          className="gameButton input" 
          maxLength={7}
          placeholder="Enter code"
          onInput={this.handleInput}
          onKeyPress={this.handleSubmit} 
        />
      </>)
    return (
      <div className="PrivateGameButton container">
        <button id="createButton" onClick={this.firstClick} className="gameButton">
          PRIVATE GAME
        </button>
        {secondButton}
      </div>
    );
  }
}

export default PrivateGameButton;
