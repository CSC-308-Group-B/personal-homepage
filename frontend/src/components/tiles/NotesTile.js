import Card from "react-bootstrap/Card";
import React from "react";
import axios from "axios";
import { backendURL } from "../../App.js";

class NotesTile extends React.Component {
    constructor(props) {
        //props
        super(props);

        this.handleChange = this.handleChange.bind(this);
        // console.log(this.props);
        //state. json object no equals
        this.state = {
            text: (this.props.data && this.props.data.text) || "",
        };
    }

    handleChange = async (event) => {
        let string = event.target.value;
        if (string === this.state.text) {
            return;
        }

        const response = await axios.post(
            `${backendURL}/updateNoteText`,
            {
                tileId: this.props._id,
                text: string,
            },
            { withCredentials: true }
        );

        if (response) this.setState({ text: string });
        // console.log(event.target.value);
    };

    //   handleSubmit(event) {
    //     alert('You said this: ' + this.state.value);
    //     const{field1} = this.state;
    //     const output = [{field1}];

    //     this.setState({
    //         credentials: true
    //     });

    //     event.preventDefault();
    //   } no dont do it you fool

    //Tile will have on and off triggger by click

    render() {
        return (
            <div
                className="noteTile"
                style={{
                    backgroundColor: `rgba(${this.props.tileColor.r}, ${this.props.tileColor.g}, ${this.props.tileColor.b}, ${this.props.tileColor.a})`,
                }}
            >
                {/* // <Card className="Card">
            //     <Card.Body className="noteBody">
            //         <Card.Title>Note</Card.Title> */}

                <textarea
                    defaultValue={this.state.text}
                    onBlur={this.handleChange}
                />

                {/* <form onSubmit={this.handleSubmit} className = "bruhNote">
                    <label className = "noteLabel">
                        Your Note:
                        <textarea classname="noteTextarea" name="field1"
                         placeholdervalue={this.state.value} onBlur={this.handleChange} />
                    </label>
                    <input className="ipadKid" type="submit" value="enter" />
                     </form> 

                    <Card.Text>pulled from array</Card.Text>
                </Card.Body>
            </Card> */}
            </div>
        );
    }

    //font size, font bold
}

export default NotesTile;
