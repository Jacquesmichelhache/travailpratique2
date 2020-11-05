import {homeFactory} from '../custom/customers/home';


document.addEventListener('DOMContentLoaded',async function(){

  let homePage = homeFactory()

  await homePage.init();

  await homePage.build();
  

},{once:true});