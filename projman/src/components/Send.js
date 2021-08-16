function Send(data , type , user) {
    

    async function SendData(data , type , user) {
      console.log("here at " + type)
      const res = await fetch( "/data/" + type , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          data: data,
          user : user,
          test: "this is test message",
        }),
      });
      res.json().then((info) => {
        console.log(info);
      });
    }
    
    console.log(type);
    console.log("a project is to be made by " + user)
    SendData(data , type , user);
  }
  
  export default Send;
  