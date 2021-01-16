import React, {Component} from "react"
import StastiticsSection from "../modules/ProfilePage/StatisticsSection";
import ProfileSection from "../modules/ProfilePage/ProfileSection";
import { RouteComponentProps } from "@reach/router";
type State = {

}

class ProfilePage extends Component<RouteComponentProps, State> {
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className="ProfilePage-container">
                <ProfileSection/>
                <StastiticsSection/>
            </div>
        );
    }
}
export default ProfilePage;