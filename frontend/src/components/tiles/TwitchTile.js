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
                    <Card.Title></Card.Title>
                    <div>
                        <iframe
                            src="https://player.twitch.tv/?channel=xqcow&parent=localhost"
                            frameborder="0"
                            allowfullscreen="true"
                            scrolling="no"
                            height="720px"
                            width="100%">
                        </iframe>
                    </div>
                </Card.Body>
            </Card>

        );
    }
}

export default TwitchTile;