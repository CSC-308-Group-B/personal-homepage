import Card from 'react-bootstrap/Card';
import TileDefault from './TileDefault'

function Tile(props) {
    return (
        <Card>
            { getTileType(props.tileType)(props) }
        </Card>
    );
}

function getTileType(tileType) {
    switch(tileType) {
        default:
            return TileDefault;
    }
}

export default Tile;