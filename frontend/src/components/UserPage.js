import React from 'react';
import Tile from './tiles/Tile'
import Button from 'react-bootstrap/Button'
import SignIn from './SignIn';
import axios from 'axios';

class UserPage extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    moveTile = async (tileId) => {
        //the x: 10 and y: 10 need to access the data-x and data-y attributes on the html element
        const response = await axios.post("http://localhost:5001/u/moveTile", {
            userId: this.props.user._id,
            tileId: tileId,
            x: 10,
            y: 10
        });
        console.log(response);
    }

    removeTile = async (tileId) => {
        const response = await axios.delete(`http://localhost:5001/u/${this.props.user._id}/${tileId}`);
        if (response) {
            this.props.user.tiles = this.props.user.tiles.filter((tile) => {
                return tile._id !== tileId;
            });
            this.props.updateUser(this.props.user);
            this.forceUpdate();
        }   
    }

    render() {
        if (!this.props.user || !this.props.user.tiles) return (<SignIn updateUser={this.props.updateUser} />);

        document.title = `${this.props.user.name}'s Personal Homepage`;

        return(
            <>
                <Button onClick={() => this.props.addTile()}>Add Tile</Button>
                {this.props.user.tiles.map((tile, index) => { 
                    return (
                        <Tile key={index} {...tile} deleteTile={this.removeTile} moveTile={this.moveTile} />
                    );
                })}
            </>
            
        );
    }
}

export default UserPage;