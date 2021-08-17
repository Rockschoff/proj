const express = require('express')
const cors = require("cors")
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const {spawn} = require("child_process")
const {makeCopy , deleteFile , grantPermission} = require("./makeCopy.js")
const  path = require("path");
var AWS = require("aws-sdk");
var hash = require('object-hash');




mongoose.connect("mongodb+srv://admin-rishi:thunderick123@cluster0.9ii9j.mongodb.net/projmanDB" , { useNewUrlParser: true  , useUnifiedTopology: true });

AWS.config.update({
    region: "us-west-2",
    endpoint: "http://localhost:8000"
  });
  
  var dynamodb = new AWS.DynamoDB();
  
  var tableParams = {
      TableName : "Projects",
      KeySchema: [       
          { AttributeName: "_id", KeyType: "HASH"},  //Partition key
      ],
      AttributeDefinitions: [       
          { AttributeName: "_id", AttributeType: "S"},  //Partition key
          
          // { AttributeName: "year", AttributeType: "N" },
          // { AttributeName: "title", AttributeType: "S" }
      ],
      ProvisionedThroughput: {       
          ReadCapacityUnits: 10, 
          WriteCapacityUnits: 10
      }
  };
  

var docClient = new AWS.DynamoDB.DocumentClient();

// dynamodb.createTable(tableParams, function(err, data) {
//     if (err) {
//         console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
//     } else {
//         console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
//     }
// });

console.log("Running the dynamo file")



const taskSchema = new mongoose.Schema({
  type : String, //type of schema
  project : String,  //_id if the project
  member : String , // _id of the string
  heading : String, // heading of the task
  description : String, // description of the task
  assigned : String, // assigned date
  deadline : String, // deadline
  urgent : Boolean // urgency of the task.
})

const memberSchema = new mongoose.Schema({
  type : String, // type of addition
  project : String, //project id
  name : String,  // name of member
  // working : [projectSchema],
  email : String, // email of member
  tasks : [taskSchema], // tasks of member
  role : String,  // role of member
  special : String,  // special note about the member
})


const projectSchema = new mongoose.Schema({
  type : String, // type of addition
  name : String, //name of project
  org : String, // organization
  link : String, // link to sheet
  start : String, // start date
  deadline : String, // deadline
  members : [memberSchema], // member
  checkpoints : [String], // lis of checkpints
  special : [String], // list of special notes
  status : String, // status of the project
  duration : String,
  totalExports : Number,
  exportsDone : Number,
  exportsLog : [{
    time : String,
    id : String
  }]
  
})

// const task1 = {
//   type : "task", //type of schema
//   project : "60b82acacad91a4604502c8b",  //_id if the project
//   member : "60b82b5d7f24f91b845e3474" , // _id of the string
//   heading : "Task 1", // heading of the task
//   description : "This is a task description, pleaase do the task on time", // description of the task
//   assigned : "21/5/21", // assigned date
//   deadline : "21/6/21", // deadline
//   urgent : false // urgency of the task.

// }

// const task2 = {
//   type : "task", //type of schema
//   project : "60b82acacad91a4604502c8b",  //_id if the project
//   member : "60b82b5d7f24f91b845e3473" , // _id of the string
//   heading : "Task 2", // heading of the task
//   description : "This is a task description, pleaase do the task on time", // description of the task
//   assigned : "21/5/21", // assigned date
//   deadline : "21/6/21", // deadline
//   urgent : false // urgency of the task.

// }

// const task3 = {
//   type : "task", //type of schema
//   project : "60b82acdcad91a4604502c8c",  //_id if the project
//   member : "60b82b5d7f24f91b845e3475" , // _id of the string
//   heading : "Task 3", // heading of the task
//   description : "This is a task description, pleaase do the task on time", // description of the task
//   assigned : "21/5/21", // assigned date
//   deadline : "21/6/21", // deadline
//   urgent : false // urgency of the task.

// }

// const member1 = {
//   type : "member", // type of addition
//   project : "60b82acacad91a4604502c8b", //project id
//   name : "Diana",  // name of member
//   // working : [projectSchema],
//   email : "testemail@test.com", // email of member
//   tasks : [], // tasks of member
//   role : "design",  // role of member
//   special : "this is special text",  // special note about the member
// }

