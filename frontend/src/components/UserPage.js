import React from 'react';
import Tile from './tiles/TileContainer'
import Button from 'react-bootstrap/Button'
import FormCheck from 'react-bootstrap/FormCheck'
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
            canEdit: false,
            snapToGrid: true,
            canPick: false,
            r: 255,
            g: 255,
            b: 255,
            a: 1,
        }
    }

    moveTile = async (tileId, x, y) => {
        await axios.post("http://localhost:5001/u/moveTile", {
            userId: this.props.user._id,
            tileId: tileId,
            x: x,
            y: y
        });
    }

    removeTile = async (tileId) => {
        const response = await axios.delete(`http://localhost:5001/u/${this.props.user._id}/${tileId}`);
        if (response) {
            this.props.user.tiles = this.props.user.tiles.filter((tile) => {
                return tile._id !== tileId;
            });
            // let elem = document.getElementById(tileId);
            // console.log(elem);
            // elem.remove();
            this.props.updateUser(this.props.user);
        }
    }

    updateColor = (updatedColor) => {
        this.setState({ r: updatedColor.r, g: updatedColor.g, b: updatedColor.b, a: updatedColor.a });
    }
    toggleEdit = () => {
        this.setState({ canEdit: !this.state.canEdit });
    }

    togglePicker = () => {
        this.setState({ canPick: !this.state.canPick });
    }

    toggleSnap = () => {
        this.setState({ snapToGrid: !this.state.snapToGrid });
    }

    render() {
        if (!this.props.user || !this.props.user.tiles) return (<SignIn updateUser={this.props.updateUser} />);

        document.title = `${this.props.user.name}'s Personal Homepage`;

        return (
            //click toggle edit
            //show color Button
            //show picker

            <>
                <button className="Edit" onClick={() => this.toggleEdit()}>EDIT</button>
                {this.state.canEdit &&
                    <FormCheck className="toggle" type="switch" onChange={() => this.toggleSnap()} />
                }
                {this.state.canEdit &&
                    <Button onClick={() => this.togglePicker()}>Color Picker</Button>
                }
                {this.state.canEdit &&
                    <Button onClick={() => this.props.addTile()}>Add Tile</Button>
                }
                {this.state.canPick &&
                    <Accordion className="w-25 p-3" defaultActiveKey="0" >
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Color Button</Accordion.Header>
                            <Accordion.Body>
                                <RgbaColorPicker color={{ r: this.state.r, g: this.state.g, b: this.state.b, a: this.state.a }} onChange={this.updateColor} />
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                }

                <div>
                    Current color is {this.state.r}, {this.state.g}, {this.state.b}, {this.state.a}
                </div>

                {this.props.user.tiles.map((tile) => {
                    return (
                        <Tile key={tile._id} {...tile}
                            deleteTile={this.removeTile}
                            moveTile={this.moveTile}
                            canEdit={this.state.canEdit}
                            snapToGrid={this.state.snapToGrid}
                        />
                    );
                })
                }
            </>
        );
    }
}

export default UserPage;