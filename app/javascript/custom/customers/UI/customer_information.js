//Jacques 06-11-2020

import {overlayFactory} from '../../utility/overlay';
import {tabElementFactory} from '../../utility/tabElement';
import {contactsPageFactory} from '../../contacts/UI/contacts_page';
import {editCustomerFormFactory} from './edit_customer_form';
import {showSnackBar} from '../../utility/snackbar'
import {setDatePicker} from '../../utility/dates_management'
import {sendAjax} from '../../ajax/ajax_calls'

export let customerInformationFactory = (function(){
  //context static  

  return function(userParams = {}){
    //private context   

    let defaultParams = {
      customer_id:-1,
      onCustomerChange:null      
    }
    let params = {...defaultParams,...userParams}

    let overlay = null;
      

    function createTabLayout(){
      let tabLayout = tabElementFactory();        
      return tabLayout
    }

    async function createLayout(){  
      overlay = overlayFactory({maxWidth:"600px"});

      let tabLayout = createTabLayout();

      //create customer tab and its content
      let customerInfoTab = tabLayout.createTab({text:"Information"})
      let editForm = editCustomerFormFactory({customer_id:params.customer_id, overlay:overlay,onCustomerChange: params.onCustomerChange})    
      await editForm.init();  //fetch edit form from server   
      await editForm.build();       
      customerInfoTab.append(editForm.getWrap())

      //create contact tab and its content
      let contactTab = tabLayout.createTab({text:"Contacts"})
      let contactsPage = contactsPageFactory({customer_id:params.customer_id});
      await contactsPage.init();
      await contactsPage.build();
      contactTab.append(contactsPage.getWrap())
      contactTab.addClickCallBack(()=>{
        //every time the user clicks on the tab, the contacts table 
        //columns will be resized to fit their content
        setTimeout(()=>contactsPage.autoSizeColumns(),250)
      })
    
      overlay.append(tabLayout.getWrap())   
    

       //init datepicker
       setTimeout(()=>{
        setDatePicker("#customer_relationshipstart");      
       },100)
      

       overlay.show();    
    }  

    async function show(){
      await createLayout();
    }   

    //public facing API
    return  {
      show:show,
      close:()=>overlay && overlay.close()
    }
  }
})()