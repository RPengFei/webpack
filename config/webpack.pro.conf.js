const { merge } = require('webpack-merge')

// Html配置 压缩HTML
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 为注入配置全局变量
const webpack =  require('webpack')

const baseWebpackConfig =  require('./webpack.base.conf')

const proWebpackConfig = merge(baseWebpackConfig,{
  // 生产模式配置
  mode:"production",
  plugins:[
    new webpack.DefinePlugin({
      // 生产环境的接口地址
      API_BASE_URL:JSON.stringify("http://pro.api.test.com")
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
    // Html配置 压缩HTML
    new HtmlWebpackPlugin({
      // 指定打包后的文件名称
      filename:'index.html',
      // 用来指定生成的HTML模块
      template:'./src/index.ejs',
      // 指定HTML使用的变量
      title:'webpack title',
      minify:{
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      } 
    }),
    new HtmlWebpackPlugin({
      // 指定打包后的文件名称
      filename:'about.html',
      // 用来指定生成的HTML模块
      template:'./src/index.ejs',
      // 指定HTML使用的变量
      title:'about',
      // 压缩HTML
      minify:{
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }      
    }),
  ]
})

module.exports = proWebpackConfig
