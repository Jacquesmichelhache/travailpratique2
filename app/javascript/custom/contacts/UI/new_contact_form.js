//Jacques 06-11-2020

import {overlayFactory} from '../../utility/overlay';
import {showSnackBar} from '../../utility/snackbar'
import {sendAjax} from '../../ajax/ajax_calls'

export let contactFormFactory = (function(){
  //context static  

  return function(userParams){
    //private context
    let defaultParams = {cutomer_id:-1, onContactChange:null}    
    let params = {...defaultParams,...userParams}

    let overlay = null;
    let successObservers = [] 
    

    //Because the form is send via AJAX, we listen to rails' ajax success response
    function setCreateButton(){   
      $("#create_contact_form").on('ajax:success', createContactResponse)      
    }


    //called upon rails' successfull custumer creation
    function createContactResponse(event){    
      const [dto, status, xhr] = event.detail   
  
      if(dto.status === "success"){
        
        showSnackBar(dto.data.message)
        overlay.close();
        clientCreateNotify();       
  
      }else{       
        showSnackBar(dto.data.message)
        showErrors(dto.data.value) 
      }
    }

    function showErrors(errors){
      if(typeof errors === "object"){
        $("#contact_creation_errors").empty()
  
        //show list of errors to client
        Object.keys(errors).forEach(key => {
          let errorLabel = document.createElement("div");
          errorLabel.textContent = errors[key][0]
          errorLabel.className = "invalid-information"
          $("#contact_creation_errors").append(errorLabel)
        });
      }      
    }

    async function show(){

      let dto = await sendAjax({method: "POST", 
            params:{customer_id:params.customer_id}     ,             
            url: window.appRoutes.contacts_createForm_path,
            redirect_url: window.appRoutes.root_url})

      if(dto && dto.status === "success" ){
        overlay = overlayFactory({width:"400px"});    
  
        overlay.append(dto.data.value);  

             
        //Give a few milliseconds for the DOM to be updated with the form BEFORE
        //executing the setters       
        setTimeout(()=>{        
          setCreateButton();
        },100)      
  
        overlay.show();
      } else{
        showSnackBar("unable to load contact form from server")
      }
    }

    function registerToClientCreateEvent(obs){
      successObservers.push(obs);
    }
    function clientCreateNotify(){
      successObservers.forEach((obs)=>{
        try{
          obs();
        }catch(e){
          console.log(e.message)
        }
      })
    }

    //public context (api)
    return  {
      show:show,
      registerToClientCreateEvent:registerToClientCreateEvent
    }
  }
})()