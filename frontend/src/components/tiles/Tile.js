import Card from 'react-bootstrap/Card';
import TileDefault from './TileDefault';
import CloseButton from 'react-bootstrap/CloseButton';
import axios from 'axios';
import React from 'react';

class Tile extends React.Component {

    constructor(props) {
        super(props);
    }

    remove = async () => {
        const response = await axios.delete(`http://localhost:5000/u/620058e9e8467fb0832830c5/${this.props._id}`);
        console.log(response);
        if (response) {
            this.props.deleteTile(this.props._id);
        }
    }

    render() {
        return (
            <Card>
                <CloseButton className="CloseButton" onClick={() => this.remove()} />
                {getTileType(this.props.tileType)(this.props)}
            </Card>
        );
    }
}

function getTileType(tileType) {
    switch(tileType) {
        default:
            return TileDefault;
    }
}

export default Tile;