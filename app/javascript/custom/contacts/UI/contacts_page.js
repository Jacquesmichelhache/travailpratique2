//Jacques 06-11-2020

import {contactFormFactory} from './new_contact_form'
import {editContactFormFactory} from './edit_contact_form'
import {control_bar_v1} from '../../utility/control_bar_v1';
import {yesNoDialog} from '../../utility/yesNoDialog';
import {showSnackBar} from '../../utility/snackbar'
import {sendAjax} from '../../ajax/ajax_calls'
import {editRowComponent} from '../../aggrid_helpers/edit_row_component'

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

     //called by the ag-grid custom component
    let deleteButtonCallback = async (tableRow)=>{
      //tableRow is an agGrid object of interface ICellRendererParams. see more at:
      //https://www.ag-grid.com/javascript-grid-cell-rendering-components/
     
      let result = await yesNoDialog({title:"Do you really want to delete this contact?"});

      if(result === "yes"){

        //delete item   
        let dto = await sendAjax({method: "DELETE", 
            params:{customer_id:params.customer_id, contact_id: tableRow.data.id },             
            url: window.appRoutes.contacts_delete_path,
            redirect_url: window.appRoutes.root_url})

        if(dto && dto.status === "success"){
          showSnackBar(dto.data.message)
          await refreshContactsTable()
        }else if(dto){
          showSnackBar(dto.data.message)
        }else{
          showSnackBar("Error: could not delete contact")
        }  
      } 
    }

     //called by the ag-grid custom component
    let editButtonCallBack = (tableRow) =>{
      //tableRow is an agGrid object of interface ICellRendererParams. see more at:
      //https://www.ag-grid.com/javascript-grid-cell-rendering-components/

      let form = editContactFormFactory({
        contact_id: tableRow.data.id,
        onContactChange:()=>{
          form.close();
          refreshContactsTable();
          }
        })

      form.show();     
    }

    //used by ag-grid to defined default column configuration
    let defaultContactColDef = {

      cellStyle: {"line-height":"60px","font-size":"16px"},
      filter: true,
      sortable:true ,
      resizable : true,    
    }

    //used by ag-grid to defined specific column configuration
    let contact_column_definitions = [
      {headerName : "Name", field : "name" },
      {headerName : "First name", field : "firstname"},
      {headerName : "Tel", field : "tel"},
      {headerName : "Ext", field : "ext"},
      {headerName : "Email", field : "email"},
      {headerName:"", width:120, cellRenderer:"ControlsCellRenderer", pinned: "left",resizable:false,filter:false,sortable:false,flex:2}]   


    async function initContactsTable(){

        let response = await getCustomerContacts(params.customer_id)

        //agGrid table setup. see ag-grid documentation for more information
        contactGridOptions = {
          defaultColDef:defaultContactColDef,
          columnDefs: contact_column_definitions,    
          domLayout:"autoHeight",
          components:{
            ControlsCellRenderer:editRowComponent(deleteButtonCallback,editButtonCallBack)
          },
          rowData: response.value,
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

    async function getCustomerContacts(customer_id){
      let dto = await sendAjax({method: "POST", 
          params:{customer_id:customer_id},             
          url: window.appRoutes.contacts_customer_contacts_path,
          redirect_url: window.appRoutes.root_url})

      if(dto && dto.status === "success"){
        return dto.data
      }else if(dto && dto.data){
        showSnackBar(dto.data.message)
      }else showSnackBar("fatal error in getCustomerContacts")
    }

    async function refreshContactsTable(){
      let response = await getCustomerContacts(params.customer_id)
         
      setContactsTable(response.value)
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