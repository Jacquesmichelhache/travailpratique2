//Jacques 06-11-2020

import {showSnackBar} from '../../utility/snackbar'
import {sendAjax} from '../../ajax/ajax_calls'

export let editCustomerFormFactory = (function(){
  //context static  

  return function(userParams = {}){
    //private context    

    let defaultParams = {customer_id:-1, onCustomerChange:null}    
    let params = {...defaultParams,...userParams}

    let layout = {wrap:null}   
    let updateObservers = []; //for calling registered events when customer is updated


    //main methods
    function editCustomerResponse(event){  
      try{
        const [dto, status, xhr] = event.detail   
  
        if(dto.status === "success"){
          
          showSnackBar(dto.data.message)   
          update_notify(); 
          
          if(typeof params.onCustomerChange === "function"){
            params.onCustomerChange();
          }  

        }else{         
          showSnackBar(dto.data.message)
    
          if(typeof dto.data.value === "object"){
            showErrors(dto.data.value)         
          } 
        }
      }catch(e){
        console.log(e.message)
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

      let dto = await sendAjax({method: "POST",       
            params:{id:params.customer_id} ,           
            url: window.appRoutes.customers_edit_form_path,
            redirect_url: window.appRoutes.root_url})

      if(dto.status === "success"){
        let wrap = document.createElement("div")

        wrap.className = "d-flex flex-column align-items-center"
        $(wrap).html(dto.data.value);

        $(wrap).find("#edit_customer_form").on('ajax:success', editCustomerResponse) 

        layout.wrap = wrap;

      }else{
        showSnackBar(dto.data.message)
      }
      
    }   

    async function build(){

    }

    async function init(){
      await createLayout();
    }

    //observer management
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
      build:build,
      getWrap:()=>layout.wrap,
      registerToUpdate:registerToUpdate
    }
  }
})()