function EditSend(data , type) {
    

    async function EditSendData(data , type) {
      console.log("here at " + type)
      const res = await fetch( "/edit/" + type , {
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
    console.log(data)
    EditSendData(data , type);
  }
  
  export default EditSend;