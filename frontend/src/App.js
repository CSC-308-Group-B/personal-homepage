import React from "react";
import UserPage from "./components/UserPage";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styling/App.scss";
import axios from "axios";
import "./draggable.js";
import Background from "./components/Background";

export const backendURL = process.env.REACT_APP_BE_URL;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.backgroundColorThrottler = null;
        this.backgroundColorDebouncer = null;
        this.state = {
            user: undefined,
            color: "",
            backgroundImage: "",
        };
    }

    //updates the user object; re-renders the page
    updateUser = (updatedUser) => {
        this.setState({
            user: updatedUser,
            color: this.state.color || updatedUser.backgroundColor,
            backgroundImage:
                this.state.backgroundImage || updatedUser.backgroundImage,
        });
    };

    //Runs immediately as the page begins rendering
    componentDidMount() {
        //if getUser returns a user, set the state
        this.getUser().then((result) => {
            if (result) this.updateUser(result);
        });
    }
    //returns a user object
    //The "withCredentials" field set to true tells axios to send cookies along with the get request
    //This sends the session id cookie, and the backend will parse that to authenticate the user, if everything checks out
    //Upon successful authentication, the backend will return a user, and the frontend will re-render
    //This "withCredentials: true" will need to be added to any REST api calls that need authentication (so most if not all of them)
    getUser = async () => {
        const result = await axios.get(`${backendURL}/getUser`, {
            withCredentials: true,
        });
        return result.data;
    };

    updateBackgroundColor = async (color) => {
        //Frontend throttling
        if (!this.backgroundColorThrottler) {
            this.backgroundColorThrottler = setTimeout(() => {
                this.backgroundColorThrottler = null;
                this.setState({ color: color });
            }, 50);
        }
        //Backend debouncing
        if (this.backgroundColorDebouncer) {
            clearTimeout(this.backgroundColorDebouncer);
        }
        this.backgroundColorDebouncer = setTimeout(async () => {
            const response = await axios.post(
                `${backendURL}/setBackgroundColor`,
                { color: this.state.color },
                { withCredentials: true }
            );
            if (response.status == 200) this.setState({ color: color });
        }, 250);
    };

    updateBackgroundImage = async (image) => {
        const response = await axios.post(
            `${backendURL}/setBackgroundImage`,
            { backgroundImage: image },
            { withCredentials: true }
        );

        if (response) {
            this.setState({ backgroundImage: image });
        }
    };

    addTile = async (tileType = "DefaultTile", defaultFields = {}) => {
        //create base tile object
        const newTile = {
            tileType: tileType,
            width: 1,
            x: 0,
            y: 0,
            color: { r: 255, g: 255, b: 255, a: 1 },
            ...defaultFields,
        };
        //Try adding tile to backend
        const response = await axios.post(
            `${backendURL}/u/${this.state.user._id}/tiles`,
            newTile,
            { withCredentials: true }
        );
        if (response) {
            //if we get a successful response, add it to the frontend
            if (this.state.user.tiles) {
                newTile._id =
                    response.data.tiles[response.data.tiles.length - 1]._id;
                this.state.user.tiles.push(newTile);
            }
            this.updateUser(this.state.user);
        } else {
            console.log("Failed to add tile.");
        }
    };

    render() {
        return (
            <div className="App">
                
                <UserPage
                    user={this.state.user}
                    color={this.state.color}
                    backgroundImage={this.state.backgroundImage}
                    updateUser={this.updateUser}
                    addTile={this.addTile}
                    updateColor={this.updateBackgroundColor}
                    updateBackgroundImage={this.updateBackgroundImage}
                />
                <Background
                    color={this.state.color}
                    backgroundImage={this.state.backgroundImage}
                />
            </div>
        );
    }
}

export default App;
