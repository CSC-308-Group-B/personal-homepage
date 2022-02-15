import React from 'react';
import logo from './logo.svg';
import UserPage from './components/UserPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/App.scss';
import axios from 'axios';
import './draggable.js'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: 0,
        };
    }

    //Runs immediately as the page begins rendering
    componentDidMount() {
        //if getUser returns a user, set the state
        this.getUser().then(result => {
            if (result)
                this.updateUser(result);
        });
    }
    //returns a user object
    //The "withCredentials" field set to true tells axios to send cookies along with the get request
    //This sends the session id cookie, and the backend will parse that to authenticate the user, if everything checks out
    //Upon successful authentication, the backend will return a user, and the frontend will re-render
    //This "withCredentials: true" will need to be added to any REST api calls that need authentication (so most if not all of them)
    getUser = async () => {
        const result = await axios.get('http://localhost:5001/getUser', { withCredentials: true });
        return result.data;
    }
    //updates the user object; re-renders the page
    updateUser = (updatedUser) => {
        this.setState({ user: updatedUser });
    }

    addTile = async () => {
        const newTile = {
            tileType: "BRUHHHHH",
            width: 2,
            posx: 0,
            posy: 0
        }
        const response = await axios.post(`http://localhost:5001/u/${this.state.user._id}/tiles`, newTile);
        if (response) {
            if (this.state.user.tiles) {
                newTile._id = response.data.tiles[response.data.tiles.length - 1]._id;
                this.state.user.tiles.push(newTile);
            }
            this.updateUser(this.state.user);
        } else {
            console.log("Failed to add tile.");
        }
    }

    render() {
        return (
            <div className="App" style={{ minHeight: "100vh", width: "auto"}}>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <UserPage user={this.state.user} updateUser={this.updateUser} addTile={this.addTile} />
            </div>
        );
    }
}

export default App;