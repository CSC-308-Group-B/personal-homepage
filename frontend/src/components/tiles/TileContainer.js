import DefaultTile from "./DefaultTile";
import ToDoListTile from "./ToDoListTile";
import BookmarksTile from "./BookmarksTile";
import CloseButton from "react-bootstrap/CloseButton";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import React from "react";
import axios from 'axios';

class Tile extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
             width: this.props.width,
         }
    }

    componentDidMount() {
        //Receives new x, y positions whenever the tile is moved, and forwards this info to the move function (defined in UserPage)
        document
            .getElementById(this.props._id)
            .addEventListener("onTileMove", (e) => {
                this.props.moveTile(this.props._id, e.detail.x, e.detail.y);
            });
    }

    setWidth = async (newWidth) => {
        const res = await axios.post("http://localhost:5001/u/setTileFields", {
            userId: this.props.userId,
            tileId: this.props._id,
            width: newWidth
        }, { withCredentials: true });
        if (res) {
            this.setState({width: newWidth});
        }   
    }

    render() {
        //Translates the tile to the coordinates specified in the x and y properties of the tile.
        var transform = {
            transform: `translate(${this.props.x}vw, ${this.props.y}px)`,
            width: `${this.state.width * 25}%`,
        };

        return (
            //These data parameters are so interact.js knows the initial position of the tiles.
            <div
                className={`TileContainer ${this.props.canEdit ? "draggable" : ""}`}
                id={this.props._id}
                style={transform}
                data-x={this.props.x}
                data-y={this.props.y}
                data-snaptogrid={this.props.snapToGrid}
            >

                {getTileType(this.props)}

                {this.props.canEdit &&
                    <div className="TileControls">
                        <CloseButton
                            className="CloseButton"
                            onClick={() => this.props.deleteTile(this.props._id)}
                        />
                        <DropdownButton className="TileEditButton" title="">
                            {/* <DropdownButton title="Width"> */}
                                <Dropdown.Header>Width</Dropdown.Header>
                                <Dropdown.Item onClick={() => this.setWidth(1)}>Small</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.setWidth(2)}>Medium</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.setWidth(3)}>Large</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.setWidth(4)}>Full</Dropdown.Item>
                            </DropdownButton>
                        {/* </DropdownButton> */}
                    </div>
                }
            </div>
        );
    }
}

function getTileType(props) {
    switch (props.tileType) {

        case "ToDoListTile":
            return <ToDoListTile {...props} />;
            
        case "BookmarksTile":
            return <BookmarksTile {...props} />;

        default:
            return <DefaultTile {...props} />;
    }
}

export default Tile;
