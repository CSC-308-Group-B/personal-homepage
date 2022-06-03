import React from "react";
import TileContainer from "./tiles/TileContainer";
import SignIn from "./SignIn";
import axios from "axios";
import EditHeader from "./EditHeader";
import Background from "./Background";

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.maxPageHeight = 0;
        this.backgroundColorThrottler = null;
        this.backgroundColorDebouncer = null;
        this.state = {
            user: undefined,
            backgroundColor: "",
            backgroundImage: "",
            canEdit: false,
            snapToGrid: true,
        };
    }

    //Runs immediately as the page begins rendering
    componentDidMount() {
        //if getUser returns a user, set the state
        this.getUser().then((result) => {
            if (result) this.updateUser(result);
        });
    }

    //updates the user object; re-renders the page
    updateUser = (updatedUser) => {
        this.setState({
            user: updatedUser,
            backgroundColor:
                this.state.backgroundColor || updatedUser?.backgroundColor,
            backgroundImage:
                this.state.backgroundImage || updatedUser?.backgroundImage,
        });
    };

    //fetches a user object based on the signin
    getUser = async () => {
        const result = await axios.get(
            `${process.env.REACT_APP_BE_URL}/getUser`,
            {
                withCredentials: true,
            }
        );
        console.log(result.data);
        return result.data;
    };

    logout = async () => {
        const response = await axios.get(
            `${process.env.REACT_APP_BE_URL}/logout`,
            { withCredentials: true }
        );
        if (response) {
            this.updateUser(null);
        }
    };

    updateBackgroundColor = async (newBackgroundColor) => {
        //Frontend throttling
        if (!this.backgroundColorThrottler) {
            this.backgroundColorThrottler = setTimeout(() => {
                this.backgroundColorThrottler = null;
                this.setState({ backgroundColor: newBackgroundColor });
            }, 50);
        }
        //Backend debouncing
        if (this.backgroundColorDebouncer) {
            clearTimeout(this.backgroundColorDebouncer);
        }
        this.backgroundColorDebouncer = setTimeout(async () => {
            const response = await axios.post(
                `${process.env.REACT_APP_BE_URL}/setBackgroundColor`,
                { backgroundColor: newBackgroundColor },
                { withCredentials: true }
            );
            if (response.status === 200)
                this.setState({ backgroundColor: newBackgroundColor });
        }, 250);
    };

    updateBackgroundImage = async (newBackgroundImage) => {
        const response = await axios.post(
            `${process.env.REACT_APP_BE_URL}/setBackgroundImage`,
            { backgroundImage: newBackgroundImage },
            { withCredentials: true }
        );
        if (response) {
            this.setState({ backgroundImage: newBackgroundImage });
        }
    };

    addTile = async (tileType = "DefaultTile", defaultFields = {}) => {
        //create base tile object
        const newTile = {
            tileType: tileType,
            width: 1,
            x: 0,
            y: 0,
            color: { r: 255, g: 255, b: 255, a: 1 },
            ...defaultFields,
        };
        //Try adding tile to backend
        const response = await axios.post(
            `${process.env.REACT_APP_BE_URL}/u/${this.state.user._id}/tiles`,
            newTile,
            { withCredentials: true }
        );
        if (response) {
            //if we get a successful response, add it to the frontend
            if (this.state.user.tiles) {
                newTile._id =
                    response.data.tiles[response.data.tiles.length - 1]._id;
                this.state.user.tiles.push(newTile);
            }
            this.updateUser(this.state.user);
        } else {
            console.log("Failed to add tile.");
        }
    };

    moveTile = async (tileId, x, y) => {
        await axios.post(
            `${process.env.REACT_APP_BE_URL}/u/moveTile`,
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
            `${process.env.REACT_APP_BE_URL}/u/${this.state.user._id}/${tileId}`,
            { withCredentials: true }
        );
        if (response.status === 204) {
            this.state.user.tiles = this.state.user.tiles.filter((tile) => {
                return tile._id !== tileId;
            });
            this.updateUser(this.state.user);
        }
    };

    deleteAllTiles = async () => {
        const response = await axios.delete(
            `${process.env.REACT_APP_BE_URL}/deleteAllTiles`,
            {
                withCredentials: true,
            }
        );
        if (response.status === 204) {
            this.state.user.tiles = [];
            this.updateUser(this.state.user);
        }
    };

    moveTileMobile = async (tileId, direction) => {
        const response = await axios.post(
            `${process.env.REACT_APP_BE_URL}/moveTileMobile`,
            {
                tiles: this.state.user.tiles,
                tileId: tileId,
                direction: direction,
            },
            { withCredentials: true }
        );

        if (response.status === 200) {
            this.updateUser(response.data);
        }
    };

    updateAllTileColors = async (newColor) => {
        const result = await axios.post(
            `${process.env.REACT_APP_BE_URL}/applyBackgroundColorToAllTiles`,
            {
                color: newColor,
            },
            { withCredentials: true }
        );
        if (result && result.status === 200) {
            const updateAllTileColorsEvent = new CustomEvent(
                "updateAllTileColors",
                {
                    detail: newColor,
                }
            );
            window.dispatchEvent(updateAllTileColorsEvent);
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
        if (!this.state.user || !this.state.user.tiles) return <SignIn />;

        this.maxPageHeight = 0;

        document.title = `${this.state.user.name}'s Personal Homepage`;

        return (
            <div>
                <div className="UserPage">
                    <EditHeader
                        backgroundColor={this.state.backgroundColor}
                        backgroundImage={this.state.backgroundImage}
                        setBackgroundImage={this.updateBackgroundImage}
                        setBackgroundColor={this.updateBackgroundColor}
                        addTile={this.addTile}
                        toggleSnap={this.toggleSnap}
                        deleteAllTiles={this.deleteAllTiles}
                        canEdit={this.state.canEdit}
                        canPick={this.state.canPick}
                        logout={this.logout}
                    />
                    <svg
                        className={
                            "EditModeToggler" +
                            (this.state.canEdit ? " canEdit" : "")
                        }
                        alt="#"
                        onClick={() => this.toggleEdit()}
                        viewBox="0 0 100 100"
                    >
                        <path className="line1" d="M10,20l80,0l-80,60" />
                        <path className="line2" d="M10,80l80,0l-80,-60" />
                        <path className="line3" d="M10,50l80,0" />
                    </svg>
                    {!this.state.canEdit &&
                        this.state.user.tiles.length === 0 && (
                            <img
                                className={"EditModeTogglerPointer"}
                                alt="^"
                                src={require("../styling/img/editHeaderTogglerPointer.png")}
                            />
                        )}
                    {this.state.canEdit &&
                        this.state.user.tiles.length === 0 && (
                            <img
                                className={"EditModeAddTilesPointer"}
                                alt="^"
                                src={require("../styling/img/editHeaderAddTilesPointer.png")}
                            />
                        )}
                    <div
                        className={
                            "tileScrollArea" +
                            (this.state.canEdit ? " canEdit" : "")
                        }
                    >
                        <div id="editModeStatus">
                            <div>EDITING</div>
                        </div>
                        <div
                            id={"tileDragArea"}
                            className={this.state.canEdit ? "canEdit" : ""}
                        >
                            {this.state.user.tiles.map((tile) => {
                                this.updateTileAreaHeight(tile.y);
                                return (
                                    <TileContainer
                                        key={tile._id}
                                        {...tile}
                                        userId={this.state.user._id}
                                        deleteTile={this.removeTile}
                                        moveTile={this.moveTile}
                                        moveTileMobile={this.moveTileMobile}
                                        updateAllTileColors={
                                            this.updateAllTileColors
                                        }
                                        canEdit={this.state.canEdit}
                                        snapToGrid={this.state.snapToGrid}
                                    />
                                );
                            })}
                            <div id="dragSpace" />
                            <div
                                className={
                                    "extraDragSpace" +
                                    (this.state.canEdit ? " canEdit" : "")
                                }
                            />
                        </div>
                    </div>
                </div>
                <Background
                    backgroundColor={this.state.backgroundColor}
                    backgroundImage={this.state.backgroundImage}
                />
            </div>
        );
    }
}

export default UserPage;
