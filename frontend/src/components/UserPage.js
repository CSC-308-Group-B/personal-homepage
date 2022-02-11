import React, { useState, useEffect } from 'react';
import {Container, Row, Col} from 'react-bootstrap'
import Tile from './tiles/Tile'

import CloseButton from 'react-bootstrap/CloseButton';

class UserPage extends React.Component {

    constructor(props) {
        super(props);
        // const tiles = useState(props.tiles);
        //this.removeTile.bind(this, this.user);
    }




    removeTile = (tileId) => {
        this.props.user.tiles = this.props.user.tiles.filter((tile) => {
            return tile._id !== tileId;
        });
        this.props.updateUser(this.props.user);
        this.forceUpdate();


    }


    render() {
        return(
            <Container fluid="xl" className="p-3">
                <Row className="g-3">
                    {this.props.user.tiles.map((tile, index) => { 
                        return (
                            <Col className={`tile-index-${index}`} key={index} xs={12} sm={tile.width * 6} md={tile.width * 4} lg={tile.width * 3}>
                                <Tile {...tile} deleteTile={this.removeTile} />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
        );
    }
}

export default UserPage;