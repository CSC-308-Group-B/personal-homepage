import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import UserPage from './components/UserPage'
import SignIn from './components/SignIn'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/App.scss';
import axios from 'axios';

function App() {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    getUser().then( result => {
        if (result) {
          console.log(result);
          setUser(result);
        }
      });
  }, [] );

  async function getUser() {
    try {
      //right now we'll just be using our "Test User" (until we get user auth up and running)
      const response = await axios.get('http://localhost:5000/u/620058e9e8467fb0832830c5');
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
