import Card from "react-bootstrap/Card";
import React from "react";

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
                <Card.Body className="noteBody">
                    <Card.Title>Note joaassdf mama</Card.Title>
                <form onSubmit={this.handleSubmit} className = "bruhNote">
                    <label className = "noteLabel">
                        jo mama dont even start:
                        <textarea classname="noteTextarea" value={this.state.value} onChange={this.handleChange} />
                        {/* <input type="text" value={this.state.value} onChange={this.handleChange} /> */}
                    </label>

                    <input className="ipadKid" type="submit" value="HAHAHAHA click me" />
                </form>
                </Card.Body>
            </Card>
        );
    }
}

export default NotesTile;
