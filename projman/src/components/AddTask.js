import React , {useState} from 'react'
import { Container, Modal , Form , Button} from "react-bootstrap"
import DatePicker from "react-date-picker"
import Send from "./Send"

export default function AddTask(props) {

    const [show, setShow] = useState(false);
    const [start , setStart] = useState(new Date());
    const [deadline , setDeadline] = useState(new Date());
    const [heading , setHeading] = useState("");
    const [description , setDescription] = useState("");
    const [urgent , setUrgent] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function handleSubmit(){
        var obj = {
            member : props.member._id,
            project : props.projectId,
            heading : heading,
            description : description,
            urgent : urgent,
            assigned : start,
            deadline : deadline,
            
        }

        sendToBackend(obj);
        handleClose()
    }

    function sendToBackend(obj){
        Send(obj , "task");
        console.log(obj);
        console.log("creating project in the backend");
    }

    
    return (
        <Container>
            <Button onClick={handleShow}>Add Task</Button>
            <Modal show={show} onHide={handleClose} size="lg">
                <Modal.Header closeButton>
                <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Form >
                    
                    <Form.Group  controlId="formGridPassword">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control type="text" placeholder="Task Name"  onChange={(e)=>{setHeading(e.target.value)}} />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Example textarea</Form.Label>
                        <Form.Control as="textarea" rows={3} onChange={(e)=>{setDescription(e.target.value)}} />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Check me out" onChange={(e)=>{setUrgent(!urgent)}} />
                    </Form.Group>
                    <Form.Group  controlId="formGridPassword">
                    <Form.Label>Start Date</Form.Label>
                    <DatePicker onChange={setStart} value = {start}/>
                    </Form.Group>
                    <Form.Group  controlId="formGridPassword">
                    <Form.Label>Deadline</Form.Label>
                    <DatePicker onChange={setDeadline} value = {deadline}/>
                    </Form.Group>
                </Form>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Save Changes
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}
