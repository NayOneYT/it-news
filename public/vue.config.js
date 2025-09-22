require('dotenv').config({path: '../.env'});
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "api": {
        target: process.env.BASE_API_URL
      }
    }
  }
})