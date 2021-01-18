import { RouteComponentProps } from "@reach/router";
import React, { Component } from "react";
import Navigation from "../modules/EndPage/Navigation";
import Passage from "../modules/Endpage/Passage";
import "../modules/EndPage/Endpage.scss";
import BottomPanel from "../modules/Endpage/BottomPanel";

interface Props {}
interface State {}

class Endpage extends Component<Props & RouteComponentProps, State> {
  constructor(props) {
    super(props);
  }
  render() {
    let loremIpsum =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
    return (
      <div className="EndPage-container">
        <Navigation />
        <Passage story={loremIpsum} />
        <BottomPanel />
      </div>
    );
  }
}
export default Endpage;
