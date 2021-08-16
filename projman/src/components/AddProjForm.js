import { faWindows } from "@fortawesome/free-brands-svg-icons";
import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Modal,
  Col,
  Tooltip,
  OverlayTrigger,
} from "react-bootstrap";
import DatePicker from "react-date-picker";
import Send from "./Send";
import "./AddProjForm.css";

export default function AddProjForm(props) {
  const [show, setShow] = useState(false);
  const [start, setStart] = useState(new Date());
  const [deadline, setDeadline] = useState(new Date());
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [duration, setDuration] = useState("");
  const [showForm, setShowForm] = useState({ display: "true" });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function handleSubmit() {
    console.log(duration);
    var obj = {
      name: name,
      org: org,
      link: "",
      start: start.toString(),
      deadline: deadline.toString(),
      members: [],
      checkpoints: [],
      special: [],
      status: "Ongoing",
      duration: duration,
      totalExports: 10,
    };

    sendToBackend(obj);
    setShowForm({ display: "false" });
    handleClose();
    window.location.reload();
  }

  function sendToBackend(obj) {
    Send(obj, "project", props.user);
    console.log(obj);
    console.log("creating project in the backend");
  }

  return (
    <Container style={{ justifyContent: "center" }}>
      <Button onClick={handleShow} className="addButton">
        Add a New Project
      </Button>
      <Modal show={show} onHide={handleClose} size="lg" className="modal-container">
        <Modal.Header closeButton>
          <Modal.Title>Add A New Project</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please add the relevant details</Modal.Body>
        <div style={showForm}>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridEmail" className="input-container">
                <Form.Label>Project Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridPassword" className="input-container">
                <Form.Label>Organization</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Org. name"
                  onChange={(e) => {
                    setOrg(e.target.value);
                  }}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row className="date-container">
            <Form.Group controlId="formGridPassword">
              <Form.Label>Start Date</Form.Label>
              <DatePicker onChange={setStart} value={start} />
            </Form.Group>
            <Form.Group controlId="formGridPassword">
              <Form.Label>Valid Upto</Form.Label>
              <DatePicker onChange={setDeadline} value={deadline} />
            </Form.Group>
            </Form.Row>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Duration of the Project</Form.Label>
              <Form.Control
                type="text"
                placeholder="(Ex : 60s)"
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </div>
        {() => {
          if (showForm == { display: "false" }) {
            return <h2>Please wait as set up the sheet in the back end</h2>;
          }
        }}
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose} className="close-button">
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit} className="submit-button">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
