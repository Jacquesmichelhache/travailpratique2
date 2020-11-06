//this is a overlay utility component

export let overlayFactory = function (userOptions = {}) {

    let options = {
        removeWhenClosed: true, //clear dom elements if true
        clickBackgroundToClose:true,     
        stopPropagation:false, //should be false, if not, some componenets inside panel may not work properly
        width:"100%",
        maxWidth:"",
        minWidth:"200px"
    }
    options = { ...JSON.parse(JSON.stringify(options)), ...userOptions}

  let overlay = document.createElement("div");
  let bootstrapRow = document.createElement("div");
  let bootstrapCol = document.createElement("div");
  let rowFlex = document.createElement("div"); 
  let flexPanel = document.createElement("div"); 
    
  //styling
  bootstrapRow.className = "row no-gutter"
  bootstrapCol.className = "col-sm-12 col-md-8 offset-md-2"
  rowFlex.className = "d-flex flex-row justify-content-center"
  flexPanel.className = "d-flex flex-column align-items-center justify-content-center overlay-ctn"
  overlay.className = "overlay";    

  rowFlex.style.width = "100%"

  flexPanel.style.width = options.width
  flexPanel.style.maxWidth = options.maxWidth
  flexPanel.style.minWidth = options.minWidth
  flexPanel.style.marginTop = "20px"
  
  //events
  overlay.addEventListener("mousedown", (e) => {

      //close overlay if user mousedown on it, or apply user settings otherwise
      if (e.path[0] == bootstrapRow || e.path[0] == overlay || e.path[0] == rowFlex) {
          if (options.clickBackgroundToClose === true) {
              $(overlay).fadeOut(250, function () {
                  if (options.removeWhenClosed === true) {
                      $(overlay).remove();
                  }
              });
          }            
      } else {
          //if event originated from a child element of panel, let it go through without closing overlay
          //this is important for bootstrap components to work properly
      }              
  });
  overlay.addEventListener("click", (e) => {
      if (options.stopPropagation === true) {
          e.stopPropagation();
      }
  })

  //appending
  rowFlex.appendChild(flexPanel)
  bootstrapCol.appendChild(rowFlex)
  bootstrapRow.appendChild(bootstrapCol) 
  overlay.appendChild(bootstrapRow);
  document.body.appendChild(overlay)

  //methods
  function append(el){
    if(el instanceof HTMLElement){
        flexPanel.appendChild(el)
      }  else if(typeof el === "string"){
        flexPanel.innerHTML = el;
    }
  }
  function close(){
    $(overlay).fadeOut(250, function () {
        if (options.removeWhenClosed === true) {
            $(overlay).remove();
        }
    }); 
  }
  function show(){
    $(overlay).fadeIn()
  }


  //public facing API
  let returnObject =
  {
      domElement: overlay,
      show, close,      
      removeWhenClosed:false,
      append:append,
      getBodyElement: ()=>flexPanel
    
  };

  return returnObject;
};