const { environment } = require('@rails/webpacker')
const webpack = require("webpack");

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

// const aliasConfig = {
//   'jquery': 'jquery-ui/external/jquery-3.1.0/jquery.js',  
// };

//  environment.config.set('resolve.alias', aliasConfig);

module.exports = environment
