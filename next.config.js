const webpack = require("webpack");
// global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
require("dotenv").config();

module.exports = {
  webpack: config => {
    // config.externals = [
    //   {
    //     xmlhttprequest: 'XMLHttpRequest'
    //   }
    // ];

    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.F_PROJECT_ID": JSON.stringify(process.env.F_PROJECT_ID),
        "process.env.F_AUTH_DOMAIN": JSON.stringify(process.env.F_AUTH_DOMAIN),
        "process.env.F_API_KEY": JSON.stringify(process.env.F_API_KEY),
        IN_BROWSER: true
      })
    );
    return config;
  }
};
