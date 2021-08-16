import React from 'react'
import {Card  ,Button} from "react-bootstrap"

export default function TaskCard(props) {
    function removeTask(){
        console.log("we will remove task - " + props.task.heading);
        console.log("which was assigned to : " , props.member.name)
    }
    return (
        <div style = {{
            
        }}>
            <Card style={props.task.urgent?{ width: '18rem' , backgroundColor : "lightPink" } : {width : "18rem" , backgroundColor : "#80aaff"}}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
                <Card.Title>{props.task.heading}</Card.Title>
                <Card.Text>
                {props.task.description}
                </Card.Text>
                {/* <Card.Text>People Working : {" " + props.task.working}</Card.Text> */}
                {/* <ListGroup>
                    <ListGroup.Item>Extra Note 1 jwejoije ewij  we ijowe oiweo</ListGroup.Item>
                    <ListGroup.Item>Extra Note 1 jwejoije ewij  we ijowe oiweo</ListGroup.Item>
                    <ListGroup.Item>Extra Note 1 jwejoije ewij  we ijowe oiweo</ListGroup.Item>
                </ListGroup> */}
                <Card.Text><b>Assigned on : {" " + props.task.assigned}</b></Card.Text>
                <Card.Text><b>deadline on : {" " + props.task.deadline}</b></Card.Text>
                <Button size="sm">Edit</Button>
                <Button size="sm" onClick={removeTask}>Remove Task</Button>
            </Card.Body>
            </Card>
        </div>
    )
}
