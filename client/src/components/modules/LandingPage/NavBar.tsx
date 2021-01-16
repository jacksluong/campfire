import React,{Component} from "react"
import "./LandingPage.css"
import { RouteComponentProps, Link } from "@reach/router";
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
  GoogleLogout,
} from "react-google-login";
const GOOGLE_CLIENT_ID = "764920232948-so38c4gjndve7ragljpbecqtchmojc2a.apps.googleusercontent.com";

type Props = {
    userId: String;
    handleLogin: (res: GoogleLoginResponse | GoogleLoginResponseOffline) => void;
    handleLogout: () => void;
  };
  
  type State = {
    loggedIn: boolean;
  };

class NavBar extends Component<Props & RouteComponentProps, State>{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className = "NavBar-container">
                <span className="NavBar-link">{this.props.userId ? (
                    <GoogleLogout
                        clientId={GOOGLE_CLIENT_ID}
                        buttonText="Logout"
                        onLogoutSuccess={this.props.handleLogout}
                        onFailure={() => console.log(`Failed to logout.`)}
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
                <span className="NavBar-link">Explore</span>
            </div>
        );
    }

}
export default NavBar