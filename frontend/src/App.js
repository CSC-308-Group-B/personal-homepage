import logo from './logo.svg';
// import Card from 'react-bootstrap/Card';
import Tile from './Tile'
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/App.scss';

function App() {
  //We can use a static sample user, for now, and adjust the object scheme. Later on we will implement this on the backend/database
  const user = {
    name: "Gertrude",
    id: "123abc",
    tiles: [
      {
        tileType: "blank",
        width: 2,
        height: 4,
      },
      {
        tileType: "blank",
        width: 1,
        height: 2,
      },
      {
        tileType: "blank",
        width: 1,
        height: 2,
      },
      {
        tileType: "blank",
        width: 2,
        height: 3,
      },
      {
        tileType: "blank",
        width: 2,
        height: 1,
      },
      {
        tileType: "blank",
        width: 3,
        height: 1,
      },
    ]
  };

  //if the user and their tile list is defined, render each tile
  let content = "";
  if (user && user.tiles) {
    content = user.tiles.map(function(tile){
      return Tile(tile);
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div style={{"display": "grid", "grid-template-columns": "1fr 1fr 1fr 1fr"}}>
          { content }
        </div>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
