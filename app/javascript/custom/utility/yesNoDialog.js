//Jacques 06-11-2020
//This is a non blocking (async) user prompt
export function yesNoDialog(clientParams= {}){

  let defaultParams = {
    title:"Confirm operation",
    affirmText:"Confirm",
    denyText:"cancel"
  }

  let params = {...defaultParams,...clientParams};


  //the yesNoDialog waits, in a non-blocking way for a YES or NO response 
  return new Promise((resolve,reject)=>{
    let overlay = document.createElement("div");
    let title = document.createElement("h4");
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
    
    dialogContainer.className = "yesno-dialog-container d-flex flex-column align-items-center"
    dialogContainer.style.padding = "20px";
    dialogContainer.style.marginTop = "30px";

    yesButton.className = "btn btn-md btn-dark yesno-btn-lg"
    yesButton.textContent = params.affirmText;

    noButton.className = "btn btn-md btn-dark yesno-btn-lg"
    noButton.textContent = params.denyText;

    //events
    yesButton.addEventListener("click",()=>{
      $(overlay).remove(); //cleaning up DOM
      resolve("yes")    
    });
    noButton.addEventListener("click",()=>{
      $(overlay).remove(); //cleaning up DOM
      resolve("no")        
    });


    //appending
    footer.appendChild(yesButton)
    footer.appendChild(noButton)

    dialogContainer.appendChild(title)
    dialogContainer.appendChild(footer)

    overlay.appendChild(dialogContainer)

    document.body.appendChild(overlay)

    //show the yesNoDialog to the user
    $(overlay).fadeIn(250);
    
  });
}