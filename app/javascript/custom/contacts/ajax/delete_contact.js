window.deleteContact = async function (customerId = null, contactId=null, url = "") {  

  let x = document.getElementsByName("csrf-token")[0];
  let XSRF = x.content;

  return fetch(url,{
    method:"DELETE",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    remote:"true",
    headers:{
      "X-CSRF-Token": XSRF,
      "content-type":"application/json",
      "Accept":"application/json"
    },
    body:JSON.stringify({customerId:customerId,contactId:contactId})
  })
  .then(response=>{
    if(response.status !== 200) throw new Error(response.status)
    else return response.json()
  })
  .then(data=>{
    return data  
  }).catch(function(e){
    if(e.Error == 401){
      alert(e)
    }
  })

}