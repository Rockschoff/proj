import React from "react";
import Table from "react-bootstrap/Table";
import Projitem from "./Projitem";
import AddProjForm from "./AddProjForm";
import ListCard from "./ListCard";
import Aos from "aos";
import "aos/dist/aos.css";
import "./ProjList.css";
import { MDBDataTable } from "mdbreact";
export default function Projlist(props) {
  React.useEffect(() => {
    Aos.init();
  }, []);

  const ListCardList = []

  props.data.forEach((proj , key)=>{
    // console.log(key)
    var o = {
      name : proj.name,
      org : proj.org,
      desc : proj.duration,
      act : (
        <ListCard 
          className = "card"
          name = {proj.name}
          org = {proj.org}
          duration = {proj.duration}
          _id = {proj._id}
          totalExports ={proj.totalExports}
          deadline = {proj.deadline}
          token = {props.token}
          profile = {props.profile}
        />
      )
    }
    ListCardList.push(o);
  })



  const projectData = [{ name: "sid", org: "sid", duration: "60s" }].map(
    (proj, key) => {
      console.log(key);
      console.log(proj.deadline);
      return {
        name: proj.org,
        project: proj.name,
        desc: proj.duration,
        act: (
          <ListCard
            className="card"
            name={proj.name}
            org={proj.org}
            duration={proj.duration}
            _id={proj._id}
            token={proj.token}
            profile={proj.profile}
          />
        ),
      };
    }
  );
  const data = {
    columns: [
      {
        label: "Name of organisation",
        field: "name",
      },
      {
        label: "Project Name",
        field: "project",
      },
      {
        label: "Project Description",
        field: "desc",
      },
      {
        label: "Action",
        field: "act",
      },
    ],
    rows: [
      {
        name: "Google",
        project: "Ad",
        desc: "50s",
        act: (
          <ListCard
            className="card"
            name={"Ad"}
            org={"Google"}
            duration={"50s"}
            _id={"18981989181"}
            token={null}
            profile={null}
          />
        ),
      },
      {
        name: "Google",
        project: "Ad",
        desc: "50s",
        act: (
          <ListCard
            className="card"
            name={"Ad"}
            org={"Google"}
            duration={"50s"}
            _id={"18981989181"}
            token={null}
            profile={null}
          />
        ),
      },
      {
        name: "Google",
        project: "Ad",
        desc: "50s",
        act: (
          <ListCard
            className="card"
            name={"Ad"}
            org={"Google"}
            duration={"50s"}
            _id={"18981989181"}
            token={null}
            profile={null}
          />
        ),
      },
      {
        name: "Google",
        project: "Ad",
        desc: "50s",
        act: (
          <ListCard
            className="card"
            name={"Ad"}
            org={"Google"}
            duration={"50s"}
            _id={"18981989181"}
            token={null}
            profile={null}
          />
        ),
      },
      {
        name: "Facebook",
        project: "Ad",
        desc: "50s",
        act: (
          <ListCard
            className="card"
            name={"Ad"}
            org={"Facebook"}
            duration={"50s"}
            _id={"18981989181"}
            token={null}
            profile={null}
          />
        ),
      },
      {
        name: "AMazon",
        project: "Ad",
        desc: "50s",
        act: (
          <ListCard
            className="card"
            name={"Ad"}
            org={"Amazon"}
            duration={"50s"}
            _id={"18981989181"}
            token={null}
            profile={null}
          />
        ),
      },
      {
        name: "Google",
        project: "Ad",
        desc: "50s",
        act: (
          <ListCard
            className="card"
            name={"Ad"}
            org={"Google"}
            duration={"50s"}
            _id={"18981989181"}
            token={null}
            profile={null}
          />
        ),
      },
      {
        name: "Google",
        project: "Ad",
        desc: "50s",
        act: (
          <ListCard
            className="card"
            name={"Ad"}
            org={"Google"}
            duration={"50s"}
            _id={"18981989181"}
            token={null}
            profile={null}
          />
        ),
      },
      {
        name: "Jane Street",
        project: "Intern",
        desc: "50s",
        act: (
          <ListCard
            className="card"
            name={"Intern"}
            org={"Jane Street"}
            duration={"50s"}
            _id={"18981989181"}
            token={null}
            profile={null}
          />
        ),
      },
      {
        name: "Bajaj",
        project: "Interview",
        desc: "50s",
        act: (
          <ListCard
            className="card"
            name={"Interview"}
            org={"Bajaj"}
            duration={"50s"}
            _id={"18981989181"}
            token={null}
            profile={null}
          />
        ),
      },
      {
        name: "Wipro",
        project: "Adv",
        desc: "50s",
        act: (
          <ListCard
            className="card"
            name={"Adv"}
            org={"Wipro"}
            duration={"50s"}
            _id={"18981989181"}
            token={null}
            profile={null}
          />
        ),
      },
      {
        name: "StoryProcess",
        project: "Video",
        desc: "50s",
        act: (
          <ListCard
            className="card"
            name={"Ad"}
            org={"Google"}
            duration={"50s"}
            _id={"18981989181"}
            token={null}
            profile={null}
          />
        ),
      },
      {
        name: "Microsoft",
        project: "Ad",
        desc: "50s",
        act: (
          <ListCard
            className="card"
            name={"Ad"}
            org={"Microsoft"}
            duration={"50s"}
            _id={"18981989181"}
            token={null}
            profile={null}
          />
        ),
      },
      ...projectData
    ]
  };
  data.rows = ListCardList.reverse()
  return (
    <div>
      <AddProjForm user={props.user}></AddProjForm>

      <div className="card-container">
        <MDBDataTable striped bordered data={data} />
        {/* <Table striped bordered hover size="sm">
                <thead>
                    <th>Name</th>
                    <th>Org.</th>
                    <th>Status</th>
                    <th></th>
                </thead>
                <tbody>
                    {console.log(props.data)}
                    {
                      
                      props.data.map((proj , key)=>{
                          return <Projitem Name = {proj.name} Org={proj.org}  Status = {proj.status} _id = {proj._id}  />
                      })
                    }
                    
                    
                     */}
        {/* <Projitem Name = "Story1" Org = "ABC" Status="Ongoing"></Projitem>
                    <Projitem Name = "Story2" Org = "XYZ" Status="Ongoing"></Projitem> */}
        {/* </tbody> 
            </Table> */}
        {/* <ListCard name={"none"} org={"none"} status={"none"} _id={"none"}></ListCard> */}
        {/* <div data-aos="fade-left" data-aos-duration={`${(10 - 2) * 100}`}>
          <ListCard
            className="card"
            name={"test"}
            org={"test"}
            duration={"30s"}
            _id={"18981989181"}
            token={null}
            profile={null}
          />
        </div>
        <div data-aos="fade-left" data-aos-duration={`${(10 - 2) * 100}`}>
          <ListCard
            className="card"
            name={"test1"}
            org={"test"}
            duration={"30s"}
            _id={"18981989181"}
            token={null}
            profile={null}
          />
        </div> */}
        {/* <Table hover className="table-container">
          <thead className="head">
            <tr className="first-row">
              <th>Name of organisation</th>
              <th>Project Name</th>
              <th>Project Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <ListCard
              name={"Vaish"}
              org={"Mohite"}
              duration={"30s"}
              _id={1212121212}
              token={null}
              profile={null}
            />
            <ListCard
              name={"Video"}
              org={"Microsoft"}
              duration={"30s"}
              _id={1212121212}
              token={null}
              profile={null}
            />
            <ListCard
              name={"Video"}
              org={"Google"}
              duration={"30s"}
              _id={1212121212}
              token={null}
              profile={null}
            />
            {[{ name: "sid", org: "sid", duration: "60s" }].map((proj, key) => {
              console.log(key);
              console.log(proj.deadline);
              return (
                <ListCard
                  name={proj.name}
                  org={proj.org}
                  duration={proj.duration}
                  _id={proj._id}
                  token={props.token}
                  profile={props.profile}
                  deadline={proj.deadline}
                />
              );
            })}
          </tbody>
        </Table> */}
      </div>
    </div>
  );
}
