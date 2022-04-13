import DefaultTile from "./DefaultTile";
import ToDoListTile from "./ToDoListTile";
import SearchBarTile from "./SearchBarTile";
import BookmarksTile from "./BookmarksTile";
import UpcomingAssignmentsTile from "./UpcomingAssignmentsTile";
import TwitchTile from "./TwitchTile";
import React from "react";
import GradesTile from "./GradesTile";
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
        //test
        console.log(this);
    }

    setWidth = async (newWidth) => {
        const res = await axios.post("http://localhost:5001/u/setTileFields", {
            userId: this.props.userId,
            tileId: this.props._id,
            width: newWidth
        }, { withCredentials: true });
        if (res) {
            this.setState({ width: newWidth });
        }
    }

    render() {
        //Translates the tile to the coordinates specified in the x and y properties of the tile.
        let transform = {
            transform: `translate(${this.props.x}vw, ${this.props.y}rem)`,
            width: `${this.state.width * 25 - 2}vw`,
        };

        if (window.innerWidth < 720) {
            console.log(window.innerWidth);
            transform = { width: "94vw", position: "static", margin: "3vw" };
        }

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
                    <div class="dropdown" className="threeDots">
                        <input className="threeDots" type="image" alt='#' src="https://miro.medium.com/max/512/1*Js0Y20MwjcTnVAe7KjDXNg.png" />
                        <div className="dropdown-content">
                            <a href="/#" onClick={() => this.setWidth(1)}>Small</a>
                            <a href="/#" onClick={() => this.setWidth(2)}>Medium</a>
                            <a href="/#" onClick={() => this.setWidth(3)}>Large</a>
                            <a href="/#" onClick={() => this.setWidth(4)}>Full</a>
                            <hr className="division"></hr>
                            <a className="deleteButtom" href="/#" onClick={() => this.props.deleteTile(this.props._id)}>Delete</a>
                        </div>
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

        case "SearchBarTile":
            return <SearchBarTile {...props} />;

        case "GradesTile":
            return <GradesTile {...props} />;

        case "UpcomingAssignmentsTile":
            return <UpcomingAssignmentsTile {...props} />;

        case "TwitchTile":
            return <TwitchTile {...props} />;

        default:
            return <DefaultTile  {...props} />;
    }
}

export default Tile;
