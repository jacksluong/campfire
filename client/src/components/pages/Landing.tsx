import { RouteComponentProps } from "@reach/router";
import { DefaultTransporter } from "google-auth-library";
import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";

import Main from "../modules/Landing/Main";
import NavBar from "../modules/Landing/NavBar";
import Story from "../../../../shared/Story";
import { get } from "../../utilities";

type Props = {
  userId: string;
  handleLogin: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  handleLogout: () => void;
};

type State = {
  loggedIn: boolean;
  stories: Story[];
};

class Landing extends Component<Props & RouteComponentProps, State> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    get("/api/stories").then((stories) => {
      this.setState({
        stories: stories,
      });
    });
  }

  render() {
    return (
      <div>
        <NavBar
          handleLogin={this.props.handleLogin}
          handleLogout={this.props.handleLogout}
          userId={this.props.userId}
        />
        <Main userId={this.props.userId} />
      </div>
    );
  }
}
export default Landing;
