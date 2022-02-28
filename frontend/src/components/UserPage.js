import React from 'react';
import Tile from './tiles/TileContainer'
import Button from 'react-bootstrap/Button'
import SignIn from './SignIn';
import axios from 'axios';

class UserPage extends React.Component {

     constructor(props) {
         super(props);
         this.state = {
             editMode: false
         }
     }

    moveTile = async (tileId, x, y) => {
        await axios.post("http://localhost:5001/u/moveTile", {
            userId: this.props.user._id,
            tileId: tileId,
            x: x,
            y: y
        });
    }

    removeTile = async (tileId) => {
        const response = await axios.delete(`http://localhost:5001/u/${this.props.user._id}/${tileId}`);
        if (response) {
            this.props.user.tiles = this.props.user.tiles.filter((tile) => {
                return tile._id !== tileId;
            });
            // let elem = document.getElementById(tileId);
            // console.log(elem);
            // elem.remove();
            this.props.updateUser(this.props.user);
        }
    }

    toggleEdit = () => {
        this.setState({ editMode: !this.state.editMode });
    }

    render() {
        if (!this.props.user || !this.props.user.tiles) return (<SignIn updateUser={this.props.updateUser} />);

        document.title = `${this.props.user.name}'s Personal Homepage`;

        return(
            <>
<<<<<<< HEAD
                <Button onClick={() => this.props.addTile()}>Add Tile yo brUH</Button>
=======
                <Button onClick={() => this.toggleEdit()}>EDIT</Button>
                <Button onClick={() => this.props.addTile()}>Add Tile</Button>
>>>>>>> 2b196839c58861f63678a0d429bbacb1554f0c0c
                {this.props.user.tiles.map((tile) => { 
                    return (
                        <Tile key={tile._id} {...tile} deleteTile={this.removeTile} moveTile={this.moveTile} canEdit={this.state.editMode} />
                    );
                })}
            </>
        );
    }

    

    
}

export default UserPage;