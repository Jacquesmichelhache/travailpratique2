export async function get_edit_contact_form(contact_id, url = "",redirect_url = "") {  

  let x = document.getElementsByName("csrf-token")[0];
  let XSRF = x.content;

  return fetch(url,{
    method:"POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    remote:"true",
    headers:{
      "X-CSRF-Token": XSRF,
      "content-type":"application/json",
      "Accept":"application/json"
    }   ,
    body:JSON.stringify({contact_id:contact_id})
  })
  .then(response=>{
    if(response.status !== 200) throw new Error(response.status)
    else return response.json()
  })
  .then(data=>{
    return data  
  }).catch(function(e){
    if(e.Error == 401){
      window.location.href = redirect_url
    }
  })

}