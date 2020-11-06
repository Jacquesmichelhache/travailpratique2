import {get_edit_customer_form} from '../ajax/get_edit_form'
import {showSnackBar} from '../../utility/snackbar'

//Basic structure template
export let editCustomerFormFactory = (function(){
  //context static  

  return function(userParams = {}){
    //private context    

    let defaultParams = {customer_id:-1, onCustomerChange:null}    
    let params = {...defaultParams,...userParams}
    let layout = {wrap:null}   

    let updateObservers = [];


    //main methods
    function editCustomerResponse(event){
      console.log("ajax response")
      const [data, status, xhr] = event.detail   
  
      if(data.status === "valid"){
        
        showSnackBar("Successfully updated customer")   
        update_notify();       
     
        if(typeof params.onCustomerChange === "function"){
          params.onCustomerChange();
        }  

      }else{
        console.log(data)
        showSnackBar("Error: Unable to update customer")
  
        if(typeof data.errors === "object"){
          showErrors(data.errors)         
        } 
      }
    }

    function showErrors(errors){
      $("#cust_edit_errors").empty()
  
      //show list of errors to client
      Object.keys(errors).forEach(key => {
          let errorLabel = document.createElement("div");
          errorLabel.textContent = errors[key][0]
          errorLabel.className = "invalid-information"
          $("#cust_edit_errors").append(errorLabel)
      });
    }

    async function createLayout(){
      let form = await get_edit_customer_form(params.customer_id, window.appRoutes.customers_edit_form_path, window.appRoutes.root_url)

      let wrap = document.createElement("div")

      wrap.className = "d-flex flex-column align-items-center"
      $(wrap).html(form.htmlString);

      $(wrap).find("#edit_customer_form").on('ajax:success', editCustomerResponse) 

      layout.wrap = wrap;
    }   

    async function init(){
      await createLayout();
    }

    //helpers
    function registerToUpdate(obs){
      updateObservers.push(obs);
    }

    function update_notify(){
      updateObservers.forEach((obs)=>{
        try{
          obs().bind(obs);
        }catch(e){

        }
      })
    }

    //public context (api)
    return  {
      init:init,
      getWrap:()=>layout.wrap,
      registerToUpdate:registerToUpdate
    }
  }
})()