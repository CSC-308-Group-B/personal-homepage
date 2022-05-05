import React from "react";
import Tile from "./tiles/TileContainer";
import SignIn from "./SignIn";
import axios from "axios";
import EditHeader from "./EditHeader";
import { backendURL } from "../App.js";


class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.maxPageHeight = 0;
        this.state = {
            canEdit: false,
            snapToGrid: true,
        };
    }

    moveTile = async (tileId, x, y) => {
        await axios.post(
            `${backendURL}/u/moveTile`,
            {
                tileId: tileId,
                x: x,
                y: y,
            },
            { withCredentials: true }
        );
        this.updateTileAreaHeight(y);
    };

    removeTile = async (tileId) => {
        const response = await axios.delete(
            `${backendURL}/u/${this.props.user._id}/${tileId}`,
            { withCredentials: true }
        );
        if (response) {
            this.props.user.tiles = this.props.user.tiles.filter((tile) => {
                return tile._id !== tileId;
            });
            this.props.updateUser(this.props.user);
        }
    };

    moveTileMobile = async (tileId, direction) => {
        const response = await axios.post(
            `${backendURL}/moveTileMobile`,
            {
                tiles: this.props.user.tiles,
                tileId: tileId,
                direction: direction,
            },
            { withCredentials: true }
        );

        if (response.status === 200) {
            this.props.updateUser(response.data);
        }
    };

    toggleEdit = () => {
        this.setState({ canEdit: !this.state.canEdit });
    };

    toggleSnap = () => {
        this.setState({ snapToGrid: !this.state.snapToGrid });
    };

    updateTileAreaHeight = (y) => {
        this.maxPageHeight = Math.max(this.maxPageHeight, y);
        let dragSpace = document.getElementById("dragSpace");
        if (dragSpace) {
            dragSpace.style.height = `${this.maxPageHeight}rem`;
        }
    };


    render() {
        if (!this.props.user || !this.props.user.tiles) return <SignIn />;

        this.maxPageHeight = 0;

        document.title = `${this.props.user.name}'s Personal Homepage`;

        return (
            <div className="UserPage">
                <EditHeader
                    color={this.props.color}
                    backgroundImage={this.props.backgroundImage}
                    updateBackgroundImage={this.props.updateBackgroundImage}
                    updateColor={this.props.updateColor}
                    addTile={this.props.addTile}
                    toggleSnap={this.toggleSnap}
                    canEdit={this.state.canEdit}
                    canPick={this.state.canPick}
                />
                <img
                    className="EditModeToggler"
                    alt="#"
                    src="https://icon-library.com/images/white-menu-icon-png/white-menu-icon-png-18.jpg"
                    onClick={() => this.toggleEdit()}
                ></img>
                <div
                    className={"tileScrollArea" + (this.state.canEdit ? " canEdit" : "")}
                >
                    <div id="editModeStatus">
                        <div>EDITING</div>
                    </div>
                    <div
                        id={"tileDragArea"}
                        className={this.state.canEdit ? "canEdit" : ""}
                    >
                        {this.props.user.tiles.map((tile) => {
                            this.updateTileAreaHeight(tile.y);
                            return (
                                <Tile
                                    key={tile._id}
                                    {...tile}
                                    userId={this.props.user._id}
                                    deleteTile={this.removeTile}
                                    moveTile={this.moveTile}
                                    moveTileMobile={this.moveTileMobile}
                                    canEdit={this.state.canEdit}
                                    snapToGrid={this.state.snapToGrid}
                                />
                            );
                        })}
                        <div
                            id="dragSpace"
                        />
                        <div
                            className={"extraDragSpace" + (this.state.canEdit ? " canEdit" : "")}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default UserPage;
