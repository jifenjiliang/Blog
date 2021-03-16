<!--
 * @Description: 通过 Loader 实现特殊资源加载
 * @Autor: lijinpeng
 * @Date: 2021-03-13 21:02:57
 * @LastEditors: lijinpeng
-->
Webpack 是用 Loader（加载器）来处理每个模块的，而内部默认的 Loader 只能处理 JS 模块，如果需要加载其他类型的模块就需要配置不同的 Loader。

配置对象的 module 属性中添加一个 rules 数组。这个数组就是我们针对资源模块的加载规则配置，其中的每个规则对象都需要设置两个属性：
首先是 test 属性，它是一个正则表达式，用来匹配打包过程中所遇到文件路径，这里我们是以 .css 结尾；
然后是 use 属性，它用来指定匹配到的文件需要使用的 loader，这里用到的是 css-loader

我们将配置文件中的 use 属性修改为一个数组，将 style-loader 也放进去。这里需要注意的是，一旦配置多个 Loader，执行顺序是从后往前执行的，所以这里一定要将 css-loader 放在最后，因为必须要 css-loader 先把 CSS 代码转换为 JS 模块，才可以正常打包
```
// ./webpack.config.js
module.exports = {
  entry: './src/main.css',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // 对同一个模块使用多个 loader，注意顺序
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  }
}
```
style-loader 的作用总结一句话就是，将 css-loader 中所加载到的所有样式模块，通过创建 style 标签的方式添加到页面上。

因为 Webpack 在打包过程中会循环遍历每个模块，然后根据配置将每个遇到的模块交给对应的 Loader 去处理，最后再将处理完的结果打包到一起。

# loader 列表
file-loader	https://webpack.js.org/loaders/file-loader
url-loader	https://webpack.js.org/loaders/url-loader
babel-loader	https://webpack.js.org/loaders/babel-loader
style-loader	https://webpack.js.org/loaders/style-loader
css-loader	https://webpack.js.org/loaders/css-loader
sass-loader	https://webpack.js.org/loaders/sass-loader
postcss-loader	https://webpack.js.org/loaders/postcss-loader
eslint-loader	https://github.com/webpack-contrib/eslint-loader
vue-loader	https://github.com/vuejs/vue-loader

# 开发一个 Loader
其实 Webpack 加载资源文件的过程类似于一个工作管道，你可以在这个过程中依次使用多个 Loader，但是最终这个管道结束过后的结果必须是一段标准的 JS 代码字符串。

先通过 JSON.stringify() 将字段字符串转换为标准的 JSON 字符串，然后再参与拼接，这样就不会有问题了。
```
// ./markdown-loader.js
const marked = require('marked')

module.exports = source => {
  // 1. 将 markdown 转换为 html 字符串
  const html = marked(source)
  // html => '<h1>About</h1><p>this is a markdown file.</p>'
  // 2. 将 html 字符串拼接为一段导出字符串的 JS 代码
  const code = `module.exports = ${JSON.stringify(html)}`
  return code
  // code => 'export default "<h1>About</h1><p>this is a markdown file.</p>"'
}
```