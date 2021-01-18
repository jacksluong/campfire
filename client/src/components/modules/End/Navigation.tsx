import React, { Component } from "react";
import { RouteComponentProps, Link } from "@reach/router";
import Player from "../../../../../shared/Player";
import { get } from "../../../utilities";
import { socket } from "../../../client-socket";
import "./Navigation.scss";

type Props = {};

type State = {
  redirect: string;
};

class Navigation extends Component<Props & RouteComponentProps, State> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="Navigation-container">
        <Link to="/">
          <span className="Navigation-link">Home</span>
        </Link>
        <Link to="/">
          <span className="Navigation-link">Play Again</span>
        </Link>
      </div>
    );
  }
}
export default Navigation;
