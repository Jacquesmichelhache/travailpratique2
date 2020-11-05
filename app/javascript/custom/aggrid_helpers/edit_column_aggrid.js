window.controlsCellRenderer = function(deleteCallback, editCallback){

  return function(params){
    let wrap = document.createElement("div");
    let deleteButton = document.createElement("button");
    let editButton = document.createElement("button");
    
    //styling
    wrap.className = "d-flex flex-row align-items-center justify-content-center";
    wrap.style.width = "100%";
    wrap.style.height = "100%";
    wrap.style.padding = "5px";

    deleteButton.className = "btn btn-sm btn-dark"
    editButton.className = "btn btn-sm btn-dark"

    editButton.style.margin = "3px";
    deleteButton.style.margin = "3px";
    
    deleteButton.textContent = "delete"
    editButton.textContent = "edit"

    //events
    deleteButton.addEventListener("click",async (e)=>{
      try{
        deleteCallback(params)
      }catch(e){
        console.log(e.message)
      }

      // let result = await yesNoDialog();

      // if(result === "yes"){

      //   //delete item                
      //   let response = await deleteCustomer(params.data.id,"<%= customers_delete_url %>",'<%= root_url%>')

      //   if(response.operation_status === "success"){          
      //     location.reload()
      //   }else{
      //     showSnackBar(response.operation_status + ": "+response.error_message)
      //   }
      // }      
    });

    editButton.addEventListener("click",(e)=>{
      try{
        editCallback(params)
      }catch(e){
        console.log(e.message)
      }
      //show_edit_panel(params.data.id);    
    });


    //append
    wrap.appendChild(deleteButton)
    wrap.appendChild(editButton)
    
    return wrap;
  }
}