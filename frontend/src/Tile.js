import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styling/App.scss';

function Tile(props) {

    return (
        <Card style={{ width: '100%', color: 'black', 'grid-area': `auto / auto / span ${props.height} / span ${props.width}` }}>
            <Card.Body>
                <Card.Title>Hello!</Card.Title>
                <Card.Text>
                    I am a "{props.tileType}" Tile, with a width of {props.width} and a height of {props.height}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Tile;