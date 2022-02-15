import Card from 'react-bootstrap/Card';
import TileDefault from './TileDefault';
import CloseButton from 'react-bootstrap/CloseButton';
import React from 'react';

class Tile extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        //Translates the tile to the coordinates specified in the posx and posy properties of the tile.
        var transform = {
            transform: `translate(${this.props.posx}px, ${this.props.posy}px)`,
            width: "25%"
        };

        // if (this.props.posx != this.props["data-x"] || this.props.posy != this.props["data-y"]) {
        //     console.log("I moved!");
        // } else {
        //     console.log(this.props["data-x"])
        // }
        // this.props.moveTile(this.props._id);

        return (
            //These data parameters are so interact.js knows the initial position of the tiles.
            <Card className="draggable" style={transform} data-x={this.props.posx} data-y={this.props.posy}>
                <CloseButton className="CloseButton" onClick={() => this.props.deleteTile(this.props._id)} />
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