// const member2 = {
//   type : "member", // type of addition
//   project : "60b82acacad91a4604502c8b", //project id
//   name : "John",  // name of member
//   // working : [projectSchema],
//   email : "testemail@test.com", // email of member
//   tasks : [], // tasks of member
//   role : "design",  // role of member
//   special : "this is special text",  // special note about the member
// }
// const member3 = {
//   type : "member", // type of addition
//   project : "60b82acdcad91a4604502c8c", //project id
//   name : "Morgan",  // name of member
//   // working : [projectSchema],
//   email : "testemail@test.com", // email of member
//   tasks : [], // tasks of member
//   role : "design",  // role of member
//   special : "this is special text",  // special note about the member
// }



// const project1 = {
//   type : "project", // type of addition
//   name : "ABC", //name of project
//   org : "abc.org", // organization
//   link : "", // link to sheet
//   start : "21/4/21", // start date
//   deadline : "21/5/21", // deadline
//   members : [], // member
//   checkpoints : [], // lis of checkpints
//   special : [], // list of special notes
//   status : "ongoing", // status of the project
//   duration : "1 : 30min"
  
// }

// const project2 = {
//   type : "project", // type of addition
//   name : "XYZ", //name of project
//   org : "xyz.org", // organization
//   link : "", // link to sheet
//   start : "21/4/21", // start date
//   deadline : "21/5/21", // deadline
//   members : [], // member
//   checkpoints : [], // lis of checkpints
//   special : [], // list of special notes
//   status : "ongoing", // status of the project
//   duration : "1 : 30min"
// }



const Project = new mongoose.model("Project" , projectSchema);
const Member = new mongoose.model("Member"  , memberSchema )
const Task = new mongoose.model("Task" , taskSchema);

function getIdFromLink(link){
  for(var i = 0 ; i < link.length ; i++){
    if(i>0){
      if(link.substring(i-1 , i+2) == "/d/"){
        let id = link.substring(i+2  , link.length);
        console.log("the link to be deleted is ...." + id);
        return id
      }
    }
  }
}


  async function   getNewSheetLink(user){
  const link = await makeCopy();
  const file = getIdFromLink(link);
  console.log(file)
  grantPermission(user , file)
  return link;

}




async function saveNewProject(obj , user){
  try{
    const link = await getNewSheetLink(user);

    const proj =  {
      type : obj.type,
      name : obj.name,
      org : obj.org,
      link : link,
      start : obj.start,
      deadline : obj.deadline,
      members : [],
      checkpoints : obj.checkpoints,
      special : obj.special,
      status : obj.status,
      duration : obj.duration,
      totalExports : obj.totalExports,// obj.totalExports,
      exportsDone : 0,
    };
    

    var project = new Project(proj)
    var random_hash = hash({name : (proj.name + (Math.random() * Math.random()) + Math.random())})
    // console.log(project);
    project.save();
    proj["_id"] = random_hash;
    var params = {
        TableName : "Projects",
        Item : {
            "_id" : random_hash,
            "project" : proj
        }
    }
    docClient.put(params , function(err , data){
        if(err){
            console.log("COULD NOT ADD TO DYNAMO");
            console.log(err)
        }else{
            console.log("SUCCESSFULLY ADDED THE THINGS TO DYNAMO")
        }
    })
  
  }catch(err){
    console.log("error hai");

    console.log(err);
  }
  
}
 
function saveNewMember(obj){
  const member = new Member(obj);
//   AddMemberToProject(member , obj);
  obj["_id"] = hash({"member" : Math.random()*Math.random()*Math.random()*Math.random()})
  docClient.get({TableName : "Projects" , Key : {"_id" : obj.project}} ,
  function(err , data){
      if(err){
          console.log(err)
      }else{
          var m = data.Item.project.members;
          m.push(obj);
          var params = {
            TableName : "Projects",
            Key:{
                "_id" : obj.project,
            },
            UpdateExpression : "set #p.#m = :o",
            ExpressionAttributeValues : {
                ":o" : m,
            },
            ExpressionAttributeNames : {
                "#p" : "project",
                "#m" : "members"
            },
          //   ExpressionAttributeName : {
          //       "#m" : "project.members" ,
          //   },
            ReturnValues:"UPDATED_NEW"
        }
        console.log(params)
        docClient.update(params, function(err, data) {
          if (err) {
              console.error("UNABLE TO UPDATE", JSON.stringify(err, null, 2));
          } else {
              console.log("UPDATES!!!!!!!", JSON.stringify(data, null, 2));
          }
      });
          
      }
  })
  

}

