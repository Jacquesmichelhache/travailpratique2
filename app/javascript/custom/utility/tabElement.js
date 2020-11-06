//Basic structure template
export let tabElementFactory = (function(){
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
    let isFirstTab = true;
  

    function createLayout(){
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
      let clickCallBacks = [];
      let params = {...defaultParams,...userParams}

      let li = document.createElement("li");
      let link = document.createElement("a");
      let contentTab = document.createElement("div");

      let id = "Customer-Information-tab-" + getId().toString()

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
     
      li.appendChild(link);

      layout.navTabsCtn.appendChild(li)
      layout.tabContentCtn.appendChild(contentTab)

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

      isFirstTab = false
      return {
        append,
        addClickCallBack
       }      
    }


    createLayout();

    //public context (api)
    return  {
      createTab:createTab,
      getWrap:()=>{return layout.wrap}
    }
  }
})()