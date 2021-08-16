import React from "react"
import Navigation from "./components/Navigation"
// import Container from "react-bootstrap/Container"
import "bootstrap/dist/css/bootstrap.min.css"
// import Projlist from "./components/Projlist"
import ProjPage from "./components/ProjPage"
import HomePage from "./components/HomePage"
import data from "./data.js"
import MemberPage from "./components/MemberPage.js"
import LoginPage from "./components/LoginPage.js"
import Logout from "./components/Logout.js"
import AfterLogout from "./components/AfterLogout"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link

} from "react-router-dom";
import "./App.css";

function App() {
  async function test(){
    var res = await fetch( "/api");
    res.text()
    .then((text)=> {console.log(text);})
    .catch((err)=>{console.log("error has occured")});

  }
  React.useEffect(()=>{
    test();
  } , [])
  return (
    
    <div className="App" style = {{backgroundColor : "light-pink"}}>
      <Router>
      <Navigation></Navigation>
      {/* When we click on the add project
      1. it will show a prompt to fill the name of the project and startDate
      2. it will call the python file, the python file will make a cocpy of the template
        , will rename it and give the link of the new project 
      3. Now we will taken to the project page, where we can start adding members and giving them editing rights
      */}
      
        <Switch>
          {/* <Route to="/login" exact>
            <LoginPage></LoginPage>
          </Route> */}
          <Route path="/" exact>
            <HomePage data= {data} ></HomePage>
          </Route>
          <Route path="/projpage/:project" >
            <ProjPage />
          </Route>
          <Route path="/memberpage/:member" exact>
            <MemberPage member = {data[0].members[0]} ></MemberPage>
          </Route>
          <Route path="/post-logout">
            <AfterLogout></AfterLogout>
          </Route>
          
        </Switch>
        
        
      </Router>
      
      
      
      

    </div>
  );
}

export default App;

// the json of each project will have.
// name
//Org.
// unique_id
//Google Sheet Link
// Start date
// status : Ongoing , Paused , Finished
// List of member Objects* 
// List of checkPosts
//List Special Notes

//each member object will have 
//Name
//Email
//Role
//TaskObject

//Each Task Object will have 
//Task NAme
//Task Description
//Assigned Date
//Deadline