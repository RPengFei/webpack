const { merge } = require('webpack-merge')

const baseWebpackConfig =  require('./webpack.base.conf')

// 为注入配置全局变量
const webpack =  require('webpack')

// Html配置
const HtmlWebpackPlugin = require('html-webpack-plugin')

const devWebpackConfig = merge(baseWebpackConfig,{
  // 开发模式
  mode:"development",

  plugins:[
    new webpack.DefinePlugin({
      // 开发环境的接口地址
      API_BASE_URL:JSON.stringify("http://dev.api.test.com")
    }),
    // Html配置
    new HtmlWebpackPlugin({
      // 指定打包后的文件名称
      filename:'index.html',
      // 用来指定生成的HTML模块
      template:'./src/index.ejs',
      // 指定HTML使用的变量
      title:'webpack title'
    }),
    new HtmlWebpackPlugin({
      // 指定打包后的文件名称
      filename:'about.html',
      // 用来指定生成的HTML模块
      template:'./src/index.ejs',
      // 指定HTML使用的变量
      title:'about',   
    }),
  ]
})

module.exports = devWebpackConfig
