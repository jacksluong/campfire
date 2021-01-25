import React, { Component } from "react";
import "./Landing.css";
import { RouteComponentProps, Link } from "@reach/router";
import GoogleLogin from "react-google-login";
import ProfileButton from "./ProfileButton";
const GOOGLE_CLIENT_ID = "764920232948-so38c4gjndve7ragljpbecqtchmojc2a.apps.googleusercontent.com";

type Props = {
  userId: string;
  pfp: string;
  handleLogin: any;
  handleLogout: any;
  leftButtonText: string;
  leftButtonPath: string;
};

type State = {
  loggedIn: boolean;
};

class NavBar extends Component<Props & RouteComponentProps, State> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="NavBar container">
      <Link to={this.props.leftButtonPath} className="link">
        {this.props.leftButtonText}
      </Link>
        <span className="link">
          {this.props.userId ? (
            <ProfileButton
              userId={this.props.userId}
              pfp={this.props.pfp}
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
      </div>
    );
  }
}
export default NavBar;
