import Card from "react-bootstrap/Card";
import React from "react";
import axios from "axios";

class RandomImageTile extends React.Component {
    constructor() {
        super();
        this.state = {
            imageURL: "",
            strategy: "thecatapi-gif",
        };
    }

    componentDidMount() {
        switch (this.state.strategy) {
            case "thecatapi-gif":
                axios
                    .get(
                        "https://api.thecatapi.com/v1/images/search?mime_types=gif"
                    )
                    .then((r) => {
                        if (r) this.loadImage(r.data[0].url);
                    });
                break;
            case "picsum":
                this.loadImage("https://picsum.photos/1280/720");
                break;
            default:
                axios
                    .get(
                        "https://api.thecatapi.com/v1/images/search?mime_types=jpg"
                    )
                    .then((r) => {
                        if (r) this.loadImage(r.data[0].url);
                    });
                break;
        }
    }

    loadImage = async (url) => {
        if (url) {
            this.setState({ imageURL: url });
        }
    };

    render() {
        return (
            <div className="RandomImageTile">
                <img alt="..." src={this.state.imageURL} />
            </div>
        );
    }
}

export default RandomImageTile;
