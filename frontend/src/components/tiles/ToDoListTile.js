import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import React from "react";
import ToDoListItem from "./ToDoListItem";
import axios from "axios";

class ToDoListTile extends React.Component {
    constructor(props) {
        //props
        super(props);
        //creating the ref and binding is for getting the text input value
        this.textInputRef = React.createRef();
        this.getTextInput = this.getTextInput.bind(this);
        this.clearTextInput = this.clearTextInput.bind(this);
        //state
        this.state = {
            tasks: this.props.list || [],
        };
    }

    getTextInput() {
        return this.textInputRef.current.value;
    }

    clearTextInput() {
        this.textInputRef.current.value = "";
    }

    addTask = async () => {
        //create the new task object
        const newTask = {
            text: this.getTextInput(),
            status: 0,
        };
        if (newTask.text === "") return;
        //and try adding it to the backed
        const response = await axios.post(
            `${process.env.REACT_APP_BE_URL}/addToDoItem`,
            {
                userId: this.props.userId,
                tileId: this.props._id,
                tile: newTask,
            },
            { withCredentials: true }
        );
        //if we get a response...
        if (response && response.status === 200) {
            //and it's valid, add it to our list and update state to rerender
            if (this.state.tasks) {
                this.state.tasks.push(response.data);
            }
            this.setState({ tasks: this.state.tasks });
            //also clear the input
            this.clearTextInput();
        } else {
            //otherwise, log the error to the console
            console.log("Failed to add task.");
        }
    };

    deleteTask = async (itemId) => {
        //send the delete request
        const response = await axios.delete(
            `${process.env.REACT_APP_BE_URL}/removeToDoItem`,
            {
                data: {
                    userId: this.props.userId,
                    tileId: this.props._id,
                    itemId: itemId,
                },
                withCredentials: true,
            }
        );
        //if we get a response...
        if (response && response.status === 204) {
            //for a valid response, filter out the deleted item and update our state
            this.state.tasks = this.state.tasks.filter((item) => {
                return item._id !== itemId;
            });
            this.setState({ tasks: this.state.tasks });
        } else {
            //otherwise, log the error to the console
            console.log("Failed to delete task: ", response);
        }
    };

    updateTaskStatus = async (itemId, newTaskStatus) => {
        //send the delete request
        const response = await axios.post(
            `${process.env.REACT_APP_BE_URL}/updateToDoItem`,
            {
                userId: this.props.userId,
                tileId: this.props._id,
                itemId: itemId,
                status: newTaskStatus,
            },
            { withCredentials: true }
        );
        //if we get a response...
        if (response && response.status === 200) {
            //for a valid response, update the item and update our state
            for (let task of this.state.tasks) {
                if (task._id === itemId) task.status = newTaskStatus;
            }
            this.setState({ tasks: this.state.tasks });
        } else {
            //otherwise, log the error to the console
            console.log("Failed to update task.");
        }
    };

    render() {
        return (
            <Card
                className="Card"
                style={{
                    backgroundColor: `rgba(${this.props.tileColor.r}, ${this.props.tileColor.g}, ${this.props.tileColor.b}, ${this.props.tileColor.a})`,
                }}
            >
                <Card.Body>
                    <div>
                        <Card.Title className = "ToDoListTitle">To Do</Card.Title>
                        <InputGroup className="ToDoInputGroup">
                            <input
                                className="input"
                                placeholder="  new task"
                                ref={this.textInputRef}
                            ></input>
                            <button onClick={() => this.addTask()}>Add</button>
                        </InputGroup>
                        <ListGroup className="taskItems">
                            {this.state.tasks &&
                                this.state.tasks.map((task) => {
                                    return (
                                        <ToDoListItem
                                            key={task._id}
                                            {...task}
                                            deleteTask={this.deleteTask}
                                            updateTaskStatus={
                                                this.updateTaskStatus
                                            }
                                        />
                                    );
                                })}
                        </ListGroup>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default ToDoListTile;
