import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import InputGroup from "react-bootstrap/InputGroup";
import FormCheck from "react-bootstrap/FormCheck";
import React from "react";

class ToDoListTile extends React.Component {
  render() {
    return (
      <Card className='Card'>
        <Card.Body>
          <Card.Title>To Do</Card.Title>
          <Card.Text>
            <InputGroup>
              <input className="inputbar"></input>
              <button className='addTask'>Add Task</button>
            </InputGroup>
            <ListGroup className="taskItems">
              <ListGroup.Item className="task">
                Task 1<FormCheck className='checkbox'/>
              </ListGroup.Item>
              <ListGroup.Item className="task">
                Task 2<FormCheck className='checkbox'/>
              </ListGroup.Item>
              <ListGroup.Item className="task">
                Task 3<FormCheck className='checkbox'/>
              </ListGroup.Item>
            </ListGroup>
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default ToDoListTile;
