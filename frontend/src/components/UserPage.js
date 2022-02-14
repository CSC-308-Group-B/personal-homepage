import React from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import Tile from './tiles/Tile'
import Button from 'react-bootstrap/Button'
import SignIn from './SignIn';
import axios from 'axios';

class UserPage extends React.Component {

    constructor(props) {
        super(props);
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

    render() {
        if (!this.props.user || !this.props.user.tiles) return (<SignIn updateUser={this.props.updateUser} />);
        return(
            <>
                <Button onClick={() => this.props.addTile()}>Add Tile</Button>
                <Container fluid="xl" className="p-3">
                    <Row className="g-3">
                        {this.props.user.tiles.map((tile, index) => { 
                            return (
                                <Col className={`tile-index-${index}`} key={index} xs={12} sm={tile.width * 6} md={tile.width * 4} lg={tile.width * 3}>
                                    <Tile {...tile} removeTile={this.removeTile} />
                                </Col>
                            );
                        })}
                    </Row>
                </Container>
            </>
            
        );
    }
}

export default UserPage;