import ListGroup from "react-bootstrap/ListGroup";
import React from "react";
import CloseButton from "react-bootstrap/esm/CloseButton";

class ToDoListItem extends React.Component {
    // constructor(props) {
    //     //props
    //     super(props);
    //     this.state = {
    //         status: this.props.status || 0,
    //     };
    // }

    itemClosed = (event) => {
        if (event.target.className.includes("ToDoListCloseButton"))
            this.props.deleteTask(this.props._id);
    };

    itemClicked = (event) => {
        if (event.target.className.includes("ToDoListCloseButton")) return;
        this.props.updateTaskStatus(this.props._id, 1 - this.props.status);
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