function AddMemberToProject(member , obj){
  Project.find({_id : obj.project} , function(err, project){
    console.log(project[0].members);
    project[0].members.push(member);
    // console.log(project[0].members)
    project[0].save();
  } )
}

function saveNewTask(obj){
  const task = new Task(obj);
  
  AddTaskToMember(task  , obj);
}

function AddTaskToMember(task , obj){
  Project.find({_id : obj.project} , function(err, project){
    
    project[0].members.forEach((member)=>{
      
      if (member._id == obj.member){
        
        member.tasks.push(task)
      }
    })
    project[0].save();
    console.log("added " , task);
  } )
}

function saveNewCheckpoint(obj){
  console.log(obj)
  Project.find({_id : obj.project} , function(err, project){
    project[0].checkpoints.push(obj.checkpoint);
    project[0].save();
  } )
  var params = {
      TableName : "Projects",
      Key:{
          "_id" : obj.project,
      },
      UpdateExpression : "set list_append(project.checkpoints , :c)",
      ExpressionAttributeValues:{
          ":c" : obj.checkpoint,
      },
      ReturnValues:"UPDATED_NEW"
  }
  docClient.update(params , function(err , data){
      if(err){
          console.log("UNABLE TO UPDATE CHECKPOINTS");
          console.log(err)
      }else{
          console.log("UPDATE!!!!! checkpoints" , data);

      }
  });
  
}

function AddCheckPoints(){
  let list = [
    "This is task 1 , you have to do it",
    "this is task 2 , you have to do it",
    "this is Task 3 , you have to do it"
  ]
  Project.find({} , function(err , projects){
    projects.forEach((project)=>{
      list.forEach((item)=>{
        console.log(project.checkpoints)
        project.checkpoints.push(item);
        console.log(item)
        
      })
      project.save()
    })
    

    
    
  })
  console.log("done")

}

function DeleteMember(obj){

  console.log("deleteing the member .....");
  console.log(obj);
  const newObj = {}
  for(key in obj){
    if(obj[key] == "#SAME"){

    }else{
      newObj[key]=obj[key]
    }
  }
  console.log(newObj)
  Project.find({_id : obj.project} , function(err , projects){
    let i = 0
    let index = -1
    projects[0].members.forEach((member)=>{
      if(member._id == obj._id){
        index = i;
      }
      i = i+1;

    })
    projects[0].members.splice(index , 1);
    projects[0].save();
  })
}


function DeleteProject(obj ){
  console.log("deleting.....")
  console.log(obj.project)
  console.log(obj)
  

  
  
  var params = {
      TableName : "Projects",
      Key : {
          "_id" : obj.project,
      }
  }
  docClient.get(params , function(err , data){
      if(err){
          console.log("didn't find project while deletion")
      }else{
          var link = data.Item.project.link;
          let sheet = getIdFromLink(link)
          deleteFile(sheet)
        // console.log(data)

      }
  })
  docClient.delete(params  , function(err , data){
      if(err){
          console.log("could not delete from dynamo");
      }else{
          console.log("SUCCESS in DELETION");
      }
  });

}

function EditMember(obj){

  console.log("editiing memeber ....")
  const newObj = {}
  for(key in obj){
    if(key == "project" || key=="member"){

    }else if(obj[key]!="#SAME"){
      newObj[key] = obj[key]
    }
  }
  console.log(newObj)
//   Project.find({_id : obj.project} , function(err , projects){
//     projects[0].members.forEach((member)=>{
//         if(member._id == obj.member){
//           for(key in newObj){
//             member[key] = newObj[key];
//           }
//         }
//     })
//     projects[0].save()

//   })
  var params = {
      TableName : "Projects",
      Key : {
          "_id" : obj.proj
      }
  }
}

function EditProject(obj){
  console.log("in EditProject");
  console.log(obj);
  const newObj = {}
  for(key in obj){
    if(obj[key] == "#SAME"){

    }else{
      newObj[key]=obj[key]
    }
  }
  console.log(newObj)
//   try{
//     Project.updateOne({_id : obj.project} , newObj , function(err){
//         if(err){
//           console.log(err);
//         }
//       })
//   }catch(err){}

  
  for(const name in newObj){
      var params = {
          TableName : "Projects",
          Key : {
              "_id" : obj.project,
          },
          UpdateExpression : "set #p.#n = :i",
          ExpressionAttributeValues : {
              ":i" : newObj[name],
          },
          ExpressionAttributeNames : {
              "#p" : "project",
              "#n" : name,
          },
          ReturnValues:"UPDATED_NEW"
      }
      if(name != "project"){
        docClient.update(params , function(err , data){
            if(err){
                console.log("Could not update project");
                console.log(err)
            }else{
                console.log("updated the the project" , data);
                docClient.scan({TableName : "Projects"} , function(err , data){
                    if(err){
                        console.log(err)
                    }
                    console.log(data.Items)
                })
            }
        })
      }
      
  }
  


}

