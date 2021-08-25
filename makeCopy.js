const {google} = require("googleapis");

const CLIENT_ID = "64080679766-lqssbjjjgi5001n8p6fdvfo98hh421hr.apps.googleusercontent.com";
const CLIENT_SECRET = "D8RvdBWASaIuqGiUQUR929HX";
const REDIRECT_URI = "https://developer.google.com/oauthplayground";

const REFRESH_TOKEN = "1//049dWRkMag-AbCgYIARAAGAQSNwF-L9IrtSx221meLIuxrmt3vtx_1fSiVM1n_lbH9tedvrAirlusW7Wl_1t8Q5aZMv1S5skyGIk"
const oauth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
)
const AUTH_CODE  = "4/0AY0e-g61vVoIMND6S7TPRADQAposd12XLnQKSbBdHA-wP-3ISj0SDo1-N_aoewgMjMflBg";
const code = "4%2F0AY0e-g4GxKqiq3rOCUynrv38_FVjJvR5qgAWGTkYcRKlzg-yWdAg3w03m5yjiEYE0fMJVg&redirect_uri=https%3A%2F%2Fdevelopers.google.com%2Foauthplayground&client_id=64080679766-lqssbjjjgi5001n8p6fdvfo98hh421hr.apps.googleusercontent.com&client_secret=D8RvdBWASaIuqGiUQUR929HX&scope=&grant_type=authorization_code"
const fileId2 = "1WETGBScuLPvASi2e4QjKZfHs3lMgKH9ivQKDQBlHQyI"
const fileId1 = "1BS9tM4I3IOEWYvhn0ZqynsC98oxy2KXixy2SLIrP3Ag"
const fileID = "1ceBIVyWKmLRKtkFbcR1YQnrUVDXVPy0h9hn3p-ZMVas"


oauth2Client.setCredentials({refresh_token : REFRESH_TOKEN});


oauth2Client.refreshAccessToken( function(err , tokens){
    if(err){
        console.log("can not refresh the acces token")
        console.log(err)
    }else(console.log(tokens.access_token))
})


async function refreshTimer(){
    await setTimeout(()=>{
        oauth2Client.refreshAccessToken(function(err , token){});
        console.log("access_token refrshed");
        refreshTimer()
    } , 3400*1000);
}

refreshTimer()

const drive = google.drive({
    version : "v3",
    auth : oauth2Client
}) 

async function makeCopy(id = fileID){
    try{

        const response = await drive.files.copy({
            fileId : id
        })
        console.log("made the API request")
        const url  = ("https://docs.google.com/spreadsheets/d/" + response.data.id);
        console.log(url);

        return url;
    }catch(err){

        console.log(err);
    }
}

async function deleteFile(id){
    try{
        const res = await drive.files.delete({
            fileId : id
        })
        console.log(res);
        console.log("SUCCESSFULLY DELETED THE FILE")
    }catch(err){
        console.log(err)
    }
}

// const perm_user = "rishi.dubey2705@gmail.com"
// const perm_file = "17ByGSzIwWHgxltnaxHsIC57uC6NMttaeLk1Jfyso4Ag"

async function grantPermission(user , file){

    let userId = ""

    // try{

    //     const res = await drive.permissions.getIdFromEmail({
    //         email : user
    //     })

    //     userId = res.id;


    // }catch(err){

    //     console.log("couldn't fetch the permissions id");
    //     console.log(err)
    // }

    try{
        console.log(drive.permissions.create)
        const res = await  drive.permissions.create({
            fileId : file,
            resource :{
                role : "writer",
                type : "user",
                value : user,
                emailAddress: user,
                
            },
            
        })

        console.log("SUCCESS!!")
        
    }catch(err){
        console.log("couldn't set the permissions for " + user);
        console.log(err)
    }

}

// grantPermission(perm_user , perm_file)
module.exports = { makeCopy , deleteFile , grantPermission}


//https://docs.google.com/spreadsheets/d/16W9jfH2j1ZaInfNcYlk85zn30jrtG_JGz3SBvmOc0nc/edit?usp=sharing