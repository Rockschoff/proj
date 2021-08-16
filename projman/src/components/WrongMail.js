import React from "react"
import wrong from "../wrong.png"

function WrongMail(){
    return(
        <div style={{alignContent : "center" , backgroundColor  : "#99bbff",}}>
            <h1 style={{
                marginLeft : "50vh"
            }}>Login from a storyproc mail</h1>
            <img src={wrong} style={{
                marginLeft : "50vh"
            }}></img>
        </div>
    )
}

export default WrongMail;