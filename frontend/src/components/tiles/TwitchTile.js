import Card from "react-bootstrap/Card";
import React from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { backendURL } from "../../App.js";

class TwitchTile extends React.Component {
    constructor() {
        super();
        this.state = {
            streamer: "",
        };
    }

    updateStreamer = async (streamer) => {
        const response = await axios.post(
            `${backendURL}/setStreamerName`,
            {tileId: this.props._id, streamerName: streamer },
            { withCredentials: true }
        );

        if (response) {
            this.setState({ streamer: streamer });
        }
        
    };

    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            this.updateStreamer(event.target.value);
        }
    };

    

    render() {
        return (
            <Card className="Card" style={{ backgroundColor: "#8838ff" }}>
                <Card.Body>
                    <Card.Title style={{ color: "black" }}>
                        Twitch&ensp;
                        <input
                            size="15"
                            id="streamer"
                            placeholder="Streamer"
                            onKeyPress={this.handleKeyPress}
                        />
                    </Card.Title>

                    <ReactPlayer
                        className="TwitchPlayer"
                        url={`https://www.twitch.tv/${this.state.streamer}`}
                        width="100%"
                        height="100%"
                        playing={true}
                    />
                </Card.Body>
            </Card>
        );
    }
}

export default TwitchTile;
