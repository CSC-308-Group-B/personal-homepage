import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import FormCheck from 'react-bootstrap/FormCheck'
import InputGroup from "react-bootstrap/InputGroup";
import { HexColorPicker } from "react-colorful";
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Button from 'react-bootstrap/Button'


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

                <Tabs defaultActiveKey="tiles" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="tiles" title="Tiles">
                        <Button  onClick={() => this.props.toggleSnap()}>Snap</Button>

                        <Dropdown.Item onClick={() => this.props.addTile("ToDoListTile")}>Todo List</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.props.addTile("BookmarksTile", { width: 2 })}>Bookmarks</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.props.addTile("OtherTileString")}>(Other type)</Dropdown.Item>
                    </Tab>
                    <Tab eventKey="color" title="Color">

                        <HexColorPicker className="my-2" color={this.state.color} onChange={this.updateColor} />

                        <div className="colorSwab my-2" style={{ borderColor: this.state.color }}>
                            Color: {this.state.color}
                        </div>

                        <InputGroup>
                            <input id="inputBackgroundImageURL" value={this.props.backgroundImage} onChange={() => this.updateBackground(this.value)} />
                            <button onClick={() => { document.getElementById("inputBackgroundImageURL").value = ""; this.updateBackground("") }}>Reset</button>
                        </InputGroup>
                    </Tab>
                </Tabs>


                {/* <div class="tab">
                    <button class="tablinks" onClick={() => visible(null, 'snap')}>Snap</button>
                    <button class="tablinks" onClick={() => visible(null, 'tiles')}>Tiles</button>
                    <button class="tablinks" onClick={() => visible(null, 'color')}>Color</button>
                </div>

                <div id="snap" class="tabcontent">
                    

                </div>

                <div id="tiles" class="tabcontent">
                    <Dropdown.Item onClick={() => this.props.addTile("ToDoListTile")}>Todo List</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.props.addTile("BookmarksTile", { width: 2 })}>Bookmarks</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.props.addTile("OtherTileString")}>(Other type)</Dropdown.Item>
                </div>

                <div id="color" class="tabcontent">
                    <HexColorPicker className="my-2" color={this.state.color} onChange={this.updateColor} />

                    <div className="colorSwab my-2" style={{ borderColor: this.state.color }}>
                        Color: {this.state.color}
                    </div>

                    <InputGroup>
                        <input id="inputBackgroundImageURL" value={this.props.backgroundImage} onChange={() => this.updateBackground(this.value)} />
                        <button onClick={() => { document.getElementById("inputBackgroundImageURL").value = ""; this.updateBackground("") }}>Reset</button>
                    </InputGroup>
                </div> */}




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