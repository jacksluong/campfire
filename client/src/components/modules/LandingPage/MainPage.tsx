import React,{Component} from "react"

class MainPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="MainPage Container">
                <div className="Title-container"> Campfire</div>
                <div className="Buttons-container"> 
                    <button
                        type="submit"
                        value="Create Game"
                        className="Button">
                        Quick play
                    </button>
                    <button
                        type="submit"
                        className="Button">
                        Private Game
                    </button>
                </div>
            </div>
        );
    }

}
export default MainPage;