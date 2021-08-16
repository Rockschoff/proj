function DeleteSend(data , type) {
    

    async function DeleteSendData(data , type) {
      console.log("here at " + type)
      const res = await fetch( "/delete/" + type , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          data: data,
          test: "this is test message",
        }),
      });
      res.json().then((info) => {
        console.log(info);
      });
    }
    
    console.log(type)
    DeleteSendData(data , type);
  }
  
  export default DeleteSend;
  