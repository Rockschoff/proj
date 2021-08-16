import React from 'react'
import Projlist from "./Projlist"
import Container from "react-bootstrap/Container"
import Wave from 'react-wavify'
import ListCard from "./ListCard"
import {useLocation } from "react-router-dom";
import LoginPage from "./LoginPage.js"
import WrongMail from "./WrongMail"

function HomePage(props) {

  const [projList , setProjList] = React.useState([])
  /*"http://localhost:9000/projects"*/ 
  React.useEffect(()=>{
    console.log("before the fetch statement");
    fetch("/projects")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setProjList(data);
    })
  } , [])
  //what is useEffect
  let {state} = useLocation();
  if(state && state.fromLogout){
    window.location.reload();
  }else{
    //yahan pai kuch kyu nahi hai
  }
  
  function checkEmail(str){
    let ind = -1;
    for(let i =0; i<str.length ; i++){
      if(str.charAt(i)==="@"){
        ind = i;
      }
    }
    if(ind === -1){
      return false
    }
    const allowed = "@storyproc.com";
    console.log("###############" + str.substring(ind , str.length) )
    if(allowed === str.substring(ind , str.length)){
      return true
    }
    else{
      return false
    }
  }

  if(props.profile){
    
  }else{
    return <LoginPage signedIn={false}/>
  }


  if(props.profile.email){
    let email = props.profile.email;
    
    let validation = checkEmail(email);
    if(validation){
      console.log(email + " is allowed in the field")
    }else{
      // alert("this mail is not a storyproc mail!! You may still explore...for now"  )
      return(
        <WrongMail />
      )
    }
    

    

  }else{
    return (
      <div>
        You are not authourized for this. Please contact the respective agency
      </div>
    )
  }
    


  // React.useEffect(()=>{

  //   console.log("about to fetch")
  //   fetch('http://localhost:9000/projects')
  //       .then((response) => {
  //           const v = response.json();
  //           console.log(v)
  //           return v;
  //       })
      
    
    
  // }  , [])


    return (

        <div>

        <Container style={{paddingTop : "2%"}}>
        {/* <Projlist data = {props.data}></Projlist> */}
        <Projlist data = {projList} token={props.token} profile={props.profile} user={props.profile.email}></Projlist>
        {console.log("this this this")}

        {console.log(props.profile.email)}
       
      </Container>
      <Wave fill='#6699ff'
        paused={false}
        options={{
          height: 30,
          amplitude: 20,
          speed: 0.15,
          points: 6
        }}
        style={{position : "relative", 
      top : "600px"}}
      />
      </div>
      
    )
}

export default HomePage;