function getLinkfromId(id){
  var ans = "https://docs.google.com/spreadsheets/d/" + id;
  return ans;
}

function logExport(info){
  var link = getLinkfromId(info.id);
  var full = false
//   Project.find({link : link} , function(err , project){
//     var done = project[0].exportsDone;
//     if(done == project[0].totalExports){
//       full = true;
//     }else{
//       project[0].exportsDone = done + 1;
//       project[0].exportsLog.push(info);
//     }
//     project[0].save()
    
//   })
//   return full

// }
   docClient.scan({TableName : "Projects"} , function(err , data){
       if(err){
           console.log(err)
       }else{
           data.Items.forEach((item)=>{
               var id = item._id;
               if(item.project.link == link){
                   if(item.project.totalExports == item.project.exportsDone){
                       full = true
                       return full
                   }else{
                    
                    var done = item.project.exportsDone + 1
                    var log = {
                        time :  Date.now()
                    }
                    var l = item.project.exportsLog
                    l.push(log)
                    var p = {
                        TableName : "Project",
                        Key : {
                            "_id" : id 
                        },
                        UpdateExpression : "set #log = :l , #exp = :e",
                        ExpressionAttributeValues : {
                            ":l" : l,
                            ":e" : done,
                        },
                        ExpressionAttributeNames : {
                            "#log" : "exportsLog",
                            "#exp" : "exportsDone"
                        }
                    }
                    docClient.update(params , function(err , data){
                        if(err){
                            console.log("could not update the exports");
                            console.log(err)
                        }else{
                            console.log("logged the exports!!!" , data)
                        }
                    })
                    
                   }
                   
               }
           })
       }
   })
}


// saveNewProject(project1)
// saveNewProject(project2)

// saveNewMember(member1)
// saveNewMember(member2)
// saveNewMember(member3)

// saveNewTask(task1)
// saveNewTask(task2)
// saveNewTask(task3)



const app = express()
const port = process.env.PORT||9000

console.log("we are on port" + port);

app.use(bodyParser.json());
app.use(cors())

app.use(express.static(path.join(__dirname  , "projman" , "build")))



app.get("/api" , function(req , res){
    res.send( "The API is now connected");
})

app.post("/data/:type" , function(req , res ){
  
  const data = req.body.data;
  
  console.log(req.body)
  const type = req.params.type;
  console.log("req to /data")
  console.log(req.params)

  if(type == "member"){
    saveNewMember(data)
  }else if(type == "project"){
    saveNewProject(data , req.body.user)
  }else if(type == "task"){
    saveNewTask(data)
  }else if(type == "checkpoint"){
    saveNewCheckpoint(data);
  }
  
})

app.post("/delete/:type" ,  function(req , res ){
  console.log("delete request")
  console.log(req.params)
  console.log(req.body.data)

  if(req.params.type == "member"){
    DeleteMember(req.body.data)
  }else if(req.params.type == "project"){
    DeleteProject(req.body.data )
  }

})

app.post("/edit/:type" , function(req , res){
  console.log("edit request");
  console.log(req.params)
  console.log(req.body.data)

  if(req.params.type == "member"){
    EditMember(req.body.data)
  }else if(req.params.type == "project"){
    EditProject(req.body.data)
  }

  
})

app.get("/projects" , function(req , res){
  console.log("request made to /project" + req.body);
  var list = [];
  Project.find({} , function(err , project){
  
    project.forEach((proj)=>{
      
      const stuff = {
        name : proj.name,
        org : proj.org,
        duration : proj.duration,
        deadline : proj.deadline,
        _id : proj._id,
        totalExports : proj.totalExports,
        exportsDone : proj.exportsDone,
        exportsLog : proj.exportsLog,
        
      }
      
      list.push(stuff);
      

    })

    let scanned = []
    var params = {
        TableName : "Projects",
    }
    console.log(params)
    docClient.scan(params , function(err , data){
        if(err){
            console.log(err)
        }else{
            // console.log(data.Items)
            data.Items.forEach((d)=>{
                var stuff  = {
                    name : d.project.name,
                    org : d.project.org,
                    duration : d.project.duration,
                    deadline : d.project.deadline,
                    _id : d.project._id,
                    totalExports : d.project.totalExports,
                    exportsDone : d.project.exportsDone,
                    exportsLog : d.project.exportsLog,
                }
                scanned.push(stuff)
            });
            console.log(scanned)
            res.send(scanned)
        }
    })
    
    
    
  })
  
  


})

