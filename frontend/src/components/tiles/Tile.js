// import Card from 'react-bootstrap/Card';
import TileDefault from './TileDefault'

function Tile(props) {
    switch(props.tileType) {
        default:
            return TileDefault(props);
    }
}

export default Tile;