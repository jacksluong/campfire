import React, {Component} from "react"
import "./ProfilePage.css"
import blankpfp from "../../../assets/blankpfp.png"
class ProfileSection extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="ProfileSection-container">
                profile
                <img src={blankpfp}/>
            </div>
        );
    }
}
export default ProfileSection;