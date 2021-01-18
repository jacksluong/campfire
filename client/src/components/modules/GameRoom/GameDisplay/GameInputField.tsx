import React, { Component } from "react";
import { post } from "../../../../utilities";
import "./GameInputField.scss";

interface Props {
  gameId: string;
  userId: string;
}
interface State {
  value: string;
}

class GameInputField extends Component<Props, State> {
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

  render() {
    return (
      <div className="GameInputField-container">
        <input
          type="text"
          placeholder="Craft Your Sentence"
          value={this.state.value}
          onChange={this.handleChange}
          className="GameInputField-textbox"
        />
        <button
          type="submit"
          className="GameInputField-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default GameInputField;
