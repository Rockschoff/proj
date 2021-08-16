var Task = {
    heading : "edit scene 2",
    description : "make the changes discussed in scene2.",
    assigned : "20-05-21",
    deadline : "30-05-21",
    urgent : false  
}

var jayden = {
    name : "Jayden",
    email : "jayden@gmail.com",
    role : "design",
    _id : 1,
    
    tasks : [Task , Task , Task],
    special : "I like this person"
}

var beth = {
    name : "Beth",
    _id : 1,
    email : "beth@gmail.com",
    role : "design",
    
    tasks : [Task , Task , Task],
    special : "I like this person"
}

var chris = {
    name : "Chris",
    _id : 1,
    email : "chris@gmail.com",
    role : "design",
    tasks : [Task , Task , Task],
    special : "I like this person"
}

var proj1 = {
    name : "Proj1",
    org : "ABC",
    _id : "1",
    link : "www.google.com",
    start : "15-05-21",
    deadline : "15-06-21",
    members : [jayden , beth , chris],
    checkpoints : ["Assign the tasks" ,  "Make the story" , "Render the story"],
    special : ["Client has his own script"],
    status : "Ongoing"
}

var proj2 = {
    name : "Proj2",
    org : "XYZ",
    _id : "2",
    link : "www.google.com",
    start : "20-05-21",
    deadline : "17-06-21",
    members : [jayden , beth , chris],
    checkpoints : ["Assign the tasks" ,  "Make the story" , "Render the story"],
    special : ["Client has his own script"],
    status : "Ongoing"
}

var data = [proj1 , proj2]

export default data;

