import {datepicker} from 'jquery-ui/ui/widgets/datepicker';
import {getCustomers} from './ajax/all_customers';
import {yesNoDialog} from '../utility/yesNoDialog';
import {control_bar_v1} from './UI/home_control_bar';

import {customerFormFactory} from './UI/new_customer_form';
import {customerInformationFactory} from './UI/customer_information';
import {deleteCustomer} from './ajax/delete_customer';


//import {editCustomers} from 


//Basic structure template
export let objectClass = (function(){
  //context static  

  return function(){
    //private context


    //public context (api)
    return  {


    }
  }
})()


export let homeFactory = (function homeAPI(){
  //static context
  let root_id = "customer_app"
  let rootElement;


  return function(){
    //private context (user context)
    let customersTable = null;
    let customersTableOptions = null;
    let costumer_id = -1; 
    let controlBar = null

    // $("#newCustomerBtn").on("click",()=>{
    //     $("#newCustomerContainer").fadeIn()
    // }); 

    //closes edit contact overlay only when user clicks outside of the panel
    // let edit_overlay = document.getElementById("edit-overlay")
    // edit_overlay.addEventListener("mousedown", (e) => {
    //       if (e.path[1] && e.path[1] == edit_overlay || e.path[0] == edit_overlay) {
    //         $("#customer_ctn").fadeOut();
    //       }
    // }) 


    // function setEvents(){ 
    //   //init datepicker
    //   $("#edit_relationshipstart").datepicker({
    //     locale: "en",
    //     sideBySIde: true,
    //     dateFormat: 'dd-m-yy'     
    //   });    
    // }


    // async function show_edit_panel(cust_id = null){  
    //   let customer_info = await getCustomer(cust_id,window.appRoutes.customers_edit_url,window.appRoutes.root_url)
    //   costumer_id = cust_id

    //   $("#customer-panel").empty()
    //   $("#contacts-panel").empty()
    //   // $("#contacts_page_script").remove(0)
        
    //   $("#customer-name").html(customer_info.customerName)
    //   $("#customer-panel").append(customer_info.customerView)
    //   $("#contacts-panel").append(customer_info.contactView)
      
    //   $("#customer_ctn").fadeIn()     

    //   //delays execution to ensure that the views are rendered in the DOM
    //   setTimeout(()=>setEvents(),300);
          
    // }

    let deleteButtonCallback = async (params)=>{
      //params is an agGrid object
      let result = await yesNoDialog();

      if(result === "yes"){

        //delete item                
        let response = await deleteCustomer(params.data.id, 
                                            window.appRoutes.customers_delete_path,
                                            window.appRoutes.root_url)

        if(response == null){
          showSnackBar("Error: could not delete customer")
        }else if(response.operation_status === "success"){   
          await refreshCustomersTable()       
          // let customers = await getCustomers(window.appRoutes.customers_all_path,window.appRoutes.root_url)
          // setCustomersTable(JSON.parse(customers.value))
        }else{
          showSnackBar(response.operation_status + ": "+response.error_message)
        }

      } 
    }

    let editButtonCallBack = (params) =>{
      let form = customerInformationFactory({id: params.data.id,
          onCustomerChange:()=>{
            form.close();
            refreshCustomersTable();
            }
        })

      form.show();
      //show_edit_panel(params.data.id);  
    }

    function newCustomer(){
      let form = customerFormFactory();
      form.registerToClientCreateEvent(refreshCustomersTable)
      form.show();
    } 

    function dateFormatter(params){
      let dateAsString = params.data.relationshipstart   
      let dateAsObject = new Date(Date.parse(dateAsString));    
      return dateAsObject.getUTCDate() + "/" + (dateAsObject.getUTCMonth() + 1) + "/" + dateAsObject.getUTCFullYear();
    } 
    
    async function refreshCustomersTable(){
      let customers = await getCustomers(window.appRoutes.customers_all_path,window.appRoutes.root_url)
      setCustomersTable(JSON.parse(customers.value))
    }
    function setCustomersTable(rowData){
      //rowData must be of object type, not string!!!

      if(customersTable){
        customersTable.gridOptions.api.setRowData(rowData)
      }
    }

    function dateComparator(date1, date2) {
      let dateObject1 = new Date(date1);
      let dateObject2 = new Date(date2);   

      return dateObject1.getTime() - dateObject2.getTime();
    }


    let defaultColDef = {
      cellStyle: {"line-height":"60px","font-size":"16px"},
      filter: true,
      sortable:true ,
      resizable : true
    }


    let customers_column_definitions = [
      {headerName : "Name", field : "name"   },
      {headerName : "Start Date", field : "relationshipstart", valueFormatter:dateFormatter,comparator:dateComparator},
      {headerName : "Activity Type", field : "activitytype"},
      {headerName : "Email Info", field : "infoemail"},
      {headerName:"", width:120, cellRenderer:"ControlsCellRenderer", pinned: "left",resizable:false,filter:false,sortable:false,flex:2}]


    function filterTable(filterValue){
      customersTable.gridOptions.api.setQuickFilter(filterValue)
    }

    

    async function initCustomersTable(){
      let customers = await getCustomers(window.appRoutes.customers_all_path,window.appRoutes.root_url)
       //agGrid table setup
      customersTableOptions = {
          defaultColDef:defaultColDef,
          columnDefs: customers_column_definitions,    
          domLayout:"autoHeight",
          components:{
            ControlsCellRenderer:window.controlsCellRenderer(deleteButtonCallback,editButtonCallBack)
          },
          rowData:JSON.parse(customers.value),
          onRowDataChanged:function(event){
            let ids = customers_column_definitions.map((col)=>col.field)
            event.columnApi.autoSizeColumns(ids);
          },
          suppressCellSelection: true,
          rowHeight : 60
      };
    }

    async function buildCustomersTable(){     
      let tableContainer = document.createElement("div");

      tableContainer.className = "ag-theme-alpine"
      tableContainer.style.cssText = "width:auto;border:none;margin-top:20px"
      
      customersTable  = new agGrid.Grid(tableContainer, customersTableOptions);

      rootElement.appendChild(tableContainer)
    }

    async function initControlBar(){
      controlBar = control_bar_v1();
      controlBar.registerToFilterChangeEvent(filterTable)
      controlBar.registerToNewCustomerEvent(newCustomer)
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
      rootElement = document.getElementById(root_id);
      await initControlBar()
      await initCustomersTable();     
    }

    //public facing API
    return {
      init:init,
      build:build
    }
  }  


})()