app.get("/members/:id" , function(req , res){
  console.log("GET request to /members")
  
  const _id = req.params.id

  var list = []
  var params = {
      TableName : "Projects",
      Key : {
          "_id" : _id,
      }
  }
  var obj={}
  docClient.get(params , function(err  , data){
    if(err){

    }else{
        obj["link"] = data.Item.project.link;
        obj["checkpoints"] = data.Item.project.checkpoints;
        var l = []
        var m = data.Item.project.members;
        m.forEach((member)=>{
            var s = {
                name : member.name,
                role : member.role,
                email : member.email,
            }
            // console.log(s)
            l.push(s)
        })
        obj["list"] = l
        console.log(obj)
        res.send(obj)
    }
  })
//   Project.find({_id : _id} , function(err , project){
//     if(err){
//       console.log(err);
//     }else{
//       const link = project[0].link
//       const checkpoints = project[0].checkpoints;
//       console.log(checkpoints)
//       project[0].members.forEach((member)=>{
//         const stuff = {
//           name : member.name,
//           role : member.role,
//           email : member.email,
//           _id : member._id
//         }
//         list.push(stuff)
//       })
//       res.send({list : list , link : link , checkpoints : checkpoints});
//     }
//   })

})

app.get("/checkpoints" , function(req, res){
  console.log("request made to /checkpints" + req);
})

app.get("/tasks/:project/:member" , function(req , res){
  console.log("request made to /tasks");
  console.log(req.params)
  const toSend = []
  Project.find({_id : req.params.project} , function(err , projects){
    projects[0].members.forEach((member)=>{
      if(member._id == req.params.member){
          member.tasks.forEach((task)=>{
            const stuff = {
              heading : task.heading,
              description : task.description,
              assigned : task.assigned,
              deadline : task.deadline,
              urgent : task.urgent
            }
            toSend.push(stuff);
          })
      }
    })
    res.send(toSend);
    console.log(toSend)
  })
})

app.get("/external/:key" , function(req , res){
  console.log("request  made to external");
  if(req.params.key=="storyproc12345"){
    var list = [];
    Project.find({} , function(err , project){
      if(err){
        console.log(err)
      }
      project.forEach((proj)=>{
        
        const stuff = {
          name : proj.name,
          org : proj.org,
          duration : proj.duration,
          deadline : proj.deadline,
          link : proj.link,
          _id : proj._id,
          totalExports : proj.totalExports,
          exportsDone : proj.exportsDone,
          exportsLog : proj.exportsLog
          
        }
        
        list.push(stuff);
        
  
         })
         res.send(list)
    })
    
  }else{
    res.send({message : "invalid key"})
  }
})

app.get("/log-export/:id" , function(req , res){
  console.log("this is was called");

  // console.log(req.body)
  // if(req.body=={}){
  //   var info = {id : "1lfu-8y7RlYN7fZqJuzFde1B-oACQu2T8tvMwGlWIDNY"}
  // }else{
  //   var info = req.body.info;
  // }
  let info = {id : req.params.id , time : new Date().getTime()}
  
  var full = logExport(info);
  if(full){
    res.send("The Limit is exceeded")
  }else{
    res.send("successfully logged the message")
  }
})

app.get("/project-stats/:id" , function(req , res){
  var id = req.params.id;
  var link = getLinkfromId(id);
  var stats = {}
  Project.find({link : link} , function(err , projects){


    if(projects){
      stats = {
        deadline : projects[0].deadline,
        totalExports : projects[0].totalExports,
        exportsDone : projects[0].exportsDone,
        exportsLog : projects[0].exportsLog,
        id : id,
      }
    }

    

  })

  res.send(stats)
})

app.post("/update-export-limit/:id" , function(req, res){
  var id = req.params.id;
  var newLimit  = req.body.newLimit
  var link  = getLinkfromId(id);
  Project.find({link : link} , function(err , project){
    project[0].totalExports = newLimit;

  })
})

app.get("/*" , function(req , res){
  res.sendFile(path.join(__dirname  , "projman"  , "build" , "index.html" ))
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



