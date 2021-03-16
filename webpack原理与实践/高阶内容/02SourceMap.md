<!--
 * @Description: 配置 Webpack SourceMap 的最佳实践
 * @Autor: lijinpeng
 * @Date: 2021-03-14 16:52:12
 * @LastEditors: lijinpeng
-->
# Source Map 简介
Source Map（源代码地图）就是解决此类问题最好的办法，从它的名字就能够看出它的作用：映射转换后的代码与源代码之间的关系。一段转换后的代码，通过转换过程中生成的 Source Map 文件就可以逆向解析得到对应的源代码。

version 是指定所使用的 Source Map 标准版本；
sources 中记录的是转换前的源文件名称，因为有可能出现多个文件打包转换为一个文件的情况，所以这里是一个数组；
names 是源代码中使用的一些成员名称，我们都知道一般压缩代码时会将我们开发阶段编写的有意义的变量名替换为一些简短的字符，这个属性中记录的就是原始的名称；
mappings 属性，这个属性最为关键，它是一个叫作 base64-VLQ 编码的字符串，里面记录的信息就是转换后代码中的字符与转换前代码中的字符之间的映射关系

# Webpack 中配置 Source Map
```
// ./webpack.config.js
const HtmlWebpackPlugin = require('html-webpack-plugin')

const allModes = [
  'eval',
  'cheap-eval-source-map',
  'cheap-module-eval-source-map',
  'eval-source-map',
  'cheap-source-map',
  'cheap-module-source-map',
  'inline-cheap-source-map',
  'inline-cheap-module-source-map',
  'source-map',
  'inline-source-map',
  'hidden-source-map',
  'nosources-source-map'
]

module.exports = allModes.map(item => ({
  devtool: item,
  mode: 'none',
  entry: './src/main.js',
  output: {
    filename: `js/${item}.js`
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: `${item}.html`
    })
  ]
}))
```
定义 devtool 属性，它就是当前所遍历的模式名称；
将 mode 设置为 none，确保 Webpack 内部不做额外处理；
设置打包入口和输出文件名称，打包入口都是 src/main.js，输出文件名称我们就放在 js 目录中，以模式名称命名，至于为什么放在单独目录中，你可以在接下来的内容中找到答案；
为 js 文件配置一个 babel-loader，配置 babel-loader 的目的是稍后能够辨别其中一类模式的差异。
配置一个 html-webpack-plugin，也就是为每个打包任务生成一个 HTML 文件，通过前面的内容，我们知道 html-webpack-plugin 可以生成使用打包结果的 HTML，接下来我们就是通过这些 HTML 在浏览器中进行尝试。