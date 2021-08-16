import React from "react";
import Login from "./Login";
// import Logout from "./Logout";
// import { Redirect, Switch } from "react-router-dom";
import HomePage from "./HomePage";
// import { Container, Row, Col } from "react-bootstrap";
import main from "../MainImg.png";
import "./loginPage.css";

function LoginPage(props) {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [tokenObj, setTokenObj] = React.useState({});
  const [profileObj, setProfileObj] = React.useState({});

  function giveRender() {
    let location = {
      pathname: "/homepage",
      state: {
        tokenObj: tokenObj,
        profileObj: profileObj,
      },
    };
    if (loggedIn) {
      console.log("loggedIn is true");
      console.log(profileObj);
      return <HomePage token={tokenObj} profile={profileObj} />;
    } else {
      return (
        <section className="main-section">
          <div>
            <h1 style={{ textAlign: "center" }}>
              Welcome , Please login to view the projects!
            </h1>
          </div>
          <div className="main-container">
            <div className="img-container">
              <img src={main} alt="main-img" className="main-img"></img>
            </div>
            <div className="login-container">
              <Login
                className="login-btn"
                setLoggedIn={setLoggedIn}
                setTokenObj={setTokenObj}
                setProfileObj={setProfileObj}
              />
            </div>
          </div>
        </section>
      );
    }
  }

  return <div>{giveRender()}</div>;
}

export default LoginPage;
