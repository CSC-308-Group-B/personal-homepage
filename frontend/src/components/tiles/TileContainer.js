import DefaultTile from "./DefaultTile";
import ToDoListTile from "./ToDoListTile";
import CloseButton from "react-bootstrap/CloseButton";
import React from "react";

class Tile extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    componentDidMount() {
        //Receives new x, y positions whenever the tile is moved, and forwards this info to the move function (defined in UserPage)
        document
            .getElementById(this.props._id)
            .addEventListener("onTileMove", (e) => {
                this.props.moveTile(this.props._id, e.detail.x, e.detail.y);
            });
    }

    render() {
        //Translates the tile to the coordinates specified in the x and y properties of the tile.
        var transform = {
            transform: `translate(${this.props.x}vw, ${this.props.y}px)`,
            width: "25%",
        };

        return (
            //These data parameters are so interact.js knows the initial position of the tiles.
            <div
                className={`TileContainer ${this.props.canEdit ? "draggable" : ""}`}
                id={this.props._id}
                style={transform}
                data-x={this.props.x}
                data-y={this.props.y}
            >

                {getTileType(this.props)}

                {this.props.canEdit &&
                    <CloseButton
                        className="CloseButton"
                        onClick={() => this.props.deleteTile(this.props._id)}
                    />
                }
            </div>
        );
    }
}

function getTileType(props) {
    switch (props.tileType) {

        case "ToDoListTile":
            return <ToDoListTile {...props} />;

        default:
            return <DefaultTile {...props} />;
    }
}

export default Tile;
