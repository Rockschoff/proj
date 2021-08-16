import React from 'react'
import TeamTable from "./TeamTable"
import CheckPointsList from "./CheckPointsList"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import {   useLocation , Redirect } from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TeamMail from "./TeamMail"
import Wave from "react-wavify"
import  LoginPage from "./LoginPage"
import "./ProjPage.css";

library.add(fab);

export default function ProjPage(props) {
      console.log("on projpage")
   
     const [memberList , setMemberList] = React.useState([])
     const [link , setLink] = React.useState("")
     const [checkpoints , setCheckpoints] = React.useState([])
    
    let location = useLocation();

    React.useEffect(()=>{

        
        /*"http://localhost:9000/members/"*/

        console.log("before the fetch")
        fetch( "/members/" + (location.state._id) , {
            method : "GET",
        }).then(res => res.json()).then(data => {setMemberList(data.list) ; setLink(data.link);setCheckpoints(data.checkpoints)});
        
        

    } ,[])
    
    if(location.state){

    }else{
      return(
        <Redirect to="/" />
      )
    }
    
    
    return (
        <div>
        <Container className= "text-center" style={{width : "100%"}}> 
            {/* Team table, it will have a name, emailLink , role.
            Clicking on each team will give the notes on that memeber */}
            {/* Then there will be list of task that are going on, people who are working on them 
            and the upcoming deadlines */}
            <div className="project-container">
              <h1>{location.state.org}</h1>
              <h4>{location.state.name}</h4>
              <p>{location.state.duration}</p>
            </div>
            <Button variant = "dark" href = {link} className="ss-btn">Open SpreadSheet</Button>
            {console.log(link)}
            {console.log(checkpoints)}
            {/* <TeamTable project = {props.project}></TeamTable> */}
            <TeamTable members = {["memberList","sadad"]  } projectId = {location.state._id} ></TeamTable>
            {/* <TeamMail></TeamMail> */}
            {/* <CheckPointsList checkpoints = {checkpoints} projectId = {state._id}></CheckPointsList> */}
        </Container>
        <Wave 
        paused={false}
        options={{
          height: 1,
          amplitude: 20,
          speed: 0.15,
          points: 6
        }}
      />
        </div>
    )
}
