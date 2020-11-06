
//Jacques 06-11-2020
//this component allows the creation of windows with a darkly shaded see-through background
export let overlayFactory = function (userOptions = {}) {

  let options = {
      //removes the overlay from the DOM. 
      //choose false if you want content state to persist through reopening of the overlay
      removeWhenClosed: true, 
      clickBackgroundToClose:true,     
      stopPropagation:false, //control whether events inside the overlay should bubble up to the document.body
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
  bootstrapRow.className = "row no-gutter login_row"
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
      if (e.path[0] == bootstrapRow || e.path[0] == overlay || 
          e.path[0] == rowFlex || e.path[0] ==  bootstrapCol) {
            
          if (options.clickBackgroundToClose === true) {
              $(overlay).fadeOut(250, function () {
                  if (options.removeWhenClosed === true) {
                      $(overlay).remove();
                  }
              });
          }            
      } else {
          //if event originated from a child element of flexPanel, let it go through without closing overlay
          //this is important for bootstrap components to work properly inside the flexPanel
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

  //API methods
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
  //note: Clients append content to the flexPanel Element
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