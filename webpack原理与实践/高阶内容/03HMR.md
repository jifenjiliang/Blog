<!--
 * @Description: 模块支持热替换（HMR）机制
 * @Autor: lijinpeng
 * @Date: 2021-03-14 20:11:16
 * @LastEditors: lijinpeng
-->

# 模块热替换（HMR）
HMR 全称 Hot Module Replacement，翻译过来叫作“模块热替换”或“模块热更新”。

## 开启 HMR
HMR 已经集成在了 webpack 模块中了，所以不需要再单独安装什么模块。

使用这个特性最简单的方式就是，在运行 webpack-dev-server 命令时，通过 --hot 参数去开启这个特性。

首先需要将 devServer 对象中的 hot 属性设置为 true；
然后需要载入一个插件，这个插件是 webpack 内置的一个插件，所以我们先导入 webpack 模块，有了这个模块过后，这里使用的是一个叫作 HotModuleReplacementPlugin 的插件。

```
// ./webpack.config.js
const webpack = require('webpack')

module.exports = {
  // ...
  devServer: {
    // 开启 HMR 特性，如果资源不支持 HMR 会 fallback 到 live reloading
    hot: true
    // 只使用 HMR，不会 fallback 到 live reloading
    // hotOnly: true
  },
  plugins: [
    // ...
    // HMR 特性所需要的插件
    new webpack.HotModuleReplacementPlugin()
  ]
}
```

## HMR 的疑问