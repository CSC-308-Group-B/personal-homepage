import React from 'react';
import logo from './logo.svg';
import UserPage from './components/UserPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/App.scss';
import axios from 'axios';
import './draggable.js'
import Background from './components/Background';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: undefined,
      color: ""
    };
  }

  //updates the user object; re-renders the page
  updateUser = (updatedUser) => {
    this.setState({ user: updatedUser, color: this.state.color || updatedUser.backgroundColor });
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

  updateColor = async (color) => {
    const response = await axios.post(`http://localhost:5001/setColor`, {color: color}, {withCredentials: true});

    if(response){
      this.setState({color: color});
    }
  }

  addTile = async (tileType = "DefaultTile") => {
    //create base tile object
    const newTile = {
      tileType: tileType,
      width: 1,
      x: 0,
      y: 0
    }
    //depending on the tile type, handle other defaults
    /* There aren't any relevant examples currently, but for example:
    
    switch(tileType) {
      case "SomeSpecialTile":
        newTile.specialProperty = "specialVal";
        newTile.width = 2;
        break;
      case "OtherSpecialTile":
        newTile.width = 4;
        break;
    }

    */
    //Try adding tile to backend
    const response = await axios.post(`http://localhost:5001/u/${this.state.user._id}/tiles`, newTile, { withCredentials: true });
    if (response) {
      //if we get a successful response, add it to the frontend
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
      <div className="App" style={{ minHeight: "100vh", width: "auto" }}>
        <UserPage user={this.state.user} color={this.state.color} updateUser={this.updateUser} addTile={this.addTile} updateColor={this.updateColor}/>
        <Background color = {this.state.color}/>
      </div>
    );
  }
}

export default App;