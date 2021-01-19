import React, { Component } from "react";
import "./Landing.css";
import { RouteComponentProps, Link } from "@reach/router";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
import ProfileButton from "./ProfileButton";
const GOOGLE_CLIENT_ID = "764920232948-so38c4gjndve7ragljpbecqtchmojc2a.apps.googleusercontent.com";

import { post } from "../../../utilities"; // TODO: remove on production release

type Props = {
  userId: string;
  handleLogin: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  handleLogout: () => void;
};

type State = {
  loggedIn: boolean;
};

class NavBar extends Component<Props & RouteComponentProps, State> {
  constructor(props) {
    super(props);
  }

  resetGame = () => {
    post("/api/rg", {}).then((msg) => console.log("gameState is now ", msg));
  }

  render() {
    return (
      <div className="NavBar-container">
        <span className="NavBar-link">
          {this.props.userId ? (
            <ProfileButton
              userId={this.props.userId}
              imageUrl="check this out https://developers.google.com/identity/sign-in/web/people"
              handleLogout={this.props.handleLogout}
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={this.props.handleLogin}
              onFailure={(err) => console.log(err)}
            />
          )}
        </span>
        <span className="NavBar-link" onClick={this.resetGame}>Explore</span>
      </div>
    );
  }
}
export default NavBar;
