import Tile from './tiles/Tile'
import {Container, Row, Col} from 'react-bootstrap'

function UserPage(props) {
    return (
        <Container fluid="true" className="p-3">
            <Row className="g-3">
                {props.tiles.map((tile, index) => { 
                    return (
                        <Col className={`tile-index-${index}`} xs={12} sm={tile.width * 6} md={tile.width * 4} lg={tile.width * 3}>{ Tile(tile) }</Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default UserPage;