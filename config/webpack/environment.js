const { environment } = require('@rails/webpacker')
const webpack = require("webpack");


const erb = require('./loaders/erb')


// Add an additional plugin of your choosing : ProvidePlugin
environment.plugins.append(
  "Provide",
  new webpack.ProvidePlugin({   
    $: "jquery",    
    jQuery: "jquery", 
    jquery: "jquery",
    Popper: ["popper.js", "default"]// for Bootstrap 4    
  })
);

environment.loaders.prepend('erb', erb)

module.exports = environment
