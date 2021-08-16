import React from 'react'
import Button from "react-bootstrap/Button"
import { Link} from "react-router-dom"
import {matchPath} from "react-router"

export default function Projitem(props) {
    const match = matchPath("/projpage/" + props._id , {
        path : "/projpage/:project",
        exact : true,
        strict : true,
    })
    return (
        
            <tr>
                <td>{props.Name}</td>
                <td>{props.Org}</td>
                <td style={(props.Status==="Ongoing")?{color : "red"}:{}}>{props.Status}</td>
                
                <td><Link to= {{pathname : "/projpage/" + props._id , state : {_id : props._id}}}><Button>Edit</Button></Link></td>
            </tr>
        
    )
}
