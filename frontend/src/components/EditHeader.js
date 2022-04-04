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
        function openCity(evt, cityName) {
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(cityName).style.display = "block";
            evt.currentTarget.className += " active";
        }

        return (
            <div className={classes}>
                <div class="tab">
                    <button class="tablinks" onClick={() => openCity(null, 'London')}>Snap</button>
                    <button class="tablinks" onClick={() => openCity(null, 'Paris')}>Tiles</button>
                    <button class="tablinks" onClick={() => openCity(null, 'Tokyo')}>Color</button>
                </div>

                <div id="London" class="tabcontent">
                    <FormCheck className="my-2" label={'Snap Tiles to Grid'} type="switch" defaultChecked={true} onChange={() => this.props.toggleSnap()} />

                </div>

                <div id="Paris" class="tabcontent">
                    <Dropdown.Item onClick={() => this.props.addTile("ToDoListTile")}>Todo List</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.props.addTile("BookmarksTile", { width: 2 })}>Bookmarks</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.props.addTile("OtherTileString")}>(Other type)</Dropdown.Item>
                </div>

                <div id="Tokyo" class="tabcontent">
                    <HexColorPicker className="my-2" color={this.state.color} onChange={this.updateColor} />

                    <div className="colorSwab my-2" style={{ borderColor: this.state.color }}>
                        Color: {this.state.color}
                    </div>

                    <InputGroup>
                        <input id="inputBackgroundImageURL" value={this.props.backgroundImage} onChange={() => this.updateBackground(this.value)} />
                        <button onClick={() => { document.getElementById("inputBackgroundImageURL").value = ""; this.updateBackground("") }}>Reset</button>
                    </InputGroup>
                </div>




                {/* <FormCheck className="my-2" label={'Snap Tiles to Grid'} type="switch" defaultChecked={true} onChange={() => this.props.toggleSnap()} /> */}



                {/* <DropdownButton className="my-2" title="Add Tile">
                    <Dropdown.Item onClick={() => this.props.addTile("ToDoListTile")}>Todo List</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.props.addTile("BookmarksTile", { width: 2 })}>Bookmarks</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.props.addTile("OtherTileString")}>(Other type)</Dropdown.Item>
                </DropdownButton> */}

                {/* <HexColorPicker className="my-2" color={this.state.color} onChange={this.updateColor} />

                <div className="colorSwab my-2" style={{ borderColor: this.state.color }}>
                    Color: {this.state.color}
                </div>

                <InputGroup>
                    <input id="inputBackgroundImageURL" value={this.props.backgroundImage} onChange={() => this.updateBackground(this.value)} />
                    <button onClick={() => { document.getElementById("inputBackgroundImageURL").value = ""; this.updateBackground("") }}>Reset</button>
                </InputGroup> */}


            </div >
        )
    }
}

export default EditHeader;