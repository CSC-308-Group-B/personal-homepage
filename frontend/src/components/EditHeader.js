import React from 'react';
import Button from 'react-bootstrap/Button'
import FormCheck from 'react-bootstrap/FormCheck'

import { RgbaColorPicker } from "react-colorful";

class EditHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            r: 255,
            g: 255,
            b: 255,
            a: 1,
        }
    }


    updateColor = (updatedColor) => {
        this.setState({ r: updatedColor.r, g: updatedColor.g, b: updatedColor.b, a: updatedColor.a });
        document.querySelector(".Background").style["background-color"] = `rgba(${this.state.r}, ${this.state.g}, ${this.state.b}, ${this.state.a})`
    }

    render() {
        
        let classes = 'EditHeader';

        if (this.props.canEdit) {
            classes += ' editHeaderVis';
        }
        return (
            // <Accordion className="" defaultActiveKey="0" >
            //     <Accordion.Item eventKey="0">
            //         {/* <Accordion.Header>Edit Mode</Accordion.Header> */}
            //         <Accordion.Body>
            //             <RgbaColorPicker color={{ r: this.state.r, g: this.state.g, b: this.state.b, a: this.state.a }} onChange={this.updateColor} />
            //         </Accordion.Body>
            //     </Accordion.Item>
            // </Accordion>
            <div className={classes}>

                <h3>EDIT MODE</h3>
                
                <FormCheck className ="my-2" label = {'Enable Tile Snapping'} type="switch" onChange={() => this.props.toggleSnap()} />

                <Button className ="my-2" onClick={() => this.props.addTile()}>Add Tile</Button>

                <RgbaColorPicker className ="my-2" color={{ r: this.state.r, g: this.state.g, b: this.state.b, a: this.state.a }} onChange={this.updateColor} />
                
                <div className = "colorSwab my-2" style={{borderColor: `rgba(${this.state.r}, ${this.state.g}, ${this.state.b}, ${this.state.a})`}}>Color: {this.state.r}, {this.state.g}, {this.state.b}, {this.state.a}, </div>
            </div>
        )
    }
}

export default EditHeader;