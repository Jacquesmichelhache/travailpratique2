
import {contactFormFactory} from './new_contact_form'
import {getCustomerContacts} from '../ajax/get_customer_contacts'
import {control_bar_v1} from '../../utility/control_bar_v1';


export let contactsPageFactory = (function(){
  //context static 



  return function(userParams={}){
    //private context

    let defaultParams = {customer_id:-1, onContactChange:null}    
    let params = {...defaultParams,...userParams}
    let layout = {wrap:null,tableContainer:null} 

    let contactsTable = null
    let contactGridOptions = null;
    let controlBar = null;

    //let updateObservers = [];


    let deleteButtonCallback = async (params)=>{
      //params is an agGrid object
      let result = await yesNoDialog();

      if(result === "yes"){

        //delete item                
        let response = await deleteContact(params.data.id, 
                                            window.appRoutes.contact_delete_path,
                                            window.appRoutes.root_url)

        if(response == null){
          showSnackBar("Error: could not delete contact")
        }else if(response.operation_status === "success"){   
          await refreshContactsTable()
        }else{
          showSnackBar(response.operation_status + ": "+response.error_message)
        }

      } 
    }

    let editButtonCallBack = (params) =>{
      let form = contactInformationFactory({contact_id: params.data.id,
          onContactChange:()=>{
            form.close();
            refreshContactsTable();
            }
        })

      form.show();     
    }



    let defaultContactColDef = {

      cellStyle: {"line-height":"60px","font-size":"16px"},
      filter: true,
      sortable:true ,
      resizable : true,    
    }

    let contact_column_definitions = [
      {headerName : "Name", field : "name" },
      {headerName : "First name", field : "firstname"},
      {headerName : "Tel", field : "tel"},
      {headerName : "Ext", field : "ext"},
      {headerName : "Email", field : "email"},
      {headerName:"", width:120, cellRenderer:"ControlsCellRenderer", pinned: "left",resizable:false,filter:false,sortable:false,flex:2}]   

    async function initContactsTable(){
      let contacts = await getCustomerContacts(params.customer_id,
          window.appRoutes.contacts_customer_contacts_path,
          window.appRoutes.root_url)

        //agGrid table setup
        contactGridOptions = {
          defaultColDef:defaultContactColDef,
          columnDefs: contact_column_definitions,    
          domLayout:"autoHeight",
          components:{
            ControlsCellRenderer:window.controlsCellRenderer(deleteButtonCallback,editButtonCallBack)
          },
          rowData: contacts && contacts.value? JSON.parse(contacts.value):null,
          onRowDataChanged:function(event){
            autoSizeColumn();
          },
          suppressCellSelection: true,
          rowHeight : 60
      };
    }
     
    function autoSizeColumn(){
      let ids = contact_column_definitions.map((col)=>col.field)
      contactsTable.gridOptions.columnApi.autoSizeColumns(ids);  
    }

    function filterTable(filterValue){
      contactsTable.gridOptions.api.setQuickFilter(filterValue)
    }

    async function refreshContactsTable(){
      let contacts = await getCustomerContacts(params.customer_id, 
        window.appRoutes.customers_customer_contacts_path,
        window.appRoutes.root_url)

      setContactsTable(JSON.parse(contacts.value))
    }

    function setContactsTable(rowData){
      //rowData must be of object type, not string!!!

      if(contactsTable){
        contactsTable.gridOptions.api.setRowData(rowData)
      }
    }

    function newContact(){
      let form = contactFormFactory({customer_id:params.customer_id});
      form.registerToClientCreateEvent(refreshContactsTable)
      form.show();
    } 

    async function initControlBar(){
      controlBar = control_bar_v1({newText:"New Contact"});
      controlBar.registerToFilterChangeEvent(filterTable)
      controlBar.registerToNewEvent(newContact)
      controlBar.init(); 
    }  
    async function builtControlBar(){
      layout.wrap.appendChild(controlBar.getWrap())
    }


    function createLayout(){   
      //layout  
      layout.wrap = document.createElement("div")
      layout.wrap.className = "d-flex flex-column align-items-center"
      layout.wrap.style.width = "100%"
      layout.wrap.style.height = "100%" 
      layout.wrap.style.paddingTop = "20px"
    }


    async function buildContactsTable(){     
      let tableContainer = document.createElement("div");

      tableContainer.className = "ag-theme-alpine"
      tableContainer.style.cssText = "width:100%;border:none;margin-top:20px"
      
      contactsTable  = new agGrid.Grid(tableContainer, contactGridOptions);

      layout.wrap.appendChild(tableContainer)
    }


    async function build(){
      builtControlBar()
      buildContactsTable()
    }

    async function init(){
      createLayout();
   
      await initControlBar()
      await initContactsTable();  
    }   
    


    //public context (api)
    return  {
      init:init,
      build:build,
      getWrap:()=>{return layout.wrap},
      autoSizeColumns:()=>autoSizeColumn()
    }
  }
})()