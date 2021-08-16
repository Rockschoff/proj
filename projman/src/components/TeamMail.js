import React from "react";
import { Button, Modal, Container, Form } from "react-bootstrap";
import DatePicker from "react-date-picker";
import TimePicker from "react-time-picker";
import "./AddMember.css";
import "./TeamMail.css";

function TeamMail() {
  const [show, setShow] = React.useState(false);
  const [subject, setSubject] = React.useState("");
  const [body, setBody] = React.useState("");
  const [meeting, setMeeting] = React.useState("");
  const [date, setDate] = React.useState("");
  const [time, setTime] = React.useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = () => {
    console.log(date);
    console.log(time);
  };

  return (
    <Container>
      <Button onClick={handleShow} className="mail-button">Mail to Team</Button>
      <Modal show={show} onHide={handleClose} size="lg" className="modal-container">
        <Modal.Header closeButton>
          <Modal.Title>Mail to the Team</Modal.Title>
        </Modal.Header>
        <Form>
          <Form.Group controlId="formGridPassword" className="input-container">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Task Name"
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1" className="input-container">
            <Form.Label>Mail Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              onChange={(e) => {
                setBody(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox" className="input-container">
            <Form.Check
              type="checkbox"
              label="Set a team-meeting?"
              onChange={(e) => {
                setMeeting(!meeting);
              }}
            />
          </Form.Group>
          <div style={meeting ? { display: "block" } : { display: "none" }}>
            <Form.Group controlId="formGridPassword" className="input-container">
              <Form.Label>Schedule Date</Form.Label>
              <DatePicker onChange={setDate} value={date} />
            </Form.Group>
            <Form.Group controlId="formGridPassword" className="input-container">
              <Form.Label>Time</Form.Label>
              <TimePicker onChange={setTime} value={time} />
            </Form.Group>
          </div>
        </Form>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleSubmit} className="submit-button">
            Send Mail
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default TeamMail;
