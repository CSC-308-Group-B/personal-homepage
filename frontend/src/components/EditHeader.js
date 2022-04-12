import React from 'react';
import { HexColorPicker } from "react-colorful";


class EditHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: this.props.color,
            backgroundImage: this.props.backgroundImage
        }
    }



    updateColor = (updatedColor) => {
        this.props.updateColor(updatedColor);
        this.setState({ color: updatedColor });
    }

    updateBackground = () => {
        const updatedBackground = document.getElementById("inputBackgroundImageURL").value;
        this.props.updateBackgroundImage(updatedBackground);
        this.setState({ backgroundImage: updatedBackground });
    }


    render() {
        let classname = 'topnav';

        if (this.props.canEdit) {
          classname += ' canEdit';
        }

        return (

            <div>
                  <div className={classname}>
                    <div class="dropdown" className="headers">
                      <a className="dropbtn" href="/#">ADD</a>
                      <div className="dropdown-content">
                        <a href="/#" onClick={() => this.props.addTile("ToDoListTile")}>Todo List</a>
                        <a href="/#" onClick={() => this.props.addTile("BookmarksTile", { width: 2 })}>Bookmarks</a>
                        <a href="/#" onClick={() => this.props.addTile("SearchBarTile", { width: 2 })}>Search Bar</a>
                        <a href="/#" onClick={() => this.props.addTile("GradesTile")}>Grades</a>
                        <a href="/#" onClick={() => this.props.addTile("UpcomingAssignmentsTile")}>Assignments</a>
                        <a href="/#" onClick={() => this.props.addTile("OtherTileString")}>(Other type)</a>
                      </div>
                    </div>
                    <div class="dropdown" className="headers">
                    <a className="dropbtn" href="/#">COLOR</a>
                      <div class="dropdown-content">
                        <div className="colorTab">
                          <HexColorPicker className="colorPicker" color={this.state.color} onChange={this.updateColor} />
                          <input className="backgroundPicker" id="inputBackgroundImageURL" value={this.props.backgroundImage} onChange={() => this.updateBackground(this.value)} />
                          <button onClick={() => { document.getElementById("inputBackgroundImageURL").value = ""; this.updateBackground("") }}>Reset</button>
                        </div>
                      </div>
                    </div>
                    <div class="dropdown" className="headers">
                    <a className="dropbtn" href="/#">TOGGLE</a>
                      <label class="switch">
                        <input type="checkbox" onChange={() => this.props.toggleSnap()}/>
                        <span class="slider round"></span>
                      </label>
                    </div>
                  </div>           
            </div>
        )
    }
}

export default EditHeader;