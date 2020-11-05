import {overlayFactory} from '../../utility/overlay';
import {tabElementFactory} from '../../utility/tabElement';
import {editCustomerFormFactory} from '../UI/edit_customer_form';


export let customerInformationFactory = (function(){
  //context static  

  return function(userParams = {}){
    //private context
    let overlay = null;
    //let tabLayout = null;

    let defaultParams = {
      id:-1,
      onCustomerChange:null      
    }

    let params = {...defaultParams,...userParams}

    let layout = {

    }


    
    function setDatePicker(){  
      $("#edit_relationshipstart").datepicker({
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
      overlay = overlayFactory();

      let tabLayout = createTabLayout();

      //create customer tab and its content
      let customerInfoTab = tabLayout.createTab({text:"Information"})
      let editForm = editCustomerFormFactory({id:params.id, overlay:overlay,onCustomerChange: params.onCustomerChange})
      editForm.registerToUpdate(onCustomerUpdate)
      await editForm.init();  //fetch edit form from server         
      customerInfoTab.append(editForm.getWrap())

      //create contact tab and its content
      let contactTab = tabLayout.createTab({text:"Contacts"})


    
      overlay.append(tabLayout.getWrap())     

      document.body.appendChild(overlay.domElement)




       //init datepicker
       setTimeout(()=>{
        setDatePicker();      
       },100)
      

       overlay.on();
    
    }  


    async function show(){
      await createLayout();

    }

   

    //public context (api)
    return  {
      show:show,
      close:()=>overlay && overlay.off()

    }
  }
})()