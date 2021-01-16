import React,{Component} from "react"

class MainPage extends Component{
    constructor(props){
        super(props);
    }
    handleQuickPlayClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        alert("click")
    }
    handlePrivateGameClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    }

    handleQuestionClick = (event: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {

    }
    
    

    render(){
        return(
            <div className="MainPage Container">
                <div className="Title-container"> Campfire</div>
                <div className="Buttons-container"> 
                    <button
                        type="submit"
                        value="Create Game"
                        className="Button"
                        onClick={this.handleQuickPlayClick}>
                        Quick play
                    </button>
                    <button
                        type="submit"
                        className="Button"
                        onClick={this.handlePrivateGameClick}>
                        Private Game
                    </button>
                </div>
                <div className = "Help-container" >

                    <button className="u-small-radius" onClick={this.handleQuestionClick}>
                        ?
                    </button>
                </div>
                
            </div>
        );
    }

}
export default MainPage;