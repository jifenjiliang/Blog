/*
 * @Description: 词法作用域和动态作用域
 * @Autor: lijinpeng
 * @Date: 2021-03-03 15:06:13
 * @LastEditors: lijinpeng
 */

// 因为 JavaScript 采用的是词法作用域，函数的作用域在函数定义的时候就决定了。
// 作用域是指程序源代码中定义变量的区域
// JavaScript 采用词法作用域(lexical scoping)，也就是静态作用域。

// JavaScript 函数的执行用到了作用域链，这个作用域链是在函数定义的时候创建的。
// 嵌套的函数 f() 定义在这个作用域链里，其中的变量 scope 一定是局部变量，不管何时何地执行函数 f()，这种绑定在执行 f() 时依然有效。

function foo() {
  console.log(value);
}
function bar() {
  var value = 2;
  foo();
}

var value = 1;
bar();//2
