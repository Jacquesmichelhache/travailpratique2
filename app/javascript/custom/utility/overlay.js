export let overlayFactory = function (panelWidth = "75%", panelHeight = "auto", userOptions = {}) {

  let overlay = document.createElement("div");
  let columnFlex = document.createElement("div");
  let panel = document.createElement("div");
  let panelColumnFlex = document.createElement("div");

  let options = {
      removeWhenClosed: true,
      clickBackgroundToClose:true,
      minWidth: "",
      maxWidth: "",
      minHeight: "400px",
      maxHeight: "",
      stopPropagation:false,
  }
  options = { ...JSON.parse(JSON.stringify(options)), ...userOptions}

  columnFlex.className = "d-flex flex-column flex-nowrap align-items-center";
  columnFlex.style.backgroundColor = "transparent";
  columnFlex.style.height = "100%";
  columnFlex.dataset["overlay"] = "true";
  

  panel.className = "d-flex flex-column flex-nowrap align-items-center";
  panel.style.position = "relative";
  panel.style.width = panelWidth;
  panel.style.height = panelHeight;   
  panel.style.minWidth = options.minWidth;
  panel.style.maxWidth = options.maxWidth;
  panel.style.minHeight = options.minHeight;
  panel.style.maxHeight = options.maxHeight;
  panel.style.backgroundColor = "white";
  panel.style.padding = "20px";
  panel.style.marginTop = "20px";


  panelColumnFlex.className = "d-flex flex-column flex-nowrap";
  panelColumnFlex.style.overflow = "auto";
  panelColumnFlex.style.width = "100%"
  panelColumnFlex.style.height = "100%";


  panel.appendChild(panelColumnFlex);

  columnFlex.appendChild(panel);

  overlay.className = "filedialog-overlay";     
  overlay.dataset["overlay"] = "true";
  overlay.style.overflowX = "auto";      
  overlay.addEventListener("mousedown", (e) => {
      if (e.path[0] == columnFlex) {
          if (options.clickBackgroundToClose === true) {
              $(overlay).fadeOut(250, function () {
                  if (options.removeWhenClosed === true) {
                      $(overlay).remove();
                  }
              });
          }            
      } else {
          //if event came from panel, let it go through without closing overlay
      }              
  });
  overlay.addEventListener("click", (e) => {
      if (options.stopPropagation === true) {
          e.stopPropagation();
      }
  })
  overlay.appendChild(columnFlex);


  document.body.appendChild(overlay)

  let returnObject =
  {
      domElement: overlay,
      on: function () {
          $(overlay).fadeIn();          
      },
      off: function () {
          $(overlay).fadeOut(250, function () {
              if (options.removeWhenClosed === true) {
                  $(overlay).remove();
              }
          });           
      },
      getBodyElement: function () {
          return panelColumnFlex;
      },
      removeWhenClosed:false,
      append:function(el){
          if(el instanceof HTMLElement){
            panelColumnFlex.appendChild(el)
          }  else if(typeof el === "string"){
            panelColumnFlex.innerHTML = el;
          }       
      }      
  };
  return returnObject;
};