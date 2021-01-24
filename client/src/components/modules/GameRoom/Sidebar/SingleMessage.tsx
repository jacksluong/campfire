import React, { Component } from "react";

import Message from "../../../../../../shared/Message";

interface Props {
  message: Message;
}
class SingleMessage extends Component<Props, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={"SingleMessage container"}>
        <span className="sender">{this.props.message.sender + ": "}</span>
        <span className="content">{this.props.message.content}</span>
      </div>
    );
  }
}

export default SingleMessage;
