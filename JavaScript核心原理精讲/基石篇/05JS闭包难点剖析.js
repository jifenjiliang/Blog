/*
 * @Description: JS闭包难点剖析
 * @Autor: lijinpeng
 * @Date: 2021-03-04 18:48:10
 * @LastEditors: lijinpeng
 */
// 作用域基本介绍
// JavaScript 的作用域通俗来讲，就是指变量能够被访问到的范围，在 JavaScript 中作用域也分为好几种，ES5 之前只有全局作用域和函数作用域两种。
// ES6 出现之后，又新增了块级作用域，

// 什么是闭包？
// 红宝书闭包的定义：闭包是指有权访问另外一个函数作用域中的变量的函数。
// MDN：一个函数和对其周围状态的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure）。
// 也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。

var a = 1;
function fun1() {
  var a = 2
  function fun2() {
    var a = 3;
    console.log(a);//3
  }
  return fun2
}
var result = fun1();
result();

// 闭包的基本概念
// 闭包其实就是一个可以访问其他函数内部变量的函数。即一个定义在函数内部的函数，或者直接说闭包是个内嵌函数也可以。
// 闭包产生的本质就是：当前环境中存在指向父级作用域的引用
// 闭包的表现形式
// 1. 返回一个函数
// 2. 在定时器、事件监听、Ajax 请求、Web Workers 或者任何异步中，只要使用了回调函数，实际上就是在使用闭包。
// 定时器
setTimeout(function handler(){
  console.log('1');
}, 1000);
// 事件监听
$('#app').click(function(){
  console.log('Event Listener');
});
// 3. 作为函数参数传递的形式，比如下面的例子。
var a = 1;
function foo(){
  var a = 2;
  function baz(){
    console.log(a);
  }
  bar(baz);
}
function bar(fn){
  // 这就是闭包
  fn();
}
foo();  // 输出2，而不是1
// 4. IIFE（立即执行函数），创建了闭包，保存了全局作用域（window）和当前函数的作用域，因此可以输出全局的变量，如下所示。
var a = 2;
(function IIFE(){
  console.log(a);  // 输出2
})();
// IIFE 这个函数会稍微有些特殊，算是一种自执行匿名函数，这个匿名函数拥有独立的作用域。这不仅可以避免了外界访问此 IIFE 中的变量，而且又不会污染全局作用域，

// 如何解决循环输出问题？
for(var i = 1; i <= 5; i ++){
  setTimeout(function() {
    console.log(i)
  }, 0)
}

// 输出的是 5 个 6
// setTimeout 为宏任务，由于 JS 中单线程 eventLoop 机制，在主线程同步任务执行完后才去执行宏任务，因此循环结束后 setTimeout 中的回调才依次执行。
// 因为 setTimeout 函数也是一种闭包，往上找它的父级作用域链就是 window，变量 i 为 window 上的全局变量，开始执行 setTimeout 之前变量 i 已经就是 6 了，因此最后输出的连续就都是 6。

// 如何按顺序依次输出 1、2、3、4、5 呢？
// 立即执行函数
for(let i = 1; i <= 5; i ++){
  setTimeout(function() {
    console.log(i)
  }, 0)
}

// 使用 ES6 中的 let  块级作用域
for(var i = 1; i <= 5; i ++){
  (function(j) {
    setTimeout(function() {
      console.log(j)
    }, 0)
  })(i)
}

// 定时器传入第三个参数
for(var i=1;i<=5;i++){
  setTimeout(function(j) {
    console.log(j)
  }, 0, i)
}

// 由于闭包会使一些变量一直保存在内存中不会自动释放，所以如果大量使用的话就会消耗大量内存，从而影响网页性能。
