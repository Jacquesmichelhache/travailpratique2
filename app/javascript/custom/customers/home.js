//Jacques 06-11-2020

//datepicker must be imported first.
import {datepicker} from 'jquery-ui/ui/widgets/datepicker'; 


import {yesNoDialog} from '../utility/yesNoDialog';
import {control_bar_v1} from '../utility/control_bar_v1';
import {customerFormFactory} from './UI/new_customer_form';
import {customerInformationFactory} from './UI/customer_information';
import {showSnackBar} from '../utility/snackbar'
import {sendAjax} from '../ajax/ajax_calls'
import {editRowComponent} from '../aggrid_helpers/edit_row_component'


//Basic structure template
export let objectClass = (function(){
  //static context 

  return function(){
    //private context


    //public context (api)
    return  {

    }
  }
})()



//the homeFactory creates instances of the home page 
export let customersHomeFactory = (function homeAPI(){
  //static context

  //the root_id must reference an HTML element in the customer VIEW
  let root_id = "customer_app"
  let rootElement = null;


  return function(){
    //private context 

    let customersTable = null;
    let customersTableOptions = null;   
    let controlBar = null 

    //called by the ag-grid custom component
    let deleteButtonCallback = async (params)=>{
      //params is an agGrid object of interface ICellRendererParams. see more at:
      //https://www.ag-grid.com/javascript-grid-cell-rendering-components/

      let result = await yesNoDialog({title:"Do you really want to delete this customer?"});

      if(result === "yes"){

        //delete item                
        let dto = await sendAjax({method: "DELETE",
            params: {id:params.data.id},            
            url: window.appRoutes.customers_delete_path,
            redirect_url: window.appRoutes.root_url})

        if(dto == null){
          showSnackBar("Error: could not delete customer")
        }else if(dto.status === "success"){ 
          showSnackBar(dto.data.message)  
          await refreshCustomersTable()
        }else{
          showSnackBar(dto.data.message)  
        }
      } 
    }

    //called by the ag-grid custom component
    let editButtonCallBack = (params) =>{
      //params is an agGrid object of interface ICellRendererParams. see more at:
      //https://www.ag-grid.com/javascript-grid-cell-rendering-components/

      let form = customerInformationFactory({customer_id: params.data.id,
          onCustomerChange:()=>{
            form.close();
            refreshCustomersTable();
            }
        })
        
      form.show();     
    }    

    //used by the ag-Grid table API to format dates correctly
    //Dates are stored as UTC and shown as UTC
    function dateFormatter(params){
      let dateAsString = params.data.relationshipstart   
      let dateAsObject = new Date(Date.parse(dateAsString)); 

      return dateAsObject.getUTCDate() + "/" + (dateAsObject.getUTCMonth() + 1) + "/" + dateAsObject.getUTCFullYear();
    }  

    //used by ag-grid to sort and filter dates
    function dateComparator(date1, date2) {
      let dateObject1 = new Date(date1);
      let dateObject2 = new Date(date2);   

      return dateObject1.getTime() - dateObject2.getTime();
    }


    //used by ag-grid to defined default column configuration
    let defaultColDef = {
      cellStyle: {"line-height":"60px","font-size":"16px"},
      filter: true,
      sortable:true ,
      resizable : true
    }

    //used by ag-grid to defined specific column configuration
    let customers_column_definitions = [
      {headerName : "Name", field : "name"   },
      {headerName : "Start Date", field : "relationshipstart", valueFormatter:dateFormatter,comparator:dateComparator},
      {headerName : "Activity Type", field : "activitytype"},
      {headerName : "Email Info", field : "infoemail"},
      {headerName:"", width:120, cellRenderer:"ControlsCellRenderer", pinned: "left",resizable:false,filter:false,sortable:false,flex:2}]


    async function initCustomersTable(){

      let customers = await getCustomers(); 

      //stop if customers is null
      if(customers == null) return

      //agGrid table setup. see ag-grid documentation for more information
      customersTableOptions = {
          defaultColDef:defaultColDef,
          columnDefs: customers_column_definitions,    
          domLayout:"autoHeight",
          components:{
            ControlsCellRenderer:editRowComponent(deleteButtonCallback,editButtonCallBack)
          },
          rowData:customers.value,
          onRowDataChanged:function(event){
            let ids = customers_column_definitions.map((col)=>col.field)
            event.columnApi.autoSizeColumns(ids);
          },
          suppressCellSelection: true,
          rowHeight : 60
      };
    }

    //the actual creation of the table and insertion into the DOM
    async function buildCustomersTable(){     
      let tableContainer = document.createElement("div");

      tableContainer.className = "ag-theme-alpine"
      tableContainer.style.cssText = "width:auto;border:none;margin-top:20px"
      
    
        customersTable  = new agGrid.Grid(tableContainer, customersTableOptions);
        
        rootElement.appendChild(tableContainer) 
    }

    async function initControlBar(){
      controlBar = control_bar_v1({newText:"New Customer"});
      controlBar.registerToFilterChangeEvent(filterTable)
      controlBar.registerToNewEvent(showCustomerCreationForm)
      controlBar.init(); 
    }  
    async function builtControlBar(){
      rootElement.appendChild(controlBar.getWrap())
    }

    async function build(){
      builtControlBar()
      buildCustomersTable()
    }

    async function init(){
      //get the root element from the main VIEW
      rootElement = document.getElementById(root_id);
      await initControlBar()
      await initCustomersTable();     
    }

    //helper method
    function filterTable(filterValue){
      customersTable.gridOptions.api.setQuickFilter(filterValue)
    }

     //helper method
     function showCustomerCreationForm(){
      let form = customerFormFactory();
      form.registerToClientCreateEvent(refreshCustomersTable)
      form.show();
    } 

    async function getCustomers(){
      let dto = await sendAjax({method: "POST",
      url: window.appRoutes.customers_all_path, 
      redirect_url: window.appRoutes.root_url})

      if(dto && dto.status === "success"){
        return dto.data;        
      }else{
        //window.location.href = window.appRoutes.root_url;
      }
    }

    //helper method
    async function refreshCustomersTable(){
      let customers = await getCustomers();    
      setCustomersTable(customers.value)
    }

     //helper method
    function setCustomersTable(rowData){
      //rowData must be of object type, not string!!!
      //value must be an array of hashes:  [{..},{..}]

      if(customersTable){
        customersTable.gridOptions.api.setRowData(rowData)
      }
    }

    //public facing API
    return {
      init:init,
      build:build
    }
  }  


})()





