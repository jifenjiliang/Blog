<!--
 * @Description: 利用插件机制横向扩展 Webpack 的构建能力
 * @Autor: lijinpeng
 * @Date: 2021-03-13 22:37:28
 * @LastEditors: lijinpeng
-->

Webpack 插件机制的目的是为了增强 Webpack 在项目自动化构建方面的能力。Loader 就是负责完成项目中各种各样资源模块的加载，从而实现整体项目的模块化，而 Plugin 则是用来解决项目中除了资源模块打包以外的其他自动化工作。

实现自动在打包之前清除 dist 目录（上次的打包结果）；
自动生成应用所需要的 HTML 文件；
根据不同环境为代码注入类似 API 地址这种可能变化的部分；
拷贝不需要参与打包的资源文件到输出目录；
压缩 Webpack 打包完成后输出的文件；
自动发布打包结果到服务器实现自动部署。

# 体验插件机制

clean-webpack-plugin：在每次完整打包之前，自动清理 dist 目录，这样每次打包过后，dist 目录中就只会存在那些必要的文件。
```
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
```

# 用于生成 HTML 的插件 html-webpack-plugin
Webpack 在打包的同时，自动生成对应的 HTML 文件，让 HTML 文件也参与到整个项目的构建过程。这样的话，在构建过程中，Webpack 就可以自动将打包的 bundle 文件引入到页面中。

相比于之前写死 HTML 文件的方式，自动生成 HTML 的优势在于：

HTML 也输出到 dist 目录中了，上线时我们只需要把 dist 目录发布出去就可以了；
HTML 中的 script 标签是自动引入的，所以可以确保资源文件的路径是正常的。
```
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Sample',
      meta: {
        viewport: 'width=device-width'
      }
    })
  ]
}
```
如果需要对 HTML 进行大量的自定义，更好的做法是在源代码中添加一个用于生成 HTML 的模板，然后让 html-webpack-plugin 插件根据这个模板去生成页面文件。
```
<!-- ./src/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title><%= htmlWebpackPlugin.options.title %></title>
</head>
<body>
  <div class="container">
    <h1>页面上的基础结构</h1>
    <div id="root"></div>
  </div>
</body>
</html>

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 用于生成 index.html
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Sample',
      template: './src/index.html'
    }),
    // 用于生成 about.html
    new HtmlWebpackPlugin({
      filename: 'about.html'
    })
  ]
}
```

# 用于复制文件的插件 copy-webpack-plugin
这个插件类型的构造函数需要我们传入一个字符串数组，用于指定需要拷贝的文件路径
```
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'bundle.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Webpack Plugin Sample',
      template: './src/index.html'
    }),
    new CopyWebpackPlugin({
      patterns: ['public'] // 需要拷贝的目录或者路径通配符
    })
  ]
}
```

# 开发一个插件
Webpack 的插件机制就是我们在软件开发中最常见的钩子机制

钩子机制也特别容易理解，它有点类似于 Web 中的事件。在 Webpack 整个工作过程会有很多环节，为了便于插件的扩展，Webpack 几乎在每一个环节都埋下了一个钩子。这样我们在开发插件的时候，通过往这些不同节点上挂载不同的任务，就可以轻松扩展 Webpack 的能力。

Compiler Hooks；

Compilation Hooks；

JavascriptParser Hooks。

Webpack 要求我们的插件必须是一个函数或者是一个包含 apply 方法的对象，一般我们都会定义一个类型，在这个类型中定义 apply 方法。然后在使用时，再通过这个类型来创建一个实例对象去使用这个插件。

所以我们这里定义一个 RemoveCommentsPlugin 类型，然后在这个类型中定义一个 apply 方法，这个方法会在 Webpack 启动时被调用，它接收一个 compiler 对象参数，这个对象是 Webpack 工作过程中最核心的对象，里面包含了我们此次构建的所有配置信息，我们就是通过这个对象去注册钩子函数，具体代码如下：
```
// ./remove-comments-plugin.js
class RemoveCommentsPlugin {
  apply (compiler) {
    console.log('RemoveCommentsPlugin 启动')
    // compiler => 包含了我们此次构建的所有配置信息
  }
}
```

我们的需求是删除 bundle.js 中的注释，也就是说只有当 Webpack 需要生成的 bundle.js 文件内容明确过后才可能实施。

那根据 API 文档中的介绍，我们找到一个叫作 emit 的钩子，这个钩子会在 Webpack 即将向输出目录输出文件时执行，非常符合我们的需求
```
// ./remove-comments-plugin.js
class RemoveCommentsPlugin {
  apply (compiler) {
    compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        console.log(name) // 输出文件名称
      }
    })
  }
}
```
```
// ./remove-comments-plugin.js
class RemoveCommentsPlugin {
  apply (compiler) {
    compiler.hooks.emit.tap('RemoveCommentsPlugin', compilation => {
      // compilation => 可以理解为此次打包的上下文
      for (const name in compilation.assets) {
        if (name.endsWith('.js')) {
          const contents = compilation.assets[name].source()
          const noComments = contents.replace(/\/\*{2,}\/\s?/g, '')
          compilation.assets[name] = {
            source: () => noComments,
            size: () => noComments.length
          }
        }
      }
    })
  }
}
```

例如，我想要压缩输出的图片，我会搜索 imagemin webpack plugin。虽然说每个插件的作用不尽相同，但是在用法上基本都是类似的。