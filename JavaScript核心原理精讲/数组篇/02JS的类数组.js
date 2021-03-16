/*
 * @Description: JS的类数组
 * @Autor: lijinpeng
 * @Date: 2021-03-06 17:00:35
 * @LastEditors: lijinpeng
 */

// 类数组
// 一种类数组的对象，它们不能直接调用数组的方法，但是又和数组比较类似

// 函数里面的参数对象 arguments；
// 用 getElementsByTagName/ClassName/Name 获得的 HTMLCollection；
// 用 querySelector 获得的 NodeList。

// typeof 这个 arguments 返回的是 object，
// 通过 Object.prototype.toString.call 返回的结果是 '[object arguments]'
// arguments 不仅仅有一个 length 属性，还有一个 callee 属性 输出的就是函数自身
function foo(name, age, sex) {
  console.log(arguments);
  console.log(typeof arguments);
  console.log(Object.prototype.toString.call(arguments));
  console.log(arguments.callee);
}
foo('jack', '18', 'male');

// HTMLCollection
// HTMLCollection 简单来说是 HTML DOM 对象的一个接口，这个接口包含了获取到的 DOM 元素集合，返回的类型是类数组对象
// HTML DOM 中的 HTMLCollection 是即时更新的，当其所包含的文档结构发生改变时，它会自动更新。
var elem1, elem2;
// document.forms 是一个 HTMLCollection
elem1 = document.forms[0];
elem2 = document.forms.item(0);
console.log(elem1);
console.log(elem2);
console.log(typeof elem1);
console.log(Object.prototype.toString.call(elem1));

// NodeList
// NodeList 对象是节点的集合，通常是由 querySlector 返回的
// 虽然 NodeList 不是一个数组，但是可以使用 for...of 来迭代
// 在一些情况下，NodeList 是一个实时集合，也就是说，如果文档中的节点树发生变化，NodeList 也会随之变化
var list = document.querySelectorAll('input[type=checkbox]');
for (var checkbox of list) {
  checkbox.checked = true;
}
console.log(list);
console.log(typeof list);
console.log(Object.prototype.toString.call(list));

// 类数组应用场景
// 遍历参数操作
function add() {
  var sum =0,
      len = arguments.length;
  for(var i = 0; i < len; i++){
      sum += arguments[i];
  }
  return sum;
}
add()                           // 0
add(1)                          // 1
add(1,2)                       // 3
add(1,2,3,4);                   // 10

// 定义链接字符串函数
function myConcat(separa) {
  var args = Array.prototype.slice.call(arguments, 1);
  return args.join(separa);
}
myConcat(", ", "red", "orange", "blue");
// "red, orange, blue"
myConcat("; ", "elephant", "lion", "snake");
// "elephant; lion; snake"
myConcat(". ", "one", "two", "three", "four", "five");
// "one. two. three. four. five"

// 传递参数使用
// 使用 apply 将 foo 的参数传递给 bar
function foo() {
  bar.apply(this, arguments);
}
function bar(a, b, c) {
  console.log(a, b, c);
}
foo(1, 2, 3)   //1 2 3

// 如何将类数组转换成数组
// 类数组借用数组方法转数组
var arrayLike = {
  0: 'java',
  1: 'script',
  length: 2
}
Array.prototype.push.call(arrayLike, 'jack', 'lily');
console.log(typeof arrayLike); // 'object'
console.log(arrayLike);
// {0: "java", 1: "script", 2: "jack", 3: "lily", length: 4}

function sum(a, b) {
  let args = Array.prototype.slice.call(arguments);
 // let args = [].slice.call(arguments); // 这样写也是一样效果
  console.log(args.reduce((sum, cur) => sum + cur));
}
sum(1, 2);  // 3
function sum(a, b) {
  let args = Array.prototype.concat.apply([], arguments);
  console.log(args.reduce((sum, cur) => sum + cur));
}
sum(1, 2);  // 3
// 借用 Array 原型链上的各种方法，来实现 sum 函数的参数相加的效果。
// 一开始都是将 arguments 通过借用数组的方法转换为真正的数组，
// 最后都又通过数组的 reduce 方法实现了参数转化的真数组 args 的相加

// ES6 的方法转数组
// 采用 ES6 新增的 Array.from 方法以及展开运算符的方法
function sum(a, b) {
  let args = Array.from(arguments);
  console.log(args.reduce((sum, cur) => sum + cur));
}
sum(1, 2);    // 3
function sum(a, b) {
  let args = [...arguments];
  console.log(args.reduce((sum, cur) => sum + cur));
}
sum(1, 2);    // 3
function sum(...args) {
  console.log(args.reduce((sum, cur) => sum + cur));
}
sum(1, 2);    // 3