import React from 'react';
import Tile from './tiles/Tile'
import Button from 'react-bootstrap/Button'
import SignIn from './SignIn';
import axios from 'axios';
import { HexColorPicker, RgbaColorPicker } from "react-colorful";
import Dropdown from 'react-bootstrap/Dropdown'
import Accordion from 'react-bootstrap/Accordion'
import AccordionBody from 'react-bootstrap/esm/AccordionBody';


class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            r: 255,
            g: 255,
            b: 255,
            a: 1,
        };
    }

    removeTile = async (tileId) => {
        const response = await axios.delete(`http://localhost:5000/u/${this.props.user._id}/${tileId}`);
        if (response) {
            this.props.user.tiles = this.props.user.tiles.filter((tile) => {
                return tile._id !== tileId;
            });
            this.props.updateUser(this.props.user);
            this.forceUpdate();
        }
    }
    updateColor = (updatedColor) => {
        this.setState({ r: updatedColor.r, g: updatedColor.g, b: updatedColor.b, a: updatedColor.a });
    }

    render() {
        if (!this.props.user || !this.props.user.tiles) return (<SignIn updateUser={this.props.updateUser} />);

        document.title = `${this.props.user.name}'s Personal Homepage`;

        return (
            <>
                <Button className="Button" onClick={() => this.props.addTile()}>Add Tile</Button>
                <div>
                    Current color is {this.state.r}, {this.state.g}, {this.state.b}, {this.state.a}
                </div>
                <Accordion className="w-25 p-3" defaultActiveKey="0" >
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Color Button</Accordion.Header>
                        <Accordion.Body>
                            <RgbaColorPicker color={{ r: this.state.r, g: this.state.g, b: this.state.b, a: this.state.a }} onChange={this.updateColor} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>


                {this.props.user.tiles.map((tile, index) => {
                    return (
                        <Tile key={index} {...tile} deleteTile={this.removeTile} />
                    );
                })}
            </>

        );
    }
}

export default UserPage;