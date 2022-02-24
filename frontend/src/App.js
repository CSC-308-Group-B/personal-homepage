import React from 'react';
import logo from './logo.svg';
import UserPage from './components/UserPage'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/App.scss';
import axios from 'axios';
import './draggable.js'
import { HexColorPicker, RgbaColorPicker} from "react-colorful";
import Button from 'react-bootstrap/Button'


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: 0,
      r: 255,
      g: 255,
      b: 255,
      a: 1,
      color: "#ffffff",
      showColor: false,
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
    const result = await axios.get('http://localhost:5000/getUser', { withCredentials: true });
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

  updateColor = (updatedColor) => {
    this.setState({r: updatedColor.r, g: updatedColor.g, b: updatedColor.b, a: updatedColor.a});
  }


  render() {

    

    return (
      <div className="App" style={{ height: "100vh", width: "auto" }}>
        {/* //<div className='Background' /> */}

        {
          (this.state.showColor ? <RgbaColorPicker  style = {{position: 'absolute', top: 0, left: 0}}className = "ColorPicker" color = {{r: this.state.r, g:this.state.g, b:this.state.b, a: this.state.a}} onChange={this.updateColor} /> : null)
        }
        
        <Button onClick={() => this.setState({showColor: !this.state.showColor})}>Color Picker</Button>


        <div className="value" style={{borderLeftColor: this.state.color }}>
        Current color is { this.state.r}, {this.state.g}, {this.state.b}, {this.state.a}
        </div> 

        <UserPage user={this.state.user} updateUser={this.updateUser} addTile={this.addTile} />
      </div>
    );
  }
}

export default App;