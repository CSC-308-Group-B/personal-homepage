import DefaultTile from "./DefaultTile";
import ToDoListTile from "./ToDoListTile";
import SearchBarTile from "./SearchBarTile";
import BookmarksTile from "./BookmarksTile";
import NotesTile from "./NotesTile";
import UpcomingAssignmentsTile from "./UpcomingAssignmentsTile";
import RandomImageTile from "./RandomImageTile";
import React from "react";
import GradesTile from "./GradesTile";
import axios from "axios";
import HoverDropdown from "../HoverDropdown";
import TwitchTile from "./TwitchTile";
import { backendURL } from "../../App.js";

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
        };
    }

    componentDidMount() {
        //Receives new x, y positions whenever the tile is moved, and forwards this info to the move function (defined in UserPage)
        document
            .getElementById(this.props._id)
            .addEventListener("onTileMove", (e) => {
                this.props.moveTile(this.props._id, e.detail.x, e.detail.y);
            });
        //test
    }

    setWidth = async (newWidth) => {
        const res = await axios.post(
            `${backendURL}/u/setTileFields`,
            {
                userId: this.props.userId,
                tileId: this.props._id,
                width: newWidth,
            },
            { withCredentials: true }
        );
        if (res) {
            this.setState({ width: newWidth });
        }
    };

    render() {
        //Translates the tile to the coordinates specified in the x and y properties of the tile.
        let transform = {
            transform: `translate(${this.props.x}vw, ${this.props.y}rem)`,
            width: `${this.state.width * 25 - 2}vw`,
        };

        if (window.innerWidth < 720) {
            transform = { width: "94vw", position: "static", margin: "3vw" };
        }

        return (
            //These data parameters are so interact.js knows the initial position of the tiles.
            <div
                className={`TileContainer ${
                    this.props.canEdit ? "draggable" : ""
                }`}
                id={this.props._id}
                style={transform}
                data-x={this.props.x}
                data-y={this.props.y}
                data-snaptogrid={this.props.snapToGrid}
            >
                {getTileType(this.props)}

                {this.props.canEdit && (
                    <HoverDropdown
                        className="TileControls"
                        toggleContent={
                            <img
                                alt="#"
                                src={
                                    require("../../styling/img/Ellipsis.svg")
                                        .default
                                }
                            />
                        }
                    >
                        <HoverDropdown
                            className="NestedHoverDropdown TileEditWidth"
                            toggleContent={<div>Width</div>}
                        >
                            <HoverDropdown.Item
                                onClick={() => this.setWidth(1)}
                            >
                                Small
                            </HoverDropdown.Item>
                            <HoverDropdown.Item
                                onClick={() => this.setWidth(2)}
                            >
                                Medium
                            </HoverDropdown.Item>
                            <HoverDropdown.Item
                                onClick={() => this.setWidth(3)}
                            >
                                Large
                            </HoverDropdown.Item>
                            <HoverDropdown.Item
                                onClick={() => this.setWidth(4)}
                            >
                                Full
                            </HoverDropdown.Item>
                        </HoverDropdown>

                        <HoverDropdown
                            className="NestedHoverDropdown TileEditOrder"
                            toggleContent={<div>Order</div>}
                        >
                            <HoverDropdown.Item
                                onClick={() =>
                                    this.props.moveTileMobile(
                                        this.props._id,
                                        "top"
                                    )
                                }
                            >
                                Move to Top
                            </HoverDropdown.Item>
                            <HoverDropdown.Item
                                onClick={() =>
                                    this.props.moveTileMobile(
                                        this.props._id,
                                        "up"
                                    )
                                }
                            >
                                Move Up
                            </HoverDropdown.Item>
                            <HoverDropdown.Item
                                onClick={() =>
                                    this.props.moveTileMobile(
                                        this.props._id,
                                        "down"
                                    )
                                }
                            >
                                Move Down
                            </HoverDropdown.Item>
                            <HoverDropdown.Item
                                onClick={() =>
                                    this.props.moveTileMobile(
                                        this.props._id,
                                        "bottom"
                                    )
                                }
                            >
                                Move to Bottom
                            </HoverDropdown.Item>
                        </HoverDropdown>

                        <HoverDropdown.Div />
                        <HoverDropdown.Item
                            className="TileDeleteButton"
                            onClick={() =>
                                this.props.deleteTile(this.props._id)
                            }
                        >
                            Delete
                        </HoverDropdown.Item>
                    </HoverDropdown>
                )}
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
        case "NotesTile":
            return <NotesTile {...props} />;
        case "UpcomingAssignmentsTile":
            return <UpcomingAssignmentsTile {...props} />;
        case "RandomImageTile":
            return <RandomImageTile {...props} />;
        case "TwitchTile":
            return <TwitchTile {...props} />;
        default:
            return <DefaultTile {...props} />;
    }
}

export default Tile;
