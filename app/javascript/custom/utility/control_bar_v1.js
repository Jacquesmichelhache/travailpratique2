//Jacques 06-11-2020
//this is a control bar consisting of a filter input and a creation button
//clients uses this api to define both filter and create actions to their respective table objects
export let control_bar_v1 = (function(){
  //context static  

  return function(userParams){
    //private context

    let defaultParams = {
      newText:"New" //button text for the creation button
    }  
    let params = {...defaultParams,...userParams}

    //observers
    let filterChangeObservers = []
    let newEventObservers = []

    //layout elements
    let layout = {
      wrap:null,
      filterInput:null,
      newBtn:null,
    }

    function createHtml(){
      let flexContainer = document.createElement("div")
      let filterInput = document.createElement("input")
      let newBtn = document.createElement("button")

      flexContainer.className = "d-flex flex-row align-items-end justify-content-between";
      flexContainer.style.width = "100%"

      filterInput.className = "form-control filter-input";
      filterInput.type = "text";
      filterInput.placeholder="filter.."
      filterInput.addEventListener("input",(e)=>{       
        filterChangeEventNotify(e.currentTarget.value);
      })

      newBtn.className = "btn btn-sm btn-dark"
      newBtn.textContent = params.newText
      newBtn.addEventListener("click",()=>newEventNotify())

      flexContainer.appendChild(filterInput)
      flexContainer.appendChild(newBtn)

      layout.filterInput = filterInput;
      layout.newBtn = newBtn;
      layout.wrap = flexContainer;
    }    

    

    //observer management for the filter change event
    function registerToFilterChangeEvent(obs){
      filterChangeObservers.push(obs)
    }
    function filterChangeEventNotify(value){
      filterChangeObservers.forEach((obs)=>{
        try{    
          obs.apply(obs,[value]);  
        }catch(e){
          console.log(e.message)
        }
      })
    }

    //observer management for the creation button click event
    function registerToNewEvent(obs){
      newEventObservers.push(obs)
    }
    function newEventNotify(){
      newEventObservers.forEach((obs)=>{
        try{            
          obs.apply(obs);
        }catch(e){
          console.log(e.message)
        }
      });
    }
    

    function init(){
      createHtml()
    }

    //public context (api)
    return  {
      init:init, //client must initialize the component before use in interface
      registerToFilterChangeEvent:registerToFilterChangeEvent,
      registerToNewEvent:registerToNewEvent,
      getWrap:()=>layout.wrap //will return null if user does not initialize component
    }
  }
})()