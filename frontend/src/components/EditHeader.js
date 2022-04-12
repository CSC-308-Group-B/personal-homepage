import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import FormCheck from 'react-bootstrap/FormCheck'
import InputGroup from "react-bootstrap/InputGroup";
import { HexColorPicker } from "react-colorful";
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Button from 'react-bootstrap/Button'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'


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
        let classname = 'topnav';

        if (this.props.canEdit) {
          classname += ' canEdit';
        }

        return (
            // <div className={classes}>

            //     <Tabs defaultActiveKey="tiles" id="uncontrolled-tab-example" className="mb-3">
            //         <Tab eventKey="tiles" title="Tiles">
            //             <div>
            //                 <p className = 'd-inline-block'>Grid Snapping&nbsp;</p>                   
            //                 <BootstrapSwitchButton className="ml-4" checked={true} onChange={() => this.props.toggleSnap()} size = 'sm' />
            //             </div>
            //             <Dropdown.Item onClick={() => this.props.addTile("ToDoListTile")}>Todo List</Dropdown.Item>
            //             <Dropdown.Item onClick={() => this.props.addTile("BookmarksTile", { width: 2 })}>Bookmarks</Dropdown.Item>
            //             <Dropdown.Item onClick={() => this.props.addTile("SearchBarTile", { width: 2 })}>Search Bar</Dropdown.Item>
            //             <Dropdown.Item onClick={() => this.props.addTile("GradesTile")}>Grades</Dropdown.Item>
            //             <Dropdown.Item onClick={() => this.props.addTile("UpcomingAssignmentsTile")}>Assignments</Dropdown.Item>
            //             <Dropdown.Item onClick={() => this.props.addTile("OtherTileString")}>(Other type)</Dropdown.Item>
            //         </Tab>
            //         <Tab eventKey="color" title="Color">
            //             <HexColorPicker className="my-2" color={this.state.color} onChange={this.updateColor} />

            //             <div className="colorSwab my-2" style={{ borderColor: this.state.color }}>
            //                 Color: {this.state.color}
            //             </div>

            //             <InputGroup>
            //                 <input id="inputBackgroundImageURL" value={this.props.backgroundImage} onChange={() => this.updateBackground(this.value)} />
            //                 <button onClick={() => { document.getElementById("inputBackgroundImageURL").value = ""; this.updateBackground("") }}>Reset</button>
            //             </InputGroup>
            //         </Tab>
            //     </Tabs>
            // </div >
            <div>
                  <div className={classname}>
                    <div class="dropdown" className="headers">
                      <a className="dropbtn" href="/#">ADD</a>
                      <div className="dropdown-content">
                        <a href="/#" onClick={() => this.props.addTile("ToDoListTile")}>Todo List</a>
                        <a href="/#" onClick={() => this.props.addTile("BookmarksTile", { width: 2 })}>Bookmarks</a>
                        <a href="/#" onClick={() => this.props.addTile("SearchBarTile", { width: 2 })}>Search Bar</a>
                        <a href="/#" onClick={() => this.props.addTile("GradesTile")}>Grades</a>
                        <a href="/#" onClick={() => this.props.addTile("UpcomingAssignmentsTile")}>Assignments</a>
                        <a href="/#" onClick={() => this.props.addTile("OtherTileString")}>(Other type)</a>
                      </div>
                    </div>
                    <div class="dropdown" className="headers">
                    <a className="dropbtn" href="/#">COLOR</a>
                      <div class="dropdown-content">
                        <div className="colorTab">
                          <HexColorPicker className="colorPicker" color={this.state.color} onChange={this.updateColor} />
                          <input className="backgroundPicker" id="inputBackgroundImageURL" value={this.props.backgroundImage} onChange={() => this.updateBackground(this.value)} />
                          <button onClick={() => { document.getElementById("inputBackgroundImageURL").value = ""; this.updateBackground("") }}>Reset</button>
                        </div>
                      </div>
                    </div>
                  </div>           
            </div>
        )
    }
}

export default EditHeader;