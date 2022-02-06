import logo from './logo.svg';
// import Card from 'react-bootstrap/Card';
import UserPage from './components/UserPage'
import SignIn from './components/SignIn'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/App.scss';

function App() {
  //We can use a static sample user, for now, and adjust the object scheme. Later on we will implement this on the backend/database
  const user = {
    name: "Gertrude",
    id: "123abc",
    tiles: [
      {
        tileType: "anything",
        width: 2,
      },
      {
        tileType: "not",
        width: 1,
      },
      {
        tileType: "defined",
        width: 1,
      },
      {
        tileType: "will",
        width: 2,
      },
      {
        tileType: "render",
        width: 2,
      },
      {
        tileType: "as",
        width: 3,
      },
      {
        tileType: "the",
        width: 4,
      },
      {
        tileType: "default",
        width: 1,
      },
      {
        tileType: "tile",
        width: 2,
      },
    ]
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div>
        { user ? UserPage(user) : SignIn() }
      </div>
    </div>
  );
}

export default App;
