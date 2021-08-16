import React from 'react'
import Container from 'react-bootstrap/Container'
import Card from "react-bootstrap/Card"
import ListGroup from "react-bootstrap/ListGroup"
import AddCheckPoint from "./AddCheckpoint"
import "./CheckPointsList.css";
export default function CheckPointsList(props) {
    
    return (
        <div>
            <Container className="checkList-container">
            <AddCheckPoint project = {props.projectId}></AddCheckPoint>
            <Card className="card">
            <ListGroup variant="flush">
            <ListGroup.Item variant = "primary">Project Description</ListGroup.Item>
            
                {
                    props.checkpoints.map((point , key)=>{
                        return <ListGroup.Item>{point}</ListGroup.Item>

                    })
                }
                {/* <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item> */}
            </ListGroup>
            </Card>
            </Container>
        </div>
    )
}
