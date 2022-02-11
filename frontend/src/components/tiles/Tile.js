import Card from 'react-bootstrap/Card';
import TileDefault from './TileDefault';
import CloseButton from 'react-bootstrap/CloseButton';
import React from 'react';

class Tile extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card>
                <CloseButton className="CloseButton" onClick={() => this.props.removeTile(this.props._id)} />
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