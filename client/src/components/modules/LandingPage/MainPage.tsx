import React,{Component} from "react"
import { RouteComponentProps, Link, Redirect } from "@reach/router";
import { socket } from "../../../client-socket";

import { get } from "../../../utilities";

interface Props { }
interface State {
    redirect: string
}

class MainPage extends Component<Props, State> {
    constructor(props){
        super(props);
        this.state = {
            redirect: null
        }
    }
    handleQuickPlayClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log("abc");
        get("/api/whoami").then((user) => {
            if (!user) return;
            socket.on("matched", (gameId: string) => {
                console.log("gameId received is", gameId);
                this.setState({ redirect: `/gameroom/${gameId}`});
                console.log("redirect to", this.state.redirect);
            });
            socket.emit("matchmaking", user._id);
        });
    }
    handlePrivateGameClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        alert("click");
    }

    handleQuestionClick = (event: React.MouseEvent<HTMLButtonElement,MouseEvent>) => {

    }
    
    

    render() {
        if (this.state.redirect) {
            console.log("redirected to", this.state.redirect);
            return <Redirect to={this.state.redirect} />
        }
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
                    <Link to="/">
                        <button
                            type="submit"
                            className="Button"
                            onClick={this.handlePrivateGameClick}>
                            Private Game
                        </button>
                    </Link>
                </div>
                <div className="Help-container" >

                    <button className="u-small-radius" onClick={this.handleQuestionClick}>
                        ?
                    </button>
                </div>
                
            </div>
        );
    }

}
export default MainPage;