import {overlayFactory} from '../../utility/overlay';
import {get_edit_contact_form} from '../ajax/get_edit_form'
import {showSnackBar} from '../../utility/snackbar'

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

    let layout = {

    }   
   

    function setUpdateButton(){   
      $("#update_contact_form").on('ajax:success', updateContactResponse)      
    }

    function updateContactResponse(event){
      console.log("ajax response")
      const [data, status, xhr] = event.detail   
  
      if(data.status === "valid"){
        
        showSnackBar("Successfully saved contact")
        overlay.close();
        changeNotify();   
        
        if(typeof params.onContactChange === "function"){
          params.onContactChange();
        }  
  
      }else{
        console.log(data)
        showSnackBar("Error: Unable to save contact")
  
        if(typeof data.errors === "object"){
          showErrors(data.errors)         
        } 
      }
    }

    function showErrors(errors){
      $("#contact_update_errors").empty()
  
      //show list of errors to client
      Object.keys(errors).forEach(key => {
          let errorLabel = document.createElement("div");
          errorLabel.textContent = errors[key][0]
          errorLabel.className = "invalid-information"
          $("#contact_update_errors").append(errorLabel)
      });
    }

    async function createLayout(){  

      let response = await get_edit_contact_form(params.contact_id, window.appRoutes.contacts_editform_path, window.appRoutes.root_url)

      if(response && response.htmlString ){
        overlay = overlayFactory({width:"400px"});     

        overlay.append(response.htmlString);

        //init datepicker
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