//Jacques 06-11-2020
//refer to ag-grid API documentation
export function editRowComponent(deleteCallback, editCallback){

  return function(params){
    let wrap = document.createElement("div");
    let deleteButton = document.createElement("button");
    let editButton = document.createElement("button");
    let deleteButtonIcon = document.createElement("i");
    let editButtonIcon = document.createElement("i");
    
    //styling
    wrap.className = "d-flex flex-row align-items-center justify-content-between";
    wrap.style.width = "100%";
    wrap.style.height = "100%";
    wrap.style.padding = "5px";

    deleteButtonIcon.className = "fas fa-trash-alt"
    deleteButtonIcon.title = "edit customer information"
    deleteButton.className = "btn btn-sm btn-dark"
   
    editButton.className = "btn btn-sm btn-dark"
    editButtonIcon.className = "fas fa-edit"

  


    editButton.style.margin = "3px";
    deleteButton.style.margin = "3px";   

    //events
    deleteButton.addEventListener("click",async (e)=>{
      try{
        deleteCallback(params)
      }catch(e){
        console.log(e.message)
      }         
    });

    editButton.addEventListener("click",(e)=>{
      try{
        editCallback(params)
      }catch(e){
        console.log(e.message)
      }      
    });


    //append
    deleteButton.appendChild(deleteButtonIcon)
    editButton.appendChild(editButtonIcon)

    wrap.appendChild(deleteButton)
    wrap.appendChild(editButton)
    
    return wrap;
  }
}