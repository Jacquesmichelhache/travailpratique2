//Jacques 06-11-2020
//snackbar is used to show messages to the user
//example: "Succesffully created a customer!" or "Server error"
export function showSnackBar(message = ""){
  // Get the snackbar DIV
  let snackbar = document.getElementById("snackbar");
  snackbar.textContent = message;

  // Add the "show" class to DIV
  snackbar.className = "show";

  // After 3 seconds, remove the show class from DIV
  setTimeout(function(){ snackbar.className = snackbar.className.replace("show", ""); }, 3000);
}