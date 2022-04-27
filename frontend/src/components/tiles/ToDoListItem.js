import ListGroup from "react-bootstrap/ListGroup";
import FormCheck from "react-bootstrap/FormCheck";
import React from "react";

class ToDoListItem extends React.Component {
    itemChecked = (event) => {
        if (event.target.checked) {
            this.props.deleteTask(this.props._id);
        }
    };

    itemClicked = (event) => {
        if (!event.target.checked) {
            if (this.props.status === 0) this.props.finishTask(this.props._id);
            if (this.props.status === 1) this.props.redoTask(this.props._id);
        }
    };

    render() {
        let taskClassName = "task";
        if (this.props.status === 1) taskClassName += " completed";

        return (
            <ListGroup.Item
                className={taskClassName}
                onClick={this.itemClicked}
            >
                {this.props.text}
                <FormCheck onChange={this.itemChecked} className="checkbox" />
            </ListGroup.Item>
        );
    }
}

export default ToDoListItem;
