import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';

class UpcomingAssignmentsTile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            student: { name: 'student' },
            assignments: [{ name: 'assignments' }]
        }
    }


    componentDidMount() {
        axios.get('http://localhost:5001/canvas/self')
            .then(response => this.setStudent(response.data));

        axios.get('http://localhost:5001/canvas/upcomingassignments')
            .then(response =>
                this.setAssignments(response.data)
            )
    }

    setStudent = (newStudent) => {
        this.setState({ student: newStudent })
    }

    setAssignments = (newCourses) => {
        this.setState({ assignments: newCourses })
    }

    getCanvasUser = async () => {
        return await axios.get(`http://localhost:5001/canvas/self`);
    }

    render() {
        return (
            <Card className='Card'>
                <Card.Body>
                    <Card.Title className="d-flex justify-content-between">
                        {this.state.student.name.substring(0, this.state.student.name.indexOf(" ")) + "'s Assignments"}
                        <img className="small-icon" src={require("../../styling/img/Canvas_Bug_Color_RGB.png")} />
                    </Card.Title>
                    <ListGroup>
                        {
                            this.state.assignments.map((container, index) => {
                                
                                if ("assignment" in container) {

                                    var date = new Date(container.assignment.all_dates[0].due_at);
                                    console.log(date.toString());

                                    return (
                                        <ListGroup.Item key={container.assignment.id}>
                                            <p>{container.assignment.name}</p>
                                            {date.toLocaleTimeString('en-US', {month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </ListGroup.Item>

                                    );
                                }
                            })
                        }
                    </ListGroup>
                </Card.Body>
            </Card>
        );
    }
}

export default UpcomingAssignmentsTile;
