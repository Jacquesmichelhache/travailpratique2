//Jacques 06-11-2020

import {datepicker} from 'jquery-ui/ui/widgets/datepicker'; 
import {overlayFactory} from '../../utility/overlay';
import {showSnackBar} from '../../utility/snackbar';
import {setDatePicker} from '../../utility/dates_management'
import {sendAjax} from '../../ajax/ajax_calls'

export let customerFormFactory = (function(){
  //context static  

  return function(){
    //private context

    let overlay = null;
    let successObservers = [] //calls observers upon successful customer creation
      
    //Because the form is send via AJAX, we listen to rails' ajax success response
    function setCreateButton(){   
      $("#create_customer_form").on('ajax:success', createCustomerResponse)      
    }

    //called upon rails' successfull custumer creation
    function createCustomerResponse(event){
      console.log("ajax response")
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
        $("#cust_creation_errors").empty()
  
        //show list of errors to client
        Object.keys(errors).forEach(key => {
          let errorLabel = document.createElement("div");
          errorLabel.textContent = errors[key][0]
          errorLabel.className = "invalid-information"
          $("#cust_creation_errors").append(errorLabel)
        });
      }      
    }


    async function show(){  

      let dto = await sendAjax({method: "POST",                   
            url: window.appRoutes.customers_creation_form_path,
            redirect_url: window.appRoutes.root_url})

      if(dto.status === "success"){
        overlay = overlayFactory({maxWidth:"500px"});  
        overlay.append(dto.data.value);

        //init datepicker        
        //Give a few milliseconds for the DOM to be updated with the form BEFORE
        //executing the setters 
        setTimeout(()=>{
          setDatePicker(".datepicker"); //dates must be formated to UTC. this is done by calling setDatePicker
          setCreateButton(); //to hook event listeners to the submit button
        },100)      

        overlay.show();
      }  
    }

    //Observer management
    function registerToClientCreateEvent(obs){
      successObservers.push(obs);
    }
    function clientCreateNotify(){
      successObservers.forEach((obs)=>{
        try{
          obs.apply(obs); 
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