import Card from 'react-bootstrap/Card';
import TileDefault from './TileDefault';
import TileEditOverlay from './TileEditOverlay';
import axios from 'axios';

function Tile(props) {
    return (
        <Card>
            <TileEditOverlay {...props} deleteFunction={deleteTile} />
            { getTileType(props.tileType)(props) }
        </Card>
    );

    async function deleteTile() {
        const response = await axios.delete(`http://localhost:5000/u/620058e9e8467fb0832830c5/${this._id}`);
        console.log(response);
        if (response) {
            props.deleteTileFromFrontend(this._id);
        }
    }
}

function getTileType(tileType) {
    switch(tileType) {
        default:
            return TileDefault;
    }
}

export default Tile;