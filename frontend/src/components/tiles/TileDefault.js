import Card from 'react-bootstrap/Card';

function TileDefault(props) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>{ props.tileType }</Card.Title>
                <Card.Text>
                    { JSON.stringify(props) }
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default TileDefault;