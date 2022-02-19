import Card from 'react-bootstrap/Card';
import React from 'react';

class DefaultTile extends React.Component{

    render() {
        return (
            <Card className='Card'>
                <Card.Body>
                <Card.Title>{this.props.tileType}</Card.Title>
                <Card.Text>
                    { JSON.stringify(this.props) }
                </Card.Text>
            </Card.Body>
            </Card>
        );
    }   
}

export default DefaultTile;