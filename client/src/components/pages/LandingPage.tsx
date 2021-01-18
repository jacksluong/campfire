import { RouteComponentProps } from "@reach/router";
import { DefaultTransporter } from "google-auth-library";
import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";

import MainPage from "../modules/LandingPage/MainPage";
import NavBar from "../modules/LandingPage/NavBar";
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

class LandingPage extends Component<Props & RouteComponentProps, State> {
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
        <MainPage userId={this.props.userId} />
      </div>
    );
  }
}
export default LandingPage;
