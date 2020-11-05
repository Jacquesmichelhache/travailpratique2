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

  //   <div class="d-flex flex-column align-items-center justify-content-center overlay-ctn"> 
  

  //   <ul class="nav nav-tabs" style="width:100%" id="myTab" role="tablist">
  //     <li class="nav-item">
  //       <a class="nav-link active" id="customer-tab" data-toggle="tab" href="#customer-panel" role="tab" aria-controls="customer" aria-selected="true">Customer</a>
  //     </li>
  //     <li class="nav-item">
  //       <a class="nav-link" id="contacts-tab" data-toggle="tab" href="#contacts-panel" role="tab" aria-controls="contacts" aria-selected="false">Contacts</a>
  //     </li>            
  //   </ul>

  //   <div class="tab-content" style="width:100%" id="myTabContent">
  //       <div class="tab-pane fade show active" id="customer-panel" role="tabpanel" aria-labelledby="customer-tab"></div>
  //       <div class="tab-pane fade" id="contacts-panel" role="tabpanel-tab" aria-labelledby="contacts-tab"></div>
  //   </div>

  // </div>

    function createLayout(){
      let wrap = document.createElement("div")
      let navTabsCtn = document.createElement("ul")
      let tabContentCtn = document.createElement("div")

      wrap.className = "d-flex flex-column align-items-center justify-content-center overlay-ctn"

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

      isFirstTab = false
      return {append }      
    }


    createLayout();

    //public context (api)
    return  {
      createTab:createTab,
      getWrap:()=>{return layout.wrap}
    }
  }
})()