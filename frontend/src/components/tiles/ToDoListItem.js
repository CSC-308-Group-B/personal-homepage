import ListGroup from "react-bootstrap/ListGroup";
import FormCheck from "react-bootstrap/FormCheck";
import React from "react";
import CloseButton from "react-bootstrap/esm/CloseButton";

class ToDoListItem extends React.Component {
    itemClosed = (event) => {
        if (event.target.className.includes("ToDoListCloseButton"))
            this.props.deleteTask(this.props._id);
    };

    itemClicked = (event) => {
        if (event.target.className.includes("ToDoListCloseButton")) return;
        if (this.props.status === 0) this.props.finishTask(this.props._id);
        if (this.props.status === 1) this.props.redoTask(this.props._id);
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
                <CloseButton
                    className="ToDoListCloseButton"
                    onClick={this.itemClosed}
                ></CloseButton>
                {/* <FormCheck onChange={this.itemChecked} className="checkbox" /> */}
            </ListGroup.Item>
        );
    }
}

export default ToDoListItem;
