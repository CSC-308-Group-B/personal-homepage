import Card from 'react-bootstrap/Card';
import React from 'react';

class TwitchTile extends React.Component {
    constructor() {
        super();
    }
    render() {
        return (
            <Card className='Card'>
                <Card.Body>
                    <Card.Title>Twitch</Card.Title>
                    <div>
                        <iframe
                            src="https://www.twitch.tv/"
                            frameborder="0"
                            scrolling="no"
                            allowFullScreen="true"
                            height="100%"
                            width="100%" />
                    </div>
                </Card.Body>
            </Card>

        );
    }
}

export default TwitchTile;