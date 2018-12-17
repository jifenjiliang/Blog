# new Object()干了什么
new Object('cat') = () => {
  let obj = {}
  obj._proto_ = Object.prototype;
  let res = Object.cell(obj, 'cat')
  return typeof res === 'object' ? res : obj;
}
# less 有什么好处
LESS 是动态的样式表语言，通过简洁明了的语法定义，使编写 CSS 的工作变得非常简单。在实际项目开发中，可以大大提升前端工程师的码砖效率！
作为一门标记性语言，CSS 的语法相对简单，对使用者的要求较低，但同时也带来一些问题：CSS 需要书写大量看似没有逻辑的代码，不方便维护及扩展，不利于复用，尤其对于非前端开发工程师来讲，往往会因为缺少 CSS 编写经验而很难写出组织良好且易于维护的 CSS 代码，造成这些困难的很大原因源于 CSS 是一门非程序式语言，没有变量、函数、SCOPE（作用域）等概念。LESS 为 Web 开发者带来了福音，它在 CSS 的语法基础之上，引入了变量，Mixin（混入），运算以及函数等功能，大大简化了 CSS 的编写，并且降低了 CSS 的维护成本，就像它的名称所说的那样，LESS 可以让我们用更少的代码做更多的事情。
# http常见的状态码都有哪些
200——服务器成功返回网页
300——请求的资源可在多处得到
301——删除请求数据
302——在其他地址发现了请求数据
303——建议客户访问其他URL或访问方式
304——客户端已经执行了GET，但文件未变化
400——错误请求，如语法错误
401——请求授权失败
402——保留有效ChargeTo头响应
403——请求不允许
404——请求的网页不存在
413——请求的资源大于服务器允许的大小
500——服务器产生内部错误
501——服务器不支持请求的函数
502——服务器暂时不可用，有时是为了防止发生系统过载
503——服务器超时过载或暂停维修
504——关口过载，服务器使用另一个关口或服务来响应用户，等待时间设定值较长
# http请求头都有什么
Accept：浏览器可接受的MIME类型。
Accept-Charset：浏览器可接受的字符集。
Accept-Encoding：浏览器能够进行解码的数据编码方式，比如gzip。
Accept-Language：浏览器所希望的语言种类，当服务器能够提供一种以上的语言版本时要用到。
Authorization：授权信息，通常出现在对服务器发送的WWW-Authenticate头的应答中。
Content-Length：表示请求消息正文的长度。
Cookie：设置cookie,这是最重要的请求头信息之一
Cache-Control：对缓存进行控制，
From：请求发送者的email地址，由一些特殊的Web客户程序使用，浏览器不会用到它。
Host：初始URL中的主机和端口。
Pragma：指定“no-cache”值表示服务器必须返回一个刷新后的文档，即使它是代理服务器而且已经有了页面的本地拷贝。
Referer：包含一个URL，用户从该URL代表的页面出发访问当前请求的页面。
User-Agent：浏览器类型，如果Servlet返回的内容与浏览器类型有关则该值非常有用。
UA-Pixels，UA-Color，UA-OS，UA-CPU：由某些版本的IE浏览器所发送的非标准的请求头，表示屏幕大小、颜色深度、操作系统和CPU类型。
# http请求都有哪些 get和post的区别
post get put delete
GET： 请求指定的页面信息，并返回实体主体。 
HEAD： 只请求页面的首部。 
POST： 请求服务器接受所指定的文档作为对所标识的URI的新的从属实体。 
PUT： 从客户端向服务器传送的数据取代指定的文档的内容。 
DELETE： 请求服务器删除指定的页面。 
OPTIONS： 允许客户端查看服务器的性能。
# 如何解决跨域的 nginx如何配置 nginx解决跨域的原理是什么
跨域是指一个域下的文档或脚本试图去请求另一个域下的资源，这里跨域是广义的。
同源策略/SOP（Same origin policy）是一种约定，由Netscape公司1995年引入浏览器，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，浏览器很容易受到XSS、CSFR等攻击。所谓同源是指"协议+域名+端口"三者相同，即便两个不同的域名指向同一个ip地址，也非同源。
1、 通过jsonp跨域
2、 nginx代理跨域
1)nginx配置解决iconfont跨域
浏览器跨域访问js、css、img等常规静态资源被同源策略许可，但iconfont字体文件(eot|otf|ttf|woff|svg)例外，此时可在nginx的静态资源服务器中加入以下配置。
location / {
  add_header Access-Control-Allow-Origin *;
}
2)nginx反向代理接口跨域
跨域原理：同源策略是浏览器的安全策略，不是HTTP协议的一部分。服务器端调用HTTP接口只是使用HTTP协议，不会执行JS脚本，不需要同源策略，也就不存在跨越问题。
实现思路：通过nginx配置一个代理服务器（域名与domain1相同，端口不同）做跳板机，反向代理访问domain2接口，并且可以顺便修改cookie中domain信息，方便当前域cookie写入，实现跨域登录。
#proxy服务器
server {
  listen       81;
  server_name  www.domain1.com;

  location / {
    proxy_pass   http://www.domain2.com:8080;  #反向代理
    proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
    index  index.html index.htm;

    # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
    add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
    add_header Access-Control-Allow-Credentials true;
  }
}
3、 nodejs中间件代理跨域
4、 后台设置cors请求头
CORS是一个W3C标准，全称是"跨域资源共享"（Cross-origin resource sharing）
# 项目架构 你是如何划分的 为什么这样划分 有什么意义
一、什么是模块化开发？
web开发中将项目的实现划分为许多模块，模块其实就是将功能相关的代码封装在一起，方便维护，重用；模块之间通过API进行重组。
为什么要通过模块化的方式进行开发？
二、为什么要通过模块化的方式进行开发？
1.高内聚低耦合，有利于团队作战，当项目很复杂的时候，将项目划分为子模块分给不同的人开发，最后再组合在一起，这样可以降低模块与模块之间的依赖关系体现低耦合，模块又有特定功能体现高内聚。
2.可重用，方便维护，模块的特点就是有特定功能，当两个项目都需要某种功能的时候，我们定义一个特定的模块来实现该功能，这样只需要在两个项目中都引入这个模块就能够实现该功能，不需要书写重复性的代码；并且当需求变更该功能需要改变的时候，我们直接修改该模块，这样就能够修改所有项目的功能，维护起来很方便。
3.模块化开发会引发大量的js被引入到页面，而这些模块之间还是有依赖关系，体现在引入的顺序
