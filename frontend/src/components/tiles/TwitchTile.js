import Card from "react-bootstrap/Card";
import React from "react";
import ReactPlayer from "react-player";

const EMBED_URL = "https://embed.twitch.tv/embed/v1.js";

class TwitchTile extends React.Component {
    constructor() {
        super();
        this.state = {
            streamer: "magic",
        };
    }

    updateStreamer = () => {
        const updatedStreamer = document.getElementById("streamer").value;
        this.setState({ streamer: updatedStreamer });
    };

    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            this.updateStreamer(this.value);
            this.generatePlayer(this.state.streamer);
        }
    };

    generatePlayer(streamer) {
        let embed = window.Twitch.Embed(this.props.targetID, {
            width: "100%",
            height: "100%",
            channel: streamer,
            layout: "video",
            autoplay: true,
            parent: ["localhost"],
        });
        var player = embed.getPlayer();
        player.play();
    }

    componentDidMount() {
        let embed;
        const script = document.createElement("script");
        script.setAttribute("src", EMBED_URL);
        script.addEventListener("load", () => {
            embed = new window.Twitch.Embed(this.props.targetID, {
                width: "100%",
                height: "100%",
                channel: this.state.streamer,
                layout: "video",
                autoplay: true,
                parent: ["localhost"],
            });
        });
        var player = embed.getPlayer();
        player.play();
        document.body.appendChild(script);
    }

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

                    <div>
                        <div
                            className="TwitchPlayer"
                            id={this.props.targetID}
                        ></div>
                    </div>

                    {/* <ReactPlayer
                        className="TwitchPlayer"
                        url={`https://www.twitch.tv/${this.state.streamer}`}
                        width="100%"
                        height="100%"
                    /> */}
                </Card.Body>
            </Card>
        );
    }
}

TwitchTile.defaultProps = {
    targetID: "twitch-embed",
    width: "940",
    height: "480",
    channel: "",
};

export default TwitchTile;
