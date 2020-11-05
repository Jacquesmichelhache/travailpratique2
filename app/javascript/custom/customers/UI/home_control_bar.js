export let control_bar_v1 = (function(){
  //context static  

  return function(userParams){
    //private context
    let defaultParams = {}
    let filterChangeObservers = []
    let newCustomerObservers = []

    defaultParams = {...defaultParams,userParams}

    //layout elements
    let layout = {
      wrap:null,
      filterInput:null,
      addCustomerBtn:null,
    }

    function createHtml(){
      let flexContainer = document.createElement("div")
      let filterInput = document.createElement("input")
      let addCustomerBtn = document.createElement("button")

      flexContainer.className = "d-flex flex-row align-items-end justify-content-between";

      filterInput.className = "form-control customer-filter-input";
      filterInput.type = "text";
      filterInput.placeholder="filter.."
      filterInput.addEventListener("input",(e)=>{
        filterChangeObservers.forEach((obs)=>{
          try{            
            obs(e.value).bind(obs)
          }catch(e){

          }
        })
      })

      addCustomerBtn.className = "btn btn-sm btn-dark"
      addCustomerBtn.textContent = "New Customer"
      addCustomerBtn.addEventListener("click",()=>{
        console.log("dsds")
        newCustomerObservers.forEach((obs)=>{
          try{            
            obs().bind(obs)
          }catch(e){
            console.log(e.message)
          }
        });
      })


      flexContainer.appendChild(filterInput)
      flexContainer.appendChild(addCustomerBtn)

      layout.filterInput = filterInput;
      layout.addCustomerBtn = addCustomerBtn;
      layout.wrap = flexContainer;
    }    

    async function init(){
      createHtml()
    }

    function addFilterChangeEvent(obs){
      filterChangeObservers.push(obs)
    }
    function addNewCustomerEvent(obs){
      newCustomerObservers.push(obs)
    }
    

    //public context (api)
    return  {
      init:init,
      registerToFilterChangeEvent:addFilterChangeEvent,
      registerToNewCustomerEvent:addNewCustomerEvent,
      getWrap:()=>layout.wrap
    }
  }
})()