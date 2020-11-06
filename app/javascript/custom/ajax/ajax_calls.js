//Jacques 06-11-2020
export async function sendAjax (userParams = {}) {

  let defaultParams = {
    url:"",
    method:"",
    redirect_url:"",
    params:{}
  }
  let params = {...defaultParams,...userParams}
  

  let x = document.getElementsByName("csrf-token")[0];
  let XSRF = x.content;

  return fetch(params.url,{
    method: params.method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    remote:"true",
    headers:{
      "X-CSRF-Token": XSRF,
      "content-type":"application/json",
      "Accept":"application/json"
    }   , 
    body:JSON.stringify(params.params)
  })
  .then(response=>{
    if(response.status !== 200) throw new Error(response.status)
    else return response.json()
  })
  .then(data=>{
    return data  
  }).catch(function(e){
    if(e.Error == 401){
      window.location.href = params.redirect_url
    }
    console.log(e.message)
  })

}