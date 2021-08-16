import { checkPropTypes } from "prop-types";
import React from "react";
import {
  Button,
  Modal,
  Form,
  Dropdown,
  ButtonGroup,
  SplitButton,
  DropdownButton
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import DeleteSend from "./DeleteSend.js";
import EditSend from "./EditSend.js";
import DatePicker from "react-date-picker";
import "./ProjectEdit.css";

const EditModal = (props) => {
  const [data, setData] = React.useState({
    name: "#SAME",
    org: "#SAME",
    status: "#SAME",
    project: props._id,
  });
  const [name, setName] = React.useState("#SAME");
  const [org, setOrg] = React.useState("#SAME");
  const [duration, setDuration] = React.useState("#SAME");
  const [validity, setValidity] = React.useState(new Date(props.deadline));

  function editRequest() {
    console.log("sending the edit request of project");
    const obj = {
      name: name,
      org: org,
      duration: duration,
      deadline: validity.toString(),
      project: props._id,
    };

    EditSend(obj, "project");
  }

  return (
    <Modal
      show={props.showEdit}
      onHide={() => {
        props.setShowEdit(false);
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Please rewrite the quatities you wish to edit.
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h3>Current properties</h3>
        <ul>
          <li>Name : {props.name}</li>
          <li>org : {props.org}</li>
          <li>status : {props.duration}</li>
          <li>validity : {props.deadline}</li>
        </ul>
        <Form>
          <Form.Group controlId="formGridPassword" style={{ display: false }}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formGridPassword" style={{ display: false }}>
            <Form.Label>Org</Form.Label>
            <Form.Control
              type="text"
              placeholder="Org Name"
              onChange={(e) => {
                setOrg(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formGridPassword" style={{ display: false }}>
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              placeholder="Expected Duration"
              onChange={(e) => {
                setDuration(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formGridPassword" style={{ display: false }}>
            <Form.Label>Valid Upto Date</Form.Label>
            <DatePicker onChange={setValidity} value={validity} />
            {/* <Form.Control type="text" placeholder="Expected Duration"  onChange={(e)=>{setDuration(e.target.value)}} /> */}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => {
            props.setShowEdit(false);
            editRequest();
          }}
          variant="danger"
        >
          Done
        </Button>
        <Button
          onClick={() => {
            props.setShowEdit(false);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

function ProjectEdit(props) {
  const [show, setShow] = React.useState(false);
  const [showEdit, setShowEdit] = React.useState(false);

  function DeleteProject() {
    console.log("Deleting the project");
    const obj = {
      project: props._id,
    };

    DeleteSend(obj, "project");
    window.location.reload();
  }

  console.log("++++++++++++++++++++++++++++++++++" + props.deadline);
  const DDButton = (props) => {
    const history = useHistory();
    return (
      <>
        <Dropdown className="viewProject-container">
        <Button className="split-button button" id={`dropdown-button-drop-up`} title = "View" onClick={()=>{history.push(props.link)}}>View</Button>
        <DropdownButton  align="end" variant="secondary" drop="right">
            <Dropdown.Item  onClick={()=>{console.log("sure?");setShowEdit(true)}}  style={{ textAlign : "center" ,  backgroundColor : "white"}}><b>Edit</b></Dropdown.Item>
            <Dropdown.Item  onClick={()=>{console.log("sure?");setShow(true)}}  style={{color :"red" , backgroundColor : "lightPink" , textAlign : "center"}}><b>Delete</b></Dropdown.Item>
        </DropdownButton>
        </Dropdown>
        {/* <ButtonToolbar>
          <Dropdown id="dropdown-custom-2">
            <Button className="split-button">mix it up style-wise</Button>
            <Dropdown.Toggle className="split-button" />
            <Dropdown.Menu className="split-button">
              <Dropdown.Item eventKey="1">Action</Dropdown.Item>
              <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
              <Dropdown.Item eventKey="3">
                Active Item
              </Dropdown.Item>
              <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </ButtonToolbar> */}
        {/* <Dropdown as={ButtonGroup}>
            <Link to= {props.link}><Button variant="success"> Veiw</Button></Link>

            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
            
            <Dropdown.Menu drop="up">
            <Dropdown.Item  onClick={()=>{console.log("sure?");setShowEdit(true)}}  style={{ textAlign : "center" ,  backgroundColor : "black"}}><b>Edit</b></Dropdown.Item>
            <Dropdown.Item  onClick={()=>{console.log("sure?");setShow(true)}}  style={{color :"red" , backgroundColor : "lightPink" , textAlign : "center"}}><b>Delete</b></Dropdown.Item>
            
              
            </Dropdown.Menu>
            </Dropdown> */}
        {/* <DeletionWarning onConfirm={DeleteMember} show={show} onHide={()=>{setShow(false)}} /> */}
        <Modal
          show={show}
          onHide={() => {
            setShow(false);
          }}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Are you sure about this?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              Deletion of the project will delete all the related data,
              including the spreadsheets.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                setShow(false);
                DeleteProject();
              }}
              variant="danger"
            >
              Yes, Delete.
            </Button>
            <Button
              onClick={() => {
                setShow(false);
              }}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <EditModal
          showEdit={showEdit}
          setShowEdit={setShowEdit}
          name={props.name}
          org={props.org}
          duration={props.duration}
          _id={props._id}
          deadline={props.deadline}
        />
      </>
    );
  };

  return (
    <DDButton
      name={props.name}
      org={props.org}
      duration={props.duration}
      link={props.link}
      _id={props._id}
      deadline={props.deadline}
    />
  );
}

export default ProjectEdit;
