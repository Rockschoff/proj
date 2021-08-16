import React from "react";
import { GoogleLogin } from "react-google-login";
import RefreshToken from "./RefreshToken.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';
import "./Login.css";


const clientId = "64080679766-lqssbjjjgi5001n8p6fdvfo98hh421hr.apps.googleusercontent.com"

function Login(props) {
    const onSuccess = (res) => {
        console.log("[LOGIN SUCCESS] cuurentUser : ")
        console.log(res);
        props.setLoggedIn(true);
        props.setTokenObj(res.tokenObj);
        props.setProfileObj(res.profileObj);

        RefreshToken(res);
    }

    const onFailure = (res) => {
        console.log("[LOGIN FAILED]")
        console.log(res)
        props.setLoggedIn(false)
    }
    return (
        <div>
            <GoogleLogin
                render={renderProps => (
                    <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="logIn-btn">
                        <FontAwesomeIcon className="googleIcon" icon={faGooglePlusG} />
                        <p>Log In</p>
                    </button>
                )}
                clientId={clientId}
                buttonText="Log in"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookie-policy={"single_host_origin"}
                // style={{ marginTop: "100px" }}
                isSignedIn={true} />

        </div>
    )
}

export default Login;