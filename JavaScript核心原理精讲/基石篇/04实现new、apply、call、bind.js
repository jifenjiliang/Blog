/*
 * @Description: 实现 new、apply、call、bind
 * @Autor: lijinpeng
 * @Date: 2021-03-04 15:11:01
 * @LastEditors: lijinpeng
 */
// new 原理介绍
// 创建一个新对象；
// 将构造函数的作用域赋给新对象（this 指向新对象）；
// 执行构造函数中的代码（为这个新对象添加属性）；
// 返回新对象。
// new 关键词执行之后总是会返回一个对象，要么是实例对象，要么是 return 语句指定的对象。
function Person(){
  this.name = 'Jack';
}
var p = new Person();
console.log(p)  // Jack

// new 的实现
// 让实例可以访问到私有属性；
// 让实例可以访问构造函数原型（constructor.prototype）所在原型链上的属性；
// 构造函数返回的最后结果是引用数据类型。

function _new (ctor, ...args) {
  if(typeof ctor !== 'function'){
    throw '构造函数必须是一个函数'
  }
  const instance = {}
  instance.__proto__ = ctor.prototype
  // const instance = Object.create(ctor.prototype)
  const res = ctor.apply(instance, args)
  return (typeof res === 'object' && res !== null) ? res : instance
}

console.log(_new(Person, 2, 3))

// apply & call & bind 原理介绍
// 先来了解一下这三个方法的基本情况，call、apply 和 bind 是挂在 Function 对象上的三个方法，调用这三个方法的必须是一个函数。
// func.call(thisArg, param1, param2, ...)
// func.apply(thisArg, [param1,param2,...])
// func.bind(thisArg, param1, param2, ...)

// apply 和 call 的实现
Function.prototype.call = function (context1, ...args) {
  let context = context1 || window;
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn
  return result;
}
Function.prototype.apply = function (context, args) {
  let context = context || window;
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn
  return result;
}

// bind实现
Function.prototype.bind = function (context, ...args) {
  if (typeof this !== "function") {
    throw new Error("this must be a function");
  }
  const self = this;
  const fbound = function () {
      self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
  }
  if(this.prototype) {
    fbound.prototype = Object.create(this.prototype);
  }
  return fbound;
}