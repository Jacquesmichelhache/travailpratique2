// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


//require("jquery-datetimepicker")
global.agGrid = require('ag-grid-community')

//import the bootstrap javascript module
//import "bootstrap"

require("popper.js")
require("bootstrap")

require("../custom/snackbar")
require("../custom/yesNoDialog")
require("../custom/overlay")
require("../custom/edit_column_aggrid")

//customers ajax
require("../custom/customers/delete_customer")
require("../custom/customers/get_customer_info")

//contacts ajax
require("../custom/contacts/delete_contact")
require("../custom/contacts/create_contact")
require("../custom/contacts/update_contact")


let jQuery = require("jquery");

// import jQuery from "jquery";
global.$ = global.jQuery = jQuery;
window.$ = window.jQuery = jQuery;

require('webpack-jquery-ui');
require('webpack-jquery-ui/css');

