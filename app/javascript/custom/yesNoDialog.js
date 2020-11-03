window.yesNoDialog = function(clientParams= {}){

  let defaultParams = {
    title:"Confirm operation",
    affirmText:"Confirm",
    denyText:"cancel"
  }

  let params = {...defaultParams,...clientParams};

  return new Promise((resolve,reject)=>{
    let overlay = document.createElement("div");
    let title = document.createElement("h2");
    let dialogContainer = document.createElement("div");
    let footer = document.createElement("div");
    let yesButton = document.createElement("button");
    let noButton = document.createElement("button");

    //styling
    title.textContent = params.title;

    footer.className = "d-flex flex-row justify-content-between align-content-center"
    footer.style.width = "85%"
    footer.style.marginTop = "20px";
    overlay.className = "overlay d-flex flex-column align-items-center"
    overlay.style.display = "none";
    
    dialogContainer.className = "yesNo-dialog-container d-flex flex-column align-items-center"
    dialogContainer.style.padding = "20px";

    yesButton.className = "btn btn-md btn-dark yesNo-btn-lg"
    yesButton.textContent = params.affirmText;

    noButton.className = "btn btn-md btn-dark yesNo-btn-lg"
    noButton.textContent = params.denyText;

    //events
    yesButton.addEventListener("click",()=>{
      $(overlay).remove();
      resolve("yes")    
    });
    noButton.addEventListener("click",()=>{
      $(overlay).remove();
      resolve("no")        
    });

    footer.appendChild(yesButton)
    footer.appendChild(noButton)

    dialogContainer.appendChild(title)
    dialogContainer.appendChild(footer)

    overlay.appendChild(dialogContainer)

    document.body.appendChild(overlay)
    $(overlay).fadeIn(250);
  });
}