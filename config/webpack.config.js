const { resolve } = require('path')
// 将css文件打包成独立的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// Html配置
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 打包模式
  mode:"development",
  // 入口文件
  entry:"./src/index.js",
  // 出口配置
  output:{
    // 输出目录（输出目录必须是绝对路径）
    path:resolve(__dirname,'../dist'),
    // 输出文件名称
    filename:'main.js'
  },
  module:{
    rules:[
      {
        test:/\.css$/i,
        // use中的loader的加载顺序：先下后上
        use:[
          // 将js中的样式，挂载到<style>标签中
          // "style-loader",
          // 将css打包到单独的文件
          // MiniCssExtractPlugin.loader,
          {
            loader:MiniCssExtractPlugin.loader,
            options:{
              publicPath:'../'
            }
          },
          // 按照commonJS规范，将样式文件，输出到JS中
          "css-loader",
          // 通过postcss-loader给样式属性添加浏览器前缀
          'postcss-loader'
        ]
      },
      {
        test:/\.less$/i,
        // use中的loader的加载顺序：先下后上
        use:[
          // 将js中的样式，挂载到<style>标签中
          // "style-loader",
          // 将css打包到单独的文件
          // MiniCssExtractPlugin.loader,
          {
            loader:MiniCssExtractPlugin.loader,
            options:{
              publicPath:'../' //指定背景图片路径
            }
          },
          // 按照commonJS规范，将样式文件，输出到JS中
          "css-loader",
          // 通过postcss-loader给样式属性添加浏览器前缀
          'postcss-loader',
          // 将less转成普通的css
          "less-loader"
        ]
      },
      {
        // 处理图片
        test:/\.(png|gif|jpe?g)$/i,
        use:{
          loader:'url-loader',
          options:{
            // 指定图片大小 小于该值 会被转成base64
            limit:2 * 1024, // 2kb
            // 保留名称[name]和后缀[ext]
            name:'image/[name].[ext]',
            // url-loader ES Modules 
            // html-loader CommonJS
            // 关闭url-loader默认的 改为CommonJS
            esModule:false
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env', 
                { 
                  // 按需加载
                  useBuiltIns:'usage',
                  // 指定core-js版本
                  corejs:3,
                  // 允许手动指定浏览器的版本
                  targets:{
                    chrome:'58',
                    ie:'9',
                    safari:'10',
                    edge:'17',
                    firefox:'60'
                  },
                  // targets: "defaults" 
                }
              ]
            ]
          }
        }
      },
      // {
      //   test:/\.(html|htm)$/i,
      //   use:{
      //     loader:'html-loader',
      //     options:{
      //       esModule:false // webpack5 中需要在设置一次
      //     }
      //   }
      // }
    ]
  },
  devServer:{

  },
  plugins:[
    // 将css文件打包成独立的文件
    new MiniCssExtractPlugin({
      // 保存原来的名字 []
      filename:'css/[name].css'
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
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
    })
  ]
}
