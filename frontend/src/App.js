import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import UserPage from './components/UserPage'
import SignIn from './components/SignIn'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/App.scss';
import './draggable.js'
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
        //Now that a basic user auth is up and running, we will sign in every time
        //We will work on a "remember me" function here, later
        //return {
        //    _id: "620058e9e8467fb0832830c5", name: "Test User", "tiles": [{
        //        "tileType": "TileTypeGoesHere", "width": 2, posx: "100", posy: "0"}]
        //}

         try {
             //right now we'll just be using our "Test User" (until we get user auth up and running)
             const response = await axios.get('http://localhost:5000/u/620058e9e8467fb0832830c5');
             return response.data;
         }
         catch (error) {
             console.log(error);
             return false;
         }
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
            <div className="App" style={{ height: "100vh", width: "auto"}}>
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <Button onClick={() => this.addTile()}>Add Tilesszzz</Button>
                {this.state.user && this.state.user.tiles ? <UserPage user={this.state.user} updateUser={this.updateUser} /> : <SignIn />}
            </div>
        );
    }
}

export default App;