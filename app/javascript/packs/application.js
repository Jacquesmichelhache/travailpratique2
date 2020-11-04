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

// import the bootstrap javascript module
import "bootstrap"

require("../custom/snackbar")
require("../custom/yesNoDialog")
require("../custom/overlay")
require("../custom/customers/delete_customer")
require("../custom/customers/get_customer_info")

global.jQuery, global.$ = require("jquery");



require('webpack-jquery-ui');
require('webpack-jquery-ui/css');

