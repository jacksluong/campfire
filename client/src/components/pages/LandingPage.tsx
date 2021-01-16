import { RouteComponentProps } from "@reach/router";
import { DefaultTransporter } from "google-auth-library";
import React, { Component } from "react";
import { Link } from "@reach/router";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";

import "../../utilities.ts"
import MainPage from "../modules/LandingPage/MainPage"
import NavBar from "../modules/LandingPage/NavBar"

const GOOGLE_CLIENT_ID = "764920232948-so38c4gjndve7ragljpbecqtchmojc2a.apps.googleusercontent.com";

type Props = {
  userId: String;
  handleLogin: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
  handleLogout: () => void;
};

type State = {
  loggedIn: boolean;
};

class LandingPage extends Component<Props & RouteComponentProps, State>{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <NavBar
                    handleLogin={this.props.handleLogin}
                    handleLogout={this.props.handleLogout}
                    userId={this.props.userId}
                />
                <MainPage/>
            </div>
        );
    }

}
export default LandingPage;