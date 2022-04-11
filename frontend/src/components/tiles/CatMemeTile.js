import Card from "react-bootstrap/Card";
import React from 'react';
import axios from "axios";


class SearchBarTile extends React.Component {

    constructor(){
        super();
        this.state = {url: ""};
    }

    componentDidMount() {
        axios
            .get("https://api.thecatapi.com/v1/images/search?mime_types=gif")
            .then((response) => this.loadImage(response));
    }

    loadImage = async (response) => {
        if (response) {
            this.setState({imageURL: response.data[0].url});
        }
        // this.setState({imageURL: ""});
    }

    render() {
        return (
            <Card className='Card'>
                <Card.Img src={this.state.imageURL} />
            </Card>
        );
    }
}

export default SearchBarTile;
