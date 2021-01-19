import { RouteComponentProps } from "@reach/router";
import React, { Component } from "react";
import Navigation from "../modules/End/Navigation";
import Passage from "../modules/End/Passage";
import "../modules/End/End.scss";
import BottomPanel from "../modules/End/BottomPanel";

interface Props {}
interface State {}

class End extends Component<Props & RouteComponentProps, State> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="End-container">
        <Navigation />
        <Passage />
        <BottomPanel />
      </div>
    );
  }
}
export default End;
