
//this is a control bar consisting of a filter input and a creation button
//clients uses this api to define both filter and create actions to their respective table objects
export let control_bar_v1 = (function(){
  //context static  

  return function(userParams){
    //private context
    let defaultParams = {
      newText:"New"
    }
    let filterChangeObservers = []
    let newEventObservers = []

    let params = {...defaultParams,...userParams}

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
        console.log("does it work")
        filterChangeEventNotify(e.currentTarget.value);
      })

      newBtn.className = "btn btn-sm btn-dark"
      newBtn.textContent = params.newText
      newBtn.addEventListener("click",()=>{       
        newEventNotify();
      })


      flexContainer.appendChild(filterInput)
      flexContainer.appendChild(newBtn)

      layout.filterInput = filterInput;
      layout.newBtn = newBtn;
      layout.wrap = flexContainer;
    }    

    async function init(){
      createHtml()
    }

    //filter observer methods
    function addFilterChangeEvent(obs){
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

    //creation observer methods
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
    

    //public context (api)
    return  {
      init:init,
      registerToFilterChangeEvent:addFilterChangeEvent,
      registerToNewEvent:registerToNewEvent,
      getWrap:()=>layout.wrap
    }
  }
})()