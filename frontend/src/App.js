import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import UserPage from './components/UserPage'
import SignIn from './components/SignIn'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/App.scss';
import axios from 'axios';

function App() {
  //We can use a static sample user, for now, and adjust the object scheme. Later on we will implement this on the backend/database
  const [user, setUser] = useState({});
  
  useEffect(() => {
    getUser().then( result => {
        if (result) {
          console.log(result);
          setUser(result);
        }
      });
  }, [] );
  
  // const user = {
  //   name: "Gertrude",
  //   id: "123abc",
    // tiles: [
    //   {
    //     tileType: "anything",
    //     width: 2,
    //   },
    //   {
    //     tileType: "not",
    //     width: 1,
    //   },
    //   {
    //     tileType: "defined",
    //     width: 1,
    //   },
    //   {
    //     tileType: "will",
    //     width: 2,
    //   },
    //   {
    //     tileType: "render",
    //     width: 2,
    //   },
    //   {
    //     tileType: "as",
    //     width: 3,
    //   },
    //   {
    //     tileType: "the",
    //     width: 4,
    //   },
    //   {
    //     tileType: "default",
    //     width: 1,
    //   },
    //   {
    //     tileType: "tile",
    //     width: 2,
    //   },
    // ]
  // };

  async function getUser() {
    try {
      //right now we'll just be using our "Test User" (until we get user auth up and running)
      const response = await axios.get('http://localhost:5000/u/6200317bf3695bf37ec95b5b');
      return response.data;
    }
    catch (error){
      console.log(error); 
      return false;         
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        { user && user.tiles ? UserPage(user) : SignIn() }
      </div>
    </div>
  );
}

export default App;
