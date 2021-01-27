import React, { Component } from "react";

type Props = {
  gameId: string;
};

type State = {};

class HelpButton extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  handleSpace = (event: KeyboardEvent) => {
    console.log(event);
    if (event.key == ' ') {
      this.toggleShow();
      window.removeEventListener('keypress', this.handleSpace);
    }
  }

  handleButtonClick = () => {
    this.toggleShow();
    window.addEventListener('keypress', this.handleSpace);
  }

  toggleShow = () => {
    document.getElementById("instructions").classList. toggle("show");
    
  }

  render() {
    let instructions = (
      <div className="instructions">
        {
          this.props.gameId.length === 0 ? (<>
            <h2>Overview</h2>
            <p>Campfire is a game where you and others can make up your own stories together! Unleash your creativity, come up with stories with other people, and <del>&ensp;see&ensp;</del> control where the plot thickens. Everyone takes turns contributing to the overall story and choosing the next person to go. More details into game rules can be found once your in a game room.</p>
            <h2>Game Rooms</h2>
            <p>You can join public games using the <strong>Quick Play</strong> button or create/join your own private games! Games start when enough players are in (3 for public, 2 for private) and everyone is ready. You can also spectate games by joining games (via link) after they start! (Note: if you are idle for 60 seconds in a public game when the game has not started yet, you will be kicked.)</p>
            <h2>Sign in!</h2>
            <p>You can join games as a guest, but signing in with Google will allow you (and others) to see the words you type most often and what stories you've contributed to as well as give other stories likes!</p>
            <h2>Gallery</h2>
            <p>When a game is finished, all players can choose to vote whether or not the story is published publicly. Hit the <strong>Explore</strong> button to check out stories other people have made!</p>
          </>) : (<>
            <h2>Inviting Others</h2>
            <p>The game code for this room is <strong><em>{this.props.gameId}</em></strong> — they can enter this room by entering the code in the landing page.</p>
            <h2>Instructions</h2>
            <p>When it's your turn, type into the input field on the bottom and press enter to submit your contribution <em>(max 100 characters)</em> for your turn. You can <strong>tag</strong> the next person to go by clicking on their character in the visual!</p>
            <h2>Start/End</h2>
            <p>The game starts when everyone in the room is ready (minimum 3 for public games, 2 for private games). The game ends when everyone runs out of health or on agreement (you can request to end the story on your turn by typing "end" into the input).</p>
            <h2>Health</h2>
            <p>Everyone has some total number of seconds to spend typing/contributing (full health). Whenever it's your turn, your health will decrease. When you are out of health, you cannot continue to contribute to the story, but you can still participate in the chat and vote on matters!</p>
          </>)
        }
      </div>
    );
    return <div className={"HelpButton container" + (this.props.gameId.length > 0 ? " position2" : "")}>
      <button onClick={this.handleButtonClick}>?</button>
      <div className="tint" id="instructions">
        {instructions}
        <div className="closeText">(Press space to close.)</div>
      </div>
    </div>;
  }
}

export default HelpButton;
