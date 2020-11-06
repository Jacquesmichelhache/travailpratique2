// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


global.agGrid = require('ag-grid-community')

require("popper.js")
require("bootstrap")

//utility
require("../custom/aggrid_helpers/edit_column_aggrid")

//customers ajax
// require("../custom/customers/ajax/delete_customer")
// require("../custom/customers/ajax/get_customer_info")

//contacts ajax
// require("../custom/contacts/delete_contact")
// require("../custom/contacts/create_contact")
// require("../custom/contacts/new_contact")
// require("../custom/contacts/update_contact")
// require("../custom/contacts/all_contacts")

let jQuery = require("jquery");

require('webpack-jquery-ui');
require('webpack-jquery-ui/css');



// import jQuery from "jquery";
global.$ = global.jQuery = jQuery;
window.$ = window.jQuery = jQuery;




