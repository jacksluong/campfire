import { RouteComponentProps } from "@reach/router";
import { DefaultTransporter } from "google-auth-library";
import React, { Component } from "react";
import "../../utilities.ts"
import MainPage from "../modules/LandingPage/MainPage"
import NavBar from "../modules/LandingPage/NavBar"

class LandingPage extends Component<RouteComponentProps>{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <NavBar/>
                <MainPage/>
            </div>
        );
    }

}
export default LandingPage;