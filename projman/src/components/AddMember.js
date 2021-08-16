import React, { useState } from "react";
import { Container, Form, Modal, Col, Button } from "react-bootstrap";
import Send from "./Send";
import "./AddMember.css";

export default function AddMember(props) {
  const [show, setShow] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function handleSubmit() {
    var obj = {
      project: props.project,
      name: name,
      email: email,
      role: role,
      tasks: [],
      special: [],
    };

    sendToBackend(obj);
    handleClose();
  }

  function sendToBackend(obj) {
    Send(obj, "member", "none");
    console.log(obj);
    console.log("adding new member to" + props.project);
  }

  return (
    <Container>
      <Button onClick={handleShow} style={{ margin: "20px auto 20px auto" }} className="submit-button">
        Add Member
      </Button>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        className="modal-container"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add a New Member</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail" className="input-container">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name of the Member"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword" className="input-container">
              <Form.Label>Role</Form.Label>
              <Form.Control
                type="text"
                placeholder="Specify the Role"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email-ID"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            className="submit-button"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
