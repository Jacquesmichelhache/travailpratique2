import {overlayFactory} from '../../utility/overlay';
import {tabElementFactory} from '../../utility/tabElement';
import {contactsPageFactory} from '../../contacts/UI/contacts_page';
import {editCustomerFormFactory} from './edit_customer_form';
import {showSnackBar} from '../../utility/snackbar'

export let customerInformationFactory = (function(){
  //context static  

  return function(userParams = {}){
    //private context
    let overlay = null;
    //let tabLayout = null;

    let defaultParams = {
      customer_id:-1,
      onCustomerChange:null      
    }

    let params = {...defaultParams,...userParams}

    let layout = {

    }


    
    function setDatePicker(){  
      $("#customer_relationshipstart").datepicker({
        locale: "en",
        sideBySIde: true,
        dateFormat: 'dd-m-yy'     
      });
    }

    async function onCustomerUpdate(){

    }

    function createTabLayout(){
      let tabLayout = tabElementFactory();     
     // let contactsTab = tabLayout.createTab({text:"Contacts"})
      return tabLayout
    }

    async function createLayout(){  
      overlay = overlayFactory({maxWidth:"600px"});

      let tabLayout = createTabLayout();

      //create customer tab and its content
      let customerInfoTab = tabLayout.createTab({text:"Information"})
      let editForm = editCustomerFormFactory({customer_id:params.customer_id, overlay:overlay,onCustomerChange: params.onCustomerChange})
      editForm.registerToUpdate(onCustomerUpdate)
      await editForm.init();  //fetch edit form from server         
      customerInfoTab.append(editForm.getWrap())

      //create contact tab and its content
      let contactTab = tabLayout.createTab({text:"Contacts"})
      let contactsPage = contactsPageFactory({customer_id:params.customer_id});
      await contactsPage.init();
      await contactsPage.build();
      contactTab.append(contactsPage.getWrap())
      contactTab.addClickCallBack(()=>{
        setTimeout(()=>contactsPage.autoSizeColumns(),250)
      })
    
      overlay.append(tabLayout.getWrap())   
    

       //init datepicker
       setTimeout(()=>{
        setDatePicker();      
       },100)
      

       overlay.show();
    
    }  


    async function show(){
      await createLayout();

    }

   

    //public context (api)
    return  {
      show:show,
      close:()=>overlay && overlay.close()

    }
  }
})()