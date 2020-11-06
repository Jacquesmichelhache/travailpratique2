//Jacques 06-11-2020

import {overlayFactory} from '../../utility/overlay';
import {showSnackBar} from '../../utility/snackbar'
import {sendAjax} from '../../ajax/ajax_calls'

export let editContactFormFactory = (function(){
  //context static  

  return function(userParams = {}){
    //private context
    let overlay = null;
    let changeObservers = []

    let defaultParams = {
      contact_id:-1,
      onContactChange:null      
    }

    let params = {...defaultParams,...userParams} 


     //Because the form is send via AJAX, we listen to rails' ajax success response
    function setUpdateButton(){   
      $("#update_contact_form").on('ajax:success', updateContactResponse)      
    }


    //called upon rails' successfull custumer creation
    function updateContactResponse(event){    
      const [dto, status, xhr] = event.detail   
  
      
      if(dto.status === "success"){
        
        showSnackBar(dto.data.message)
        overlay.close();
        changeNotify();   
        
        if(typeof params.onContactChange === "function"){
          params.onContactChange();
        }  
  
      }else{
      
        showSnackBar(dto.data.message)
        showErrors(dto.data.value) 
      }
    }

    function showErrors(errors){
      if(typeof errors === "object"){
        $("#contact_update_errors").empty()
  
        //show list of errors to client
        Object.keys(errors).forEach(key => {
            let errorLabel = document.createElement("div");
            errorLabel.textContent = errors[key][0]
            errorLabel.className = "invalid-information"
            $("#contact_update_errors").append(errorLabel)
        });
      }      
    }

    async function createLayout(){  

      let dto = await sendAjax({method: "POST", 
            params:{contact_id:params.contact_id},             
            url: window.appRoutes.contacts_editform_path,
            redirect_url: window.appRoutes.root_url})

      if(dto && dto.status === "success" ){
        overlay = overlayFactory({width:"400px"});     

        overlay.append(dto.data.value);

        //Give a few milliseconds for the DOM to be updated with the form BEFORE
        //executing the setters 
        setTimeout(()=>{         
          setUpdateButton();
        },100)      

        overlay.show();
      }   
    } 


    async function show(){
      await createLayout();
    }

    function registerToChangeEvent(obs){
      changeObservers.push(obs);
    }
    function changeNotify(){
      changeObservers.forEach((obs)=>{
        try{
          obs().bind(obs);
        }catch(e){

        }
      })
    }   

    //public context (api)
    return  {
      show:show,
      close:()=>overlay && overlay.close(),
      registerToChangeEvent:registerToChangeEvent
    }
  }
})()