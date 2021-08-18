import React from "react";
import "./ListCard.css";
import { Button, Dropdown, DropdownButton, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { matchPath } from "react-router";
import ProjectEdit from "./ProjectEdit";
import { checkPropTypes } from "prop-types";

function ListCard(props) {
  const match = matchPath("/projpage/" + props._id, {
    path: "/projpage/:project",
    exact: true,
    strict: true,
  });
  const mainStyle = {
    display: "flex",
    justifyContent: "space-between",
    border: ".1rem solid #f20045",
    borderRadius: "15px",
    height: "60px",
    boxShadow: "10px 10px 8px 10px #888888;",
    marginTop: "10px",
    marginBottom: "10px",
    zIndex: "-3",
  };
  const [profile, setProfile] = React.useState({});
  const [token, setToken] = React.useState({});

  const link = {
    pathname: "/projpage/" + props._id,
    state: {
      _id: props._id,
      name: props.name,
      org: props.org,
      duration: props.duration,
    },
  };

  return (
    // <tr data-aos="fade-left" data-aos-duration={`${(10 - 2) * 100}`} className="project-row">
    //   <td>{props.org}</td>
    //   <td>{props.name}</td>
    //   <td className="desc-cell">{props.duration}</td>
    //   <td>

    <ProjectEdit
        name = {props.name}
        org = {props.org}
        duration = {props.duration}
        link = {link}
        deadline = {props.deadline}
        totalExports = {props.totalExports}
        _id= {props._id} />

    
    // {
    //   name: props.org,
    //   project: props.name,
    //   desc: props.duration,
    //   act: (
    //     <ProjectEdit
    //       name={props.name}
    //       org={props.org}
    //       duration={props.duration}
    //       link={link}
    //       deadline={props.deadline}
    //       _id={props._id}
    //     />
    //   ),
    // }
    // <div style={mainStyle}>
    //     <div className="listcard-element">{props.name=="none"?<b>Name</b>:props.name}</div>
    //     <div className="listcard-element">{props.org=="none"?<b>Organization</b>:props.org}</div>
    //     <div className="listcard-element">{props.status=="none"?<b>Duration</b>:props.duration}</div>
    //     {/* <div className="listcard-element"><Link to= {{pathname : "/projpage/" + props._id , state : {_id : props._id }}}>{props.name=="none"?"":<Button variant="primary">View</Button>}</Link></div> */}
    //     <div className="listcard-element">
    //         {props.name == "none"?
    //         "":
    //     </div>
    // </div>
  );
}

export default ListCard;
