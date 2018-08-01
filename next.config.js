const webpack = require("webpack");
require('now-env'); // using now-env instead of `require("dotenv").config();`

module.exports = {
  webpack: config => {
    // config.externals = [
    //   {
    //     xmlhttprequest: 'XMLHttpRequest'
    //   }
    // ];

    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.FIREBASE_PROJECT_ID": JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        "process.env.FIREBASE_API_KEY": JSON.stringify(process.env.FIREBASE_API_KEY),
        IN_BROWSER: true
      })
    );
    return config;
  }
};
