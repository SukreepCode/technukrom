const webpack = require("webpack");
require('now-env'); // using now-env instead of `require("dotenv").config();`
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const { ANALYZE } = process.env
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  webpack: config => {

    if (ANALYZE) {
      config.plugins.push(new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        openAnalyzer: true
      }))
    }

    config.plugins.push(
      new webpack.DefinePlugin({
        "process.env.FIREBASE_PROJECT_ID": JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        "process.env.FIREBASE_AUTH_DOMAIN": JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        "process.env.FIREBASE_API_KEY": JSON.stringify(process.env.FIREBASE_API_KEY),
        IN_BROWSER: true
      })
    );
    return config;
  },
  sassLoaderOptions: {
    includePaths: ["./node_modules", "./styles"],
    outputStyle: 'compressed'
  }

});
