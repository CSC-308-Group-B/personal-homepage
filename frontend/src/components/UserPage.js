import Tile from './tiles/Tile'
import {Container, Row, Col} from 'react-bootstrap'

function UserPage(props) {
    const columnConversion = 3;
    return (
        <Container fluid="true" className="p-3">
            <Row className="g-3">
                {props.tiles.map((tile, index) => { 
                    return (
                        <Col className={`tile-index-${index}`} xs={{span: tile.width * columnConversion}}>{ Tile(tile) }</Col>
                    );
                })}
            </Row>
        </Container>
    );
}

export default UserPage;