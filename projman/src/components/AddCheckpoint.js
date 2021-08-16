import React , {useState} from 'react'
import {Modal , Form , Button  , ListGroup , Col} from "react-bootstrap"
import Send from "./Send"
import "./AddCheckpoint.css";

export default function AddCheckpoint(props) {
    
    const [show, setShow] = useState(false);

    const [point , setPoint] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function handleSubmit(){
        var obj = {
            type : "checkpoint",
            project : props.project,
            checkpoint : point
        }

        sendToBackend(obj);
        handleClose()
    }

    function sendToBackend(obj){
        Send(obj , "checkpoint"  , "none");
        console.log(obj);
        console.log("adding new member to" + props.project);
    }

    
    return (
        <div className="checkpt-container">
            {/* <ListGroup.Item variant="primary" onClick={handleShow}>Add Description</ListGroup.Item> */}
            <Button variant="primary" onClick={handleShow} className="submit-button desc-button">Add Description</Button>
            <Modal show={show} onHide={handleClose} size="lg" className="modal-container">
                <Modal.Header closeButton>
                <Modal.Title>Project Description</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please add the project description</Modal.Body>
                <Form >
                    
                    <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Control type="textarea" onChange={(e)=>{setPoint(e.target.value)}} />
                    </Form.Group>
                    
                </Form>
                <Modal.Footer>
                <Button variant="danger" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit} className="submit-button">
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
