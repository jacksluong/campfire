import React,{Component} from "react"

class MainPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="MainPage Container">
                <div className="Title-container"> Title</div>
                <div className="Buttons-container"> Buttons Container</div>
            </div>
        );
    }

}
export default MainPage;