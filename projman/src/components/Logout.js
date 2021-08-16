import React from "react";
import { GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";
import "./Logout.css";

const clientId =
  "64080679766-lqssbjjjgi5001n8p6fdvfo98hh421hr.apps.googleusercontent.com";

function Logout(props) {
  const onSuccess = () => {
    console.log("[LOGOUT SUCCESS] cuurentUser : ");
  };

  // const onFailure = (res) => {
  //     console.log("[LOGOUT FAILED] res : " + res)
  // }

  return (
    <div>
      <Link to="/post-logout">
        <GoogleLogout
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="logOut-btn">Log Out</button>
          )}
          clientId={clientId}
          buttonText="Log Out"
          onLogoutSuccess={onSuccess}
          onClick={() => {
            console.log("log out!!!");
          }}
        />
      </Link>
    </div>
  );
}

export default Logout;
