import {getNewContactForm} from '../../contacts/ajax/new_contact';
import {overlayFactory} from '../../utility/overlay';
import {showSnackBar} from '../../utility/snackbar'

//Basic structure template
export let contactFormFactory = (function(){
  //context static  

  return function(userParams){
    //private context
    let defaultParams = {cutomer_id:-1, onContactChange:null}    
    let params = {...defaultParams,...userParams}

    let overlay = null;
    let successObservers = []

    function setDatePicker(){  
      $(".datepicker").datepicker({
        locale: "en",
        sideBySIde: true,
        dateFormat: 'dd-m-yy'     
      });
    }
    
    function setCreateButton(){   
      $("#create_contact_form").on('ajax:success', createContactResponse)      
    }

    function createContactResponse(event){
      console.log("ajax response")
      const [data, status, xhr] = event.detail   
  
      if(data.status === "valid"){
        
        showSnackBar("Successfully created a contact")
        overlay.close();
        clientCreateNotify();       
  
      }else{
        console.log(data)
        showSnackBar("Error: Unable to create contact")
  
        if(typeof data.errors === "object"){
          showErrors(data.errors)         
        } 
      }
    }

    function showErrors(errors){
      $("#contact_creation_errors").empty()
  
      //show list of errors to client
      Object.keys(errors).forEach(key => {
          let errorLabel = document.createElement("div");
          errorLabel.textContent = errors[key][0]
          errorLabel.className = "invalid-information"
          $("#contact_creation_errors").append(errorLabel)
      });
    }

    async function show(){
      let response = await getNewContactForm(params.customer_id, window.appRoutes.contacts_new_path, window.appRoutes.root_url)


      if(response && response.value ){
        overlay = overlayFactory({width:"400px"});
       // document.body.appendChild(overlay.domElement)
  
        overlay.append(response.value);
  
         //init datepicker
         setTimeout(()=>{
          setDatePicker();
          setCreateButton();
         },100)      
  
        overlay.show();
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