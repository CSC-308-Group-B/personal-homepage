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
    //sample user object:
    // return {_id:"620058e9e8467fb0832830c5",name:"Test User",tiles:[{tileType:"anything",width:2,_id:"620058e9e8467fb0832830c6"},{tileType:"not",width:1,_id:"620058e9e8467fb0832830c7"},{tileType:"defined",width:1,_id:"620058e9e8467fb0832830c8"},{tileType:"will",width:2,_id:"620058e9e8467fb0832830c9"},{tileType:"render",width:2,_id:"620058e9e8467fb0832830ca"},{tileType:"as",width:3,_id:"620058e9e8467fb0832830cb"},{tileType:"the",width:4,_id:"620058e9e8467fb0832830cc"},{tileType:"default",width:1,_id:"620058e9e8467fb0832830cd"},{tileType:"tile",width:2,_id:"620058e9e8467fb0832830ce"}]};
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
