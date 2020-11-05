import {get_new_customer_form} from '../ajax/get_new_customer_form';
import {overlayFactory} from '../../utility/overlay';


//Basic structure template
export let customerFormFactory = (function(){
  //context static  

  return function(){
    //private context
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
      $("#create_customer_form").on('ajax:success', createCustomerResponse)      
    }

    function createCustomerResponse(event){
      console.log("ajax response")
      const [data, status, xhr] = event.detail   
  
      if(data.status === "valid"){
        
        showSnackBar("Successfully created a customer")
        overlay.off();
        clientCreateNotify();       
  
      }else{
        console.log(data)
        showSnackBar("Error: Unable to create customer")
  
        if(typeof data.errors === "object"){
          showErrors(data.errors)         
        } 
      }
    }

    function showErrors(errors){
      $("#cust_creation_errors").empty()
  
      //show list of errors to client
      Object.keys(errors).forEach(key => {
          let errorLabel = document.createElement("div");
          errorLabel.textContent = errors[key][0]
          errorLabel.className = "invalid-information"
          $("#cust_creation_errors").append(errorLabel)
      });
    }

    async function show(){
      let response = await get_new_customer_form(window.appRoutes.customers_creation_form_path, window.appRoutes.root_url)

      overlay = overlayFactory();
      document.body.appendChild(overlay.domElement)

      overlay.append(response.customerView);

       //init datepicker
       setTimeout(()=>{
        setDatePicker();
        setCreateButton();
       },100)
      

      overlay.on(); 
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