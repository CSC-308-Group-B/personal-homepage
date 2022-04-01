import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import FormCheck from 'react-bootstrap/FormCheck'

import { HexColorPicker } from "react-colorful";

class EditHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: this.props.color
        }
    }


    updateColor = (updatedColor) => {
        this.props.updateColor(updatedColor);
        this.setState({ color: updatedColor });
    }

    render() {        
        let classes = 'EditHeader';

        if (this.props.canEdit) {
            classes += ' editHeaderVis';
        }
        return (
            <div className={classes}>

                <h3>EDIT MODE</h3>
                
                <FormCheck className ="my-2" label = {'Snap Tiles to Grid'} type="switch" defaultChecked={true} onChange={() => this.props.toggleSnap()} />

                <DropdownButton className="my-2" title="Add Tile">
                    <Dropdown.Item onClick={() => this.props.addTile("ToDoListTile")}>Todo List</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.props.addTile("SearchBarTile")}>Search Bar</Dropdown.Item>
                    <Dropdown.Item onClick={() => this.props.addTile("OtherTileString")}>(Other type)</Dropdown.Item>
                </DropdownButton>

                <HexColorPicker className ="my-2" color={ this.state.color } onChange={this.updateColor} />
                
                <div className = "colorSwab my-2" style={{borderColor: this.state.color}}>
                    Color: {this.state.color} 
                    </div>
            </div>
        )
    }
}

export default EditHeader;