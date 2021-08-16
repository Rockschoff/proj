import React from "react";
import Table from "react-bootstrap/Table";
import TeamMember from "./TeamMember";
import AddMember from "./AddMember";
import MemberCard from "./MemberCard";
import Aos from "aos";
import "aos/dist/aos.css";
import TeamMail from "./TeamMail";

export default function TeamTable(props) {
  React.useEffect(() => {
    Aos.init();
  });

  return (
    <div>
      {/* <Table striped bordered hover size="sm" style={{margin : "20px auto 20px auto"}}>
                <thead>
                    <th>Name</th>
                    <th>email.</th>
                    <th>Role</th>
                    <th>Task</th>
                </thead>
                <tbody>
                    
                    {   
                        props.members.map((member , key)=>{

                            return <TeamMember name = {member.name} email = {member.email} role={member.role} _id = {member._id}/>
                        })
                    }
                    
                </tbody>
            </Table> */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AddMember project={props.projectId} />
        {/* <TeamMail></TeamMail> */}
      </div>
      <MemberCard name={"none"} email={"none"} role={"none"} _id={"none"} />
      {props.members.map((member, key) => {
        return (
          <div data-aos="fade-left" data-aos-delay={`${(10 - key) * 50}`}>
            <MemberCard
              name={["member.name"]}
              email={["member.email"]}
              role={["member.role"]}
              _id={member._id}
              project={props.projectId}
            />
          </div>
        );
      })}
    </div>
  );
}
