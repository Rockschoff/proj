import React from 'react'
import Button from "react-bootstrap/Button"
import {Link , useLocation , Switch , Route} from "react-router-dom";
import MemberPage from "./MemberPage.js"
import data from "../data.js"

export default function TeamMember(props) {
    // var temp = [
    //     {
    //         name : "Jayden",
    //         email : "jayden@gmail.com",
    //         role : "design",
    //         tasks : ["task1" , "task2" , "task3"]
    //     },
    //     {
    //         name : "Beth",
    //         email : "beth@gmail.com",
    //         role : "design",
    //         tasks : ["task1" , "task2" , "task3"]
    //     },
    //     {
    //         name : "Jay",
    //         email : "jay@gmail.com",
    //         role : "design",
    //         tasks : ["task1" , "task2" , "task3"]
    //     }
    // ];

    // function getDetails(name , email){
    //     var obj = {}
    //     for(var i = 0 ; i<temp.length;i++){
    //         if(temp[i].name === name){
    //             if(temp[i].email === email){
    //                 obj = temp[i];
    //             }
    //         }
    //     }
    //     return (
    //         <>
    //             <td>{obj.name}</td>
    //             <td>{obj.name}</td>
    //             <td>{obj.name}</td>
    //             <td>Veiw Tasks</td>
    //         </>
    //     )
    // } 

    let location = useLocation()
    
    let link = {
        pathname : "/memberpage" +  "/" + props._id,
        state : {
            project : location.state._id,
            member : {
                name : props.name,
                email : props.email,
                role : props.role,
                _id : props._id
            }

        }
    }

    return (
        <>
        <tr>
                <td>{props.name}</td>
                <td>{props.email}</td>
                <td>{props.role}</td>
                <td><Link to = {link}><Button variant = "primary">View</Button></Link></td>
                {/* <td><Link to = {{pathname : location.pathname + "/" + props._id , state : {project_id : location.state._id , member_id : props._id}}}><Button variant = "primary">Veiw</Button></Link></td> */}
        </tr>
        {/* <Switch>
            <Route exact to={location.pathname + "/:member_id" }>
                <MemberPage member = {data[0].members[0]} ></MemberPage>
            </Route>
        </Switch> */}
        </>

    )
}
