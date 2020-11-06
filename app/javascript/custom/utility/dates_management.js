export  function setDatePicker(cssSelector = ""){  
  $(cssSelector).datepicker({
    locale: "en",
    sideBySIde: true,
    dateFormat: 'dd-m-yy'     
  });
}