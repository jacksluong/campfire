import React,{Component} from "react"
import "./LandingPage.css"

class NavBar extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className = "NavBar-container">
                <span className="NavBar-link">Login</span>
                <span className="NavBar-link">Explore</span>
            </div>
        );
    }

}
export default NavBar