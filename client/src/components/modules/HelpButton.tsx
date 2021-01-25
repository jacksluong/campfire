import React, { Component } from "react";

interface Props {};

type State = {
  loggedIn: boolean;
};

class HelpButton extends Component<Props, State> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="HelpButton container">
      
      </div>
    );
  }
}

export default HelpButton;
