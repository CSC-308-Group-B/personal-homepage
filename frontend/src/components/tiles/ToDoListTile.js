import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormCheck from "react-bootstrap/FormCheck";
import React, {useState, useEffect} from 'react';
import ToDoListItem from "./ToDoListItem";
import axios from 'axios';

class ToDoListTile extends React.Component {

  constructor(props) {
    super(props);
    this.textInputRef = React.createRef();
    this.getTextInput = this.getTextInput.bind(this);
    this.state = {
        tasks: this.props.list,
    };
  }

  getTextInput() {
    return this.textInputRef.current.value;
  }

  addTask = async () => {
    const newTask = {
      text: this.getTextInput(),
      status: 0
    }
    const response = await axios.post(`http://localhost:5001/u/addToDoItem`, 
      {userId: this.props.userId, 
        tileId: this.props._id, 
        tile: newTask});
    if (response) {
        if (this.state.tasks) {
            this.state.tasks.push(response.data);
        }
        this.setState({tasks : this.state.tasks});
    } else {
        console.log("Failed to add task.");
    }
}

// deleteTask = async () => {

//   const response = await axios.delete(`http://localhost:5001/u/u/removeToDoItem`,
//   {
//     userId: this.props.userId,
//     tileId: this.props._id,
//     itemId: this.props.list._id
//   });

//   if (response) {
//       if (this.state.tasks) {
//           this.state.tasks.push(newTask);
//       }
//       this.setState({tasks : this.state.tasks});
//   } else {
//       console.log("Failed to delete task.");
//   }
// }

  render() {
    return (
      <Card className='Card'>
        <Card.Body>
          <Card.Title>To Do</Card.Title>
          <Card.Text>
            <InputGroup>
              <input className="inputbar" placeholder="new task" ref={this.textInputRef}></input>
              <button className='addTask' onClick={() => this.addTask()}>Add Task</button>
            </InputGroup>
            <ListGroup className="taskItems">
              {(this.state.tasks && this.props.list.map((task) => {
                return (
                  <ToDoListItem key={task._id} {...task}/>);}))}
            </ListGroup>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default ToDoListTile;
