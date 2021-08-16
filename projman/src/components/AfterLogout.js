import React from "react";
import {Container , Button} from "react-bootstrap";
import {Link} from "react-router-dom";

function AfterLogout(){
    return(
        <div style={{
            backgroundColor : "#99bbff", 
            width : "100%",
            height : "100vh",
            paddingLeft : "50vh"
        }}>
        <h1 style={{color : "white"}}>You have logged out!</h1>
        <Container fluid >
            <Link to="/">
                <Button size="lg" style={{backgroundColor : "white" , color : "black" , height : "60px" , borderRadius : "30px" , width : "300px"}}>
                    Please login to continue
                </Button>
            </Link>
        </Container>
        </div>
    )
}

export default AfterLogout