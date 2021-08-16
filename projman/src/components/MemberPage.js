import React from "react";
import {
  Card,
  Container,
  Button,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import TaskCard from "./TaskCard";
import AddTask from "./AddTask";
import { Redirect, useLocation } from "react-router-dom";
import Wave from "react-wavify";
import LoginPage from "./LoginPage";
import "./MemberPage.css";

export default function MemberPage(props) {
  const [taskList, setTaskList] = React.useState([]);

  const [permission, setPermission] = React.useState("Editor");

  const location = useLocation();

  React.useEffect(() => {
    fetch("http://localhost:9000/tasks/" + projectId + "/" + memberId)
      .then((res) => res.json())
      .then((data) => setTaskList(data));
  }, []);

  if (location.state) {
  } else {
    return <Redirect to="/" />;
  }
  const projectId = location.state.project;
  const memberId = location.state.member._id;
  const member = location.state.member;
  const params = { projectId: projectId, memberId: memberId };

  return (
    <div className="member-main-container">
      <Container>
        <DropdownButton
          // id="dropdown-basic-button"
          variant="danger"
          title="Change Permissions"
          className="role-button"
        >
          <Dropdown.Item
            onClick={() => {
              setPermission("Editor");
            }}
          >
            Editor
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setPermission("Commentor");
            }}
          >
            Commentor
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              setPermission("Viewer");
            }}
          >
            Viewer
          </Dropdown.Item>
        </DropdownButton>
        <div className="memberCard-container">
          <Card.Body variant="dark"><em style={{fontSize:"1.2rem"}}>Name</em> : {" " + member.name}</Card.Body>
          <Card.Body variant="dark"><em style={{fontSize:"1.2rem"}}>Email</em> : {" " + member.email}</Card.Body>
          <Card.Body variant="dark"><em style={{fontSize:"1.2rem"}}>Role</em> : {" " + member.role}</Card.Body>
          <Card.Body variant="dark"><em style={{fontSize:"1.2rem"}}>Permission</em> : {" " + permission}</Card.Body>
          {/* <Card.Body variant="dark" style={{backgroundColor : "lightPink"}}>Current Tasks</Card.Body> */}
        </div>
        {/* <AddTask member= {member} projectId = {projectId}></AddTask> */}
        <div style={{ display: "flex" }}>
          {taskList.map((task, key) => {
            return <TaskCard task={task} member={member}></TaskCard>;
          })}
        </div>
      </Container>
      {/* <Wave fill='#6699ff'
        paused={false}
        options={{
          height: 1,
          amplitude: 20,
          speed: 0.15,
          points: 6
        }}
      /> */}
    </div>
  );
}
