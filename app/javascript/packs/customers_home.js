import {customersHomeFactory} from '../custom/customers/home';
import {snackbar as showSnackBar} from '../custom/utility/snackbar'


document.addEventListener('DOMContentLoaded',async function(){

  let homePage = customersHomeFactory()

  await homePage.init();

  await homePage.build();
  

},{once:true});