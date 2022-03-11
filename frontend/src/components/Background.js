import React from 'react';
import Button from 'react-bootstrap/Button'
import FormCheck from 'react-bootstrap/FormCheck'
import { HexColorPicker } from "react-colorful";

class Background extends React.Component {

    render() {
        return (
            <div className="Background" style = {{backgroundColor: this.props.color}}/>
        );
    }
}

export default Background;