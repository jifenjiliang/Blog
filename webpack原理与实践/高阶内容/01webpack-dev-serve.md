<!--
 * @Description: 
 * @Autor: lijinpeng
 * @Date: 2021-03-14 15:51:44
 * @LastEditors: lijinpeng
-->
# 这里我先对一个较为理想的开发环境做出设想：

首先，它必须能够使用 HTTP 服务运行而不是文件形式预览。这样的话，一来更接近生产环境状态，二来我们的项目可能需要使用 AJAX 之类的 API，以文件形式访问会产生诸多问题。
其次，在我们修改完代码过后，Webpack 能够自动完成构建，然后浏览器可以即时显示最新的运行结果，这样就大大减少了开发过程中额外的重复操作，同时也会让我们更加专注，效率自然得到提升。
最后，它还需要能提供 Source Map 支持。这样一来，运行过程中出现的错误就可以快速定位到源代码中的位置，而不是打包后结果中的位置，更便于我们快速定位错误、调试应用。

# Webpack 自动编译

## watch 工作模式
在这种模式下，Webpack 完成初次构建过后，项目中的源文件会被监视，一旦发生任何改动，Webpack 都会自动重新运行打包任务。
在启动 Webpack 时，添加一个 --watch 的 CLI 参数
修改代码 → Webpack 自动打包 → 手动刷新浏览器 → 预览运行结果

## Webpack Dev Server
地址：https://github.com/webpack/webpack-dev-server
是 Webpack 官方推出的一款开发工具，根据它的名字我们就应该知道，它提供了一个开发服务器，并且将自动编译和自动刷新浏览器等一系列对开发友好的功能全部集成在了一起。目的就是为了提高开发者日常的开发效率

运行 webpack-dev-server 这个命令时，它内部会启动一个 HTTP Server，为打包的结果提供静态文件服务，并且自动使用 Webpack 打包我们的应用，然后监听源代码的变化，一旦文件发生变化，它会立即重新打包

webpack-dev-server 为了提高工作速率，它并没有将打包结果写入到磁盘中，而是暂时存放在内存中，内部的 HTTP Server 也是从内存中读取这些文件的。这样一来，就会减少很多不必要的磁盘读写操作，大大提高了整体的构建效率。

我们还可以为 webpack-dev-server 命令传入一个 --open 的参数，用于自动唤起浏览器打开我们的应用。打开浏览器过后，此时如果你有两块屏幕，就可以把浏览器放到另外一块屏幕上，然后体验一边编码，一边即时预览的开发环境了。

### 配置选项
Webpack 配置对象中可以有一个叫作 devServer 的属性，专门用来为 webpack-dev-server 提供配置，具体如下：
```
// ./webpack.config.js
const path = require('path')

module.exports = {
  // ...
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
    // ...
    // 详细配置文档：https://webpack.js.org/configuration/dev-server/
  }
}
```

#### 静态资源访问
webpack-dev-server 默认会将构建结果和输出文件全部作为开发服务器的资源文件，也就是说，只要通过 Webpack 打包能够输出的文件都可以直接被访问到

```
// ./webpack.config.js
module.exports = {
  // ...
  devServer: {
    contentBase: 'public'
  }
}
```
#### Proxy 代理 (协议 / 域名 / 端口一致 - 同源地址)
webpack-dev-server 是一个本地开发服务器
所以我们的应用在开发阶段是独立运行在 localhost 的一个端口上，而后端服务又是运行在另外一个地址上。但是最终上线过后，我们的应用一般又会和后端服务部署到同源地址下。

我们可以用跨域资源共享（CORS）解决这个问题。确实如此，如果我们请求的后端 API 支持 CORS，那这个问题就不成立了。但是并不是每种情况下服务端的 API 都支持 CORS。如果前后端应用是同源部署，也就是协议 / 域名 / 端口一致，那这种情况下，根本没必要开启 CORS，所以跨域请求的问题仍然是不可避免的。

那解决这种开发阶段跨域请求问题最好的办法，就是在开发服务器中配置一个后端 API 的代理服务，也就是把后端接口服务代理到本地的开发服务地址。

```
// ./webpack.config.js
module.exports = {
  // ...
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.github.com'
      }
    }
  }
}
```
请求 http://localhost:8080/api/users ，就相当于请求了 https://api.github.com/api/users

而我们真正希望请求的地址是 https://api.github.com/users，所以对于代理路径开头的 /api 我们要重写掉。我们可以添加一个 pathRewrite 属性来实现代理路径重写，重写规则就是把路径中开头的 /api 替换为空，pathRewrite 最终会以正则的方式来替换请求路径。
```
// ./webpack.config.js
module.exports = {
  // ...
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: {
          '^/api': '' // 替换掉代理地址中的 /api
        }
      }
    }
  }
}
```
还需设置一个 changeOrigin 属性为 true

这是因为默认代理服务器会以我们实际在浏览器中请求的主机名，也就是 localhost:8080 作为代理请求中的主机名。而一般服务器需要根据请求的主机名判断是哪个网站的请求，那 localhost:8080 这个主机名，对于 GitHub 的服务器来说，肯定无法正常请求，所以需要修改。

将代理规则配置的 changeOrigin 属性设置为 true，就会以实际代理请求地址中的主机名去请求，也就是我们正常请求这个地址的主机名是什么，实际请求 GitHub 时就会设置成什么。

```
// ./webpack.config.js
module.exports = {
  // ...
  devServer: {
    proxy: {
      '/api': {
        target: 'https://api.github.com',
        pathRewrite: {
          '^/api': '' // 替换掉代理地址中的 /api
        },
        changeOrigin: true // 确保请求 GitHub 的主机名就是：api.github.com
      }
    }
  }
}
```