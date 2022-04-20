import Card from 'react-bootstrap/Card';
import React from 'react';
import ReactPlayer from "react-player"


class TwitchTile extends React.Component {
    constructor() {
        super();
        this.state = {
            streamer: ""
        }
    }


    updateStreamer = () => {
        const updatedStreamer = document.getElementById("streamer").value;
        this.setState({ streamer: updatedStreamer });
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.updateStreamer(this.value)
        }
    }

    render() {

        return (
            <Card className='Card' style = {{backgroundColor: '#8838ff'}}>
                <Card.Body>
                    <Card.Title style = {{color: 'black'}}>Twitch&ensp;
                        <input size = "15" id="streamer" placeholder="Streamer" onKeyPress={this.handleKeyPress} />
                    </Card.Title>
                    <ReactPlayer className="TwitchPlayer"
                        url={`https://www.twitch.tv/${this.state.streamer}`}
                        controls="true"
                        playing="true"
                        width="100%"
                        height="100%"
                    />
                </Card.Body>
            </Card>

        );
    }
}

export default TwitchTile;