import React from 'react';
import Tile from './tiles/TileContainer'
import Button from 'react-bootstrap/Button'
import SignIn from './SignIn';
import axios from 'axios';
import EditHeader from './EditHeader';


class UserPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            canEdit: false,
            snapToGrid: false,
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
        this.setState({ canEdit: !this.state.canEdit });
    }

    toggleSnap = () => {
        this.setState({ snapToGrid: !this.state.snapToGrid });
    }

    render() {
        if (!this.props.user || !this.props.user.tiles) return (<SignIn updateUser={this.props.updateUser} />);

        document.title = `${this.props.user.name}'s Personal Homepage`;

        return (
            <>
                <EditHeader addTile = {this.props.addTile} toggleSnap = {this.toggleSnap} canEdit={this.state.canEdit} canPick={this.state.canPick} />

                <Button className="Edit" onClick={() => this.toggleEdit()}>EDIT</Button>

                <div className="tileDragArea">
                    {this.props.user.tiles.map((tile) => {
                        return (
                            <Tile
                                key={tile._id}
                                {...tile}
                                userId={this.props.user._id}
                                deleteTile={this.removeTile}
                                moveTile={this.moveTile}
                                canEdit={this.state.canEdit}
                                snapToGrid={this.state.snapToGrid}
                            />
                        );
                    })}
                </div>
            </>
        );
    }
}

export default UserPage;