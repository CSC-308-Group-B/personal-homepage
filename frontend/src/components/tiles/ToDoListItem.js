import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormCheck from "react-bootstrap/FormCheck";
import React from "react";

class ToDoListItem extends React.Component {
    itemChecked = (event) => {
        if (event.target.checked) {
            this.props.updateTask(this.props._id);
        } else {
            this.props.deleteTask(this.props._id);
        }
    }

    render () {
        return(
            <ListGroup.Item className="task">
                {this.props.text}
                <FormCheck onChange={this.itemChecked} defaultChecked = {this.props.status}
                className='checkbox'/>
            </ListGroup.Item>
        )
    }
}

export default ToDoListItem;