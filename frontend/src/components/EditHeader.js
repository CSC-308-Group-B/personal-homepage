import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import FormCheck from 'react-bootstrap/FormCheck'
import InputGroup from "react-bootstrap/InputGroup";
import { HexColorPicker } from "react-colorful";

class EditHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: this.props.color,
            backgroundImage: this.props.backgroundImage
        }
    }

    updateColor = (updatedColor) => {
        this.props.updateColor(updatedColor);
        this.setState({ color: updatedColor });
    }

    updateBackground = () => {
        const updatedBackground = document.getElementById("inputBackgroundImageURL").value;
        this.props.updateBackgroundImage(updatedBackground);
        this.setState({ backgroundImage: updatedBackground });
    }


    render() {
        let classes = 'EditHeader';

        if (this.props.canEdit) {
            classes += ' editHeaderVis';
        }
        return (
            <div className={classes}>

                <h3>EDIT MODE</h3>

                <FormCheck className="my-2" label={'Snap Tiles to Grid'} type="switch" defaultChecked={true} onChange={() => this.props.toggleSnap()} />

                <DropdownButton className="my-2" title="Add Tile">
                    <Dropdown.Item onClick={() => this.props.addTile("ToDoListTile")}>Todo List</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.props.addTile("SearchBarTile"), {width: 2}}>Search Bar</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.props.addTile("BookmarksTile", {width: 2})}>Bookmarks</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.props.addTile("OtherTileString")}>(Other type)</Dropdown.Item>
                </DropdownButton>

                <HexColorPicker className="my-2" color={this.state.color} onChange={this.updateColor} />

                <div className="colorSwab my-2" style={{ borderColor: this.state.color }}>
                    Color: {this.state.color}
                </div>
                
                <InputGroup>
                    <input id="inputBackgroundImageURL" value = {this.props.backgroundImage} onChange={() => this.updateBackground(this.value)}/>
                    <button onClick={() => {document.getElementById("inputBackgroundImageURL").value = ""; this.updateBackground("") }}>Reset</button>
                </InputGroup>


            </div>
        )
    }
}

export default EditHeader;