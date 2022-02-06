import Card from 'react-bootstrap/Card';

function TileDefault(props) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Hello,</Card.Title>
                <Card.Text>
                    I am a default Tile, with width={props.width}.<br />
                    I was passed the tileType "{props.tileType}", which was not found.
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default TileDefault;