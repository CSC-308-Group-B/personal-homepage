import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import React from "react";
import ToDoListItem from "./ToDoListItem";

class NotesTile extends React.Component {
    constructor(props) {
        //props
        super(props);

        this.state = {value: ''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        //state
        this.state = {
            tasks: this.props.list || [],
        };
    }

     handleChange(event) {
        this.setState({value: event.target.value});
    }

  handleSubmit(event) {
    alert('You said: ' + this.state.value);
    event.preventDefault();
  }

    render() {
        return (
            <Card className="Card">
                <Card.Body>
                    <Card.Title>Note jo mama</Card.Title>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        jo mama dont even start:
                        <textarea value={this.state.value} onChange={this.handleChange} />
                        {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
                    </label>

                    <input type="submit" value="HAHAHAHA click me" />
                </form>
                </Card.Body>
            </Card>
        );
    }
}

export default NotesTile;
