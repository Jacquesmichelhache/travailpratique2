//Jacques 06-11-2020
export let tabElementFactory = (function(){
  //Consumers of this component must create an instance of the tabElement by calling the factory 
  //Use the API of the tabElement to create tab components. 
  //Append tab content through the tab API
  
  //context static  
  let id = 1;
  function getId(){return id++}

  return function(userParams = {}){
    //private context

    let defaultParams = {}
    let params = {...defaultParams,...userParams}

    let layout = {
      wrap:null,
      navTabsCtn:null,
      tabContentCtn:null,
    }

    //to show the first tab on first draw of this component, special css is applied
    let isFirstTab = true; 
  
    //default wrap element
    layout.wrap = document.createElement("div")
    layout.wrap.textContent = "If this is visible, init has failed"

    function createLayout(){
      //This layout structure follows from the bootstrap 4 tab examples
      let wrap = document.createElement("div")
      let navTabsCtn = document.createElement("ul")
      let tabContentCtn = document.createElement("div")

      wrap.className = "d-flex flex-column align-items-center justify-content-center"
      wrap.style.width = "100%"

      navTabsCtn.className = "nav nav-tabs"
      navTabsCtn.style.width = "100%";
      navTabsCtn.setAttribute("role","tablist")

      tabContentCtn.className = "tab-content"
      tabContentCtn.style.width = "100%";
  

      wrap.appendChild(navTabsCtn)
      wrap.appendChild(tabContentCtn)

      layout.navTabsCtn = navTabsCtn;
      layout.tabContentCtn = tabContentCtn;
      layout.wrap = wrap;
    }


    function createTab(userParams={}){
      let defaultParams = {
        text:"tab"
      }      
      let params = {...defaultParams,...userParams}

      //Consumers can add tab click callbacks event through the tab API
      let clickCallBacks = [];

      //id is generated from the static context to ensure uniqueness between tabComponents
      let id = "TabComponent-" + getId().toString()
     
      let li = document.createElement("li");
      let link = document.createElement("a");
      let contentTab = document.createElement("div");

      //styling   
      li.className = "nav-item"

      link.className = isFirstTab? "nav-link active": "nav-link"
      link.setAttribute("data-toggle","tab");
      link.href = "#" + id;
      link.setAttribute("role","tab");
      link.textContent = params.text;
      link.addEventListener("click",()=>notify())

      contentTab.className = isFirstTab? "tab-pane fade show active ": "tab-pane fade"
      contentTab.id = id
      contentTab.setAttribute("role","tabpanel");
     

      //appending
      li.appendChild(link);
      layout.navTabsCtn.appendChild(li)
      layout.tabContentCtn.appendChild(contentTab)

      //API Methods
      function append(el){
        if(typeof el === "string") $(contentTab).html(el)
        else if(el instanceof HTMLElement){
          contentTab.appendChild(el)
        } 
      }
      function addClickCallBack(callback){
        clickCallBacks.push(callback)
      }
      function notify(){
        clickCallBacks.forEach((callback)=>{
          if(typeof callback === "function"){            
            callback();
          }
        })
      }

      //first tab has special css when isFirstTab is TRUE. 
      //so we turn this off following the creation of a tab
      isFirstTab = false 

      //return a tab API to the client
      return {
        append, //used to add tab content
        addClickCallBack //add callback for when user clicks on the tab header
       }      
    }


    createLayout();

    //public context (api)
    return  {
      createTab:createTab,
      getWrap:()=>{return layout.wrap} //get the wrap html element of the component
    }
  }
})()