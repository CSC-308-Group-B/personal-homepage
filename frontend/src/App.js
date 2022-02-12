import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import UserPage from './components/UserPage'
import SignIn from './components/SignIn'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/App.scss';
import axios from 'axios';

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
    getUser = async () => {
        const result = await axios.get('http://localhost:5000/getUser', { withCredentials: true });
        return result.data;
    }
    //updates the user object; re-renders the page
    updateUser = (updatedUser) => {
        this.setState({ user: updatedUser });
    }

    addTile = async () => {
        const newTile = {
            tileType: "TileTypeGoesHere",
            width: 2
        }
        const response = await axios.post(`http://localhost:5000/u/${this.state.user._id}/tiles`, newTile);
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
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <div>
                    <UserPage user={this.state.user} updateUser={this.updateUser} addTile={this.addTile} />
                </div>
            </div>
        );
    }
}

export default App;