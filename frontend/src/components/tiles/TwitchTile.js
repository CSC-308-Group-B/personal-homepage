import Card from "react-bootstrap/Card";
import React from "react";
import ReactPlayer from "react-player";
import axios from "axios";

class TwitchTile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            streamer: (this.props.data && this.props.data.streamerName) || "",
        };
    }

    updateStreamer = async (streamer) => {
        const response = await axios.post(
            `${process.env.REACT_APP_BE_URL}/setStreamerName`,
            { tileId: this.props._id, streamerName: streamer },
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
            <Card
                className="Card"
                style={{
                    backgroundColor: `rgba(${this.props.tileColor.r}, ${this.props.tileColor.g}, ${this.props.tileColor.b}, ${this.props.tileColor.a})`,
                }}
            >
                <Card.Body>
                    <Card.Title style={{ color: "black" }}>
                        <img
                            className="TwitchIcon"
                            alt="#"
                            src="https://www.freepnglogos.com/uploads/twitch-app-logo-png-3.png"
                        />
                        <input
                            className="TwitchSearch"
                            defaultValue={this.state.streamer}
                            size="15"
                            id="streamer"
                            placeholder="Streamer"
                            onKeyPress={this.handleKeyPress}
                        />
                    </Card.Title>

                    <ReactPlayer
                        className="TwitchPlayer"
                        url={`https://www.twitch.tv/${this.state.streamer}`}
                        // width="100%"
                        // height="100%"
                        playing={true}
                    />
                </Card.Body>
            </Card>
        );
    }
}

export default TwitchTile;
