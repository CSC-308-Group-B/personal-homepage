import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import UserPage from './components/UserPage'
import SignIn from './components/SignIn'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/App.scss';
import axios from 'axios';

class App extends React.Component {
    // const[user, setUser] = useState({ });

    //useEffect = () => {
    //  getUser().then( result => {
    //      if (result) {
    //        console.log(result);
    //        setUser(result);
    //      }
    //    });
    //}, []);

    constructor(props) {
        super(props);
        this.state = {
            user: 0,
        };
    }

    componentDidMount() {
        this.getUser().then(result => {
            if (result)
                this.updateUser(result);
        });
    }

    getUser = async () => {
        //sample user object:
        return { _id: "620058e9e8467fb0832830c5", name: "Test User", tiles: [{ tileType: "anything", width: 2, _id: "620058e9e8467fb0832830c6" }, { tileType: "not", width: 1, _id: "620058e9e8467fb0832830c7" }, { tileType: "defined", width: 1, _id: "620058e9e8467fb0832830c8" }, { tileType: "will", width: 2, _id: "620058e9e8467fb0832830c9" }, { tileType: "render", width: 2, _id: "620058e9e8467fb0832830ca" }, { tileType: "as", width: 3, _id: "620058e9e8467fb0832830cb" }, { tileType: "the", width: 4, _id: "620058e9e8467fb0832830cc" }, { tileType: "default", width: 1, _id: "620058e9e8467fb0832830cd" }, { tileType: "tile", width: 2, _id: "620058e9e8467fb0832830ce" }] };
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

    updateUser = (updatedUser) => {
        this.setState({ user: updatedUser });
    }


    addTile = async () => {

        const newTile = {
            tileType: "BRUHHHHH",
            width: 2
        }

        const response = await axios.post(`http://localhost:5000/u/620058e9e8467fb0832830c5/tiles`, newTile);
        console.log(response);
        if (response) {
            if (this.state.user.tiles) {
                newTile._id = response.data.tiles[response.data.tiles.length - 1]._id;
                this.state.user.tiles.push(newTile);
            }
            console.log(this.state.user.tiles);
            this.updateUser(this.state.user);
        } else {
            console.log("boo hoo");
        }


    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                </header>
                <Button onClick={() => this.addTile()}>Add Tilesszzz</Button>
                <div>
                    {this.state.user && this.state.user.tiles ? <UserPage user={this.state.user} updateUser={this.updateUser} /> : <SignIn />}
                </div>
            </div>
        );
    }
}


export default App;