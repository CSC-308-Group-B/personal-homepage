import DefaultTile from "./DefaultTile";
import ToDoListTile from "./ToDoListTile";
import SearchBarTile from "./SearchBarTile";
import BookmarksTile from "./BookmarksTile";
import NotesTile from "./NotesTile";
import UpcomingAssignmentsTile from "./UpcomingAssignmentsTile";
import RandomImageTile from "./RandomImageTile";
import React from "react";
import { RgbaColorPicker } from "react-colorful";
import GradesTile from "./GradesTile";
import axios from "axios";
import HoverDropdown from "../HoverDropdown";
import TwitchTile from "./TwitchTile";
import Button from "react-bootstrap/Button";

class TileContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: this.props.width,
            color:
                this.props.color === undefined
                    ? { r: 255, g: 255, b: 255, a: 1 }
                    : this.props.color,
        };
        this.tileColorDebouncer = null;
        this.tileColorThrottler = null;
        this.fontWhite = false;
    }

    componentDidMount() {
        //Receives new x, y positions whenever the tile is moved, and forwards this info to the move function (defined in UserPage)
        document
            .getElementById(this.props._id)
            .addEventListener("onTileMove", (e) => {
                this.props.moveTile(this.props._id, e.detail.x, e.detail.y);
            });
        window.addEventListener(
            "updateAllTileColors",
            this.handleUpdateAllTileColors
        );
    }

    handleUpdateAllTileColors = ({ detail }) => {
        this.setState({ color: detail });
    };

    setWidth = async (newWidth) => {
        if (this.props.x / 25 + newWidth > 4) {
            await this.props.moveTile(
                this.props._id,
                100 - newWidth * 25,
                this.props.y
            );
        }
        const res = await axios.post(
            `${process.env.REACT_APP_BE_URL}/setTileWidth`,
            {
                tileId: this.props._id,
                width: newWidth,
            },
            { withCredentials: true }
        );
        if (res) {
            this.setState({ width: newWidth });
        }
    };

    setTileColor = async (newColor) => {
        if (!this.tileColorThrottler) {
            this.tileColorThrottler = setTimeout(() => {
                this.tileColorThrottler = null;
                this.setState({ color: newColor });
            }, 250);
        }
        if (this.tileColorDebouncer) {
            clearTimeout(this.tileColorDebouncer);
        }

        this.tileColorDebouncer = setTimeout(async () => {
            this.tileColorDebouncer = null;
            const res = await axios.post(
                `${process.env.REACT_APP_BE_URL}/u/setTileFields`,
                {
                    tileId: this.props._id,
                    color: newColor,
                },
                { withCredentials: true }
            );

            if (res) {
                this.setState({ color: newColor });
            }
        }, 500);
    };

    applyBackgroundColorToAllTiles = async () => {
        this.props.updateAllTileColors(this.state.color);
    };

    getTileType = () => {
        let extraProps = {
            tileColor: this.state.color,
        };

        switch (this.props.tileType) {
            case "ToDoListTile":
                return <ToDoListTile {...this.props} {...extraProps} />;
            case "BookmarksTile":
                return <BookmarksTile {...this.props} {...extraProps} />;
            case "SearchBarTile":
                return <SearchBarTile {...this.props} {...extraProps} />;
            case "GradesTile":
                return <GradesTile {...this.props} {...extraProps} />;
            case "UpcomingAssignmentsTile":
                return (
                    <UpcomingAssignmentsTile {...this.props} {...extraProps} />
                );
            case "RandomImageTile":
                return <RandomImageTile {...this.props} {...extraProps} />;
            case "TwitchTile":
                return <TwitchTile {...this.props} {...extraProps} />;
            case "NotesTile":
                return <NotesTile {...this.props} {...extraProps} />;
            default:
                return <DefaultTile {...this.props} {...extraProps} />;
        }
    };

    render() {
        //Translates the tile to the coordinates specified in the x and y properties of the tile.
        let tileStyle = {
            transform: `translate(${this.props.x}vw, ${this.props.y}rem)`,
            width: `${this.state.width * 25 - 2}vw`,
        };

        if (window.innerWidth < 720) {
            tileStyle = { width: "94vw", position: "static", margin: "3vw" };
        }
        return (
            //These data parameters are so interact.js knows the initial position of the tiles
            <div
                className={`TileContainer ${
                    this.props.canEdit ? "draggable" : ""
                }
                ${
                    (this.state.color.r +
                        this.state.color.g +
                        this.state.color.b) /
                        3 <=
                    128
                        ? "fontWhite"
                        : ""
                }`}
                id={this.props._id}
                style={tileStyle}
                data-x={this.props.x}
                data-y={this.props.y}
                data-snaptogrid={this.props.snapToGrid}
            >
                {this.getTileType()}

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
                            className="NestedHoverDropdown TileEditWidth"
                            toggleContent={<div>Color</div>}
                        >
                            <div className="p-2 pb-0">
                                <RgbaColorPicker
                                    className="ColorPicker"
                                    color={this.state.color}
                                    onChange={this.setTileColor}
                                />
                            </div>
                            <Button
                                className="mx-2"
                                onClick={this.applyBackgroundColorToAllTiles}
                            >
                                Apply to All
                            </Button>
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
                            className="Danger"
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

export default TileContainer;
