import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormCheck from "react-bootstrap/FormCheck";
import React from "react";

class ToDoListItem extends React.Component {


    render () {
        return(
            <ListGroup.Item className="task">
                {this.props.text}
                <FormCheck defaultChecked = {this.props.status}
                className='checkbox'/>
            </ListGroup.Item>
        )
    }
}

export default ToDoListItem;