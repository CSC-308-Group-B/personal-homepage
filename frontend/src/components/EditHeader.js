import React from "react";
import { HexColorPicker } from "react-colorful";
import HoverDropdown from "./HoverDropdown";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

class EditHeader extends React.Component {
    constructor(props) {
        super(props);
        this.maxPageHeight = 0;
        this.state = {
            color: this.props.color,
            backgroundImage: this.props.backgroundImage,
            snapping: true,
        };
    }

    updateColor = (updatedColor) => {
        this.props.updateColor(updatedColor);
        this.setState({ color: updatedColor });
    };

    updateBackground = () => {
        const updatedBackground = document.getElementById(
            "inputBackgroundImageURL"
        ).value;
        this.props.updateBackgroundImage(updatedBackground);
        this.setState({ backgroundImage: updatedBackground });
    };

    toggleSnapping = () => {
        this.setState({ snapping: !this.state.snapping });
        this.props.toggleSnap();
    };

    render() {
        return (
            <div
                className={
                    "EditHeader" + (this.props.canEdit ? " canEdit" : "")
                }
            >
                <HoverDropdown
                    toggleContent={<div>ADD TILE</div>}
                    className="EditHeaderDropdown"
                >
                    <HoverDropdown.Item
                        onClick={() => this.props.addTile("ToDoListTile")}
                    >
                        Todo List
                    </HoverDropdown.Item>
                    <HoverDropdown.Item
                        onClick={() => this.props.addTile("BookmarksTile")}
                    >
                        Bookmarks
                    </HoverDropdown.Item>
                    <HoverDropdown.Item
                        onClick={() =>
                            this.props.addTile("SearchBarTile", { width: 2 })
                        }
                    >
                        Search Bar
                    </HoverDropdown.Item>
                    <HoverDropdown.Item
                        onClick={() => this.props.addTile("GradesTile")}
                    >
                        Grades
                    </HoverDropdown.Item>
                    <HoverDropdown.Item
                        onClick={() =>
                            this.props.addTile("UpcomingAssignmentsTile")
                        }
                    >
                        Assignments
                    </HoverDropdown.Item>
                    <HoverDropdown.Item
                        onClick={() => this.props.addTile("RandomImageTile")}
                    >
                        Cat Gifs
                    </HoverDropdown.Item>
                    <HoverDropdown.Item
                        onClick={() =>
                            this.props.addTile("TwitchTile", { width: 2 })
                        }
                    >
                        Twitch
                    </HoverDropdown.Item>
                    <HoverDropdown.Item
                        onClick={() => this.props.addTile("OtherTileString")}
                    >
                        (Other type)
                    </HoverDropdown.Item>
                </HoverDropdown>
                <HoverDropdown
                    toggleContent={<div>BACKGROUND</div>}
                    className="EditHeaderDropdown"
                >
                    <div className="BackgroundPicker">
                        <HexColorPicker
                            className="ColorPicker"
                            color={this.state.color}
                            onChange={this.updateColor}
                        />
                        <input
                            className="backgroundPicker"
                            id="inputBackgroundImageURL"
                            value={this.props.backgroundImage}
                            onChange={() => this.updateBackground(this.value)}
                        />
                        <button
                            onClick={() => {
                                document.getElementById(
                                    "inputBackgroundImageURL"
                                ).value = "";
                                this.updateBackground("");
                            }}
                        >
                            Remove Image
                        </button>
                    </div>
                </HoverDropdown>
                <div className="HeaderToggleSnap">
                    <label>TILE SNAPPING: </label>
                    <BootstrapSwitchButton
                        checked={this.state.snapping}
                        onChange={() => this.props.toggleSnap()}
                        onstyle="secondary"
                        offstyle="dark"
                        onlabel="On"
                        offlabel="Off"
                        size="sm"
                    />
                </div>
            </div>
        );
    }
}

export default EditHeader;
