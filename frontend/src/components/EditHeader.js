import React from 'react';
import Button from 'react-bootstrap/Button'
import FormCheck from 'react-bootstrap/FormCheck'

import { HexColorPicker } from "react-colorful";

class EditHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "#ffffff"
        
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
                
                <FormCheck className ="my-2" label = {'Enable Tile Snapping'} type="switch" onChange={() => this.props.toggleSnap()} />

                <Button className ="my-2" onClick={() => this.props.addTile()}>Add Tile</Button>

                <HexColorPicker className ="my-2" color={ this.state.color } onChange={this.updateColor} />
                
                <div className = "colorSwab my-2" style={{borderColor: this.state.color}}>
                    Color: {this.state.color} 
                    </div>
            </div>
        )
    }
}

export default EditHeader;