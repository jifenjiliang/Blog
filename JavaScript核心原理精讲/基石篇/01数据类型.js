/*
 * @Description: 数据类型
 * @Autor: lijinpeng
 * @Date: 2021-03-04 09:33:33
 * @LastEditors: lijinpeng
 */

/*
数据类型有如下八种：
  7种基础类型：undefined、null、boolean、string、number、Symbol、BigInt
  1种引用类型：Object
引用数据类型（Object）又分为这几种常见的类型：Array - 数组对象、RegExp - 正则对象、Date - 日期对象、Math - 数学函数、Function - 函数对象。
数据类型大致可以分成两类来进行存储：
  1.基础类型存储在栈内存，被引用或拷贝时，会创建一个完全相等的变量；
  2.引用类型存储在堆内存，存储的是地址，多个引用指向同一个地址，这里会涉及一个“共享”的概念。
*/

/*
数据类型检测：
  typeof：虽然可以判断基础数据类型（null除外）但是引用数据类型种除了function类型以外，其他的也无法判断
  instanceof：可以准确的判断复杂的引用数据类型 但是不能正确的判断基础数据类型
  Object.prototype.toString：Object.prototype.toString.call
*/

typeof 1 // 'number'
typeof '1' // 'string'
typeof undefined // 'undefined'
typeof true // 'boolean'
typeof Symbol() // 'symbol'
typeof null // 'object'
typeof [] // 'object'
typeof {} // 'object'
typeof console // 'object'
typeof console.log // 'function'

let Car = function() {}
let benz = new Car()
benz instanceof Car // true
let car = new String('Mercedes Benz')
car instanceof String // true
let str = 'Covid-19'
str instanceof String // false

// 自己实现一个 instanceof 的底层实现，应该怎么写呢
function myInstanceof(left, right) {
  // 这里先用typeof来判断基础数据类型，如果是，直接返回false
  if (typeof left !== 'object' || left === null) return false
  // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
  let proto = Object.getPrototypeOf(left)
  while(true) {
    if (proto === null) return false
    if (proto === right.prototype) return true //找到相同原型对象，返回true
    proto = Object.getPrototypeOf(proto)
  }
}
// 验证一下自己实现的myInstanceof是否OK
console.log(myInstanceof(new Number(123), Number));    // true
console.log(myInstanceof(123, Number));                // false

Object.prototype.toString({})       // "[object Object]"
Object.prototype.toString.call({})  // 同上结果，加上call也ok
Object.prototype.toString.call(1)    // "[object Number]"
Object.prototype.toString.call('1')  // "[object String]"
Object.prototype.toString.call(true)  // "[object Boolean]"
Object.prototype.toString.call(function(){})  // "[object Function]"
Object.prototype.toString.call(null)   //"[object Null]"
Object.prototype.toString.call(undefined) //"[object Undefined]"
Object.prototype.toString.call(/123/g)    //"[object RegExp]"
Object.prototype.toString.call(new Date()) //"[object Date]"
Object.prototype.toString.call([])       //"[object Array]"
Object.prototype.toString.call(document)  //"[object HTMLDocument]"
Object.prototype.toString.call(window)   //"[object Window]"

// 全局通用的数据类型判断方法
function getType(obj) {
  let type = typeof obj
  if (type !== "object") { // 先进行typeof判断，如果是基础数据类型，直接返回
    return type
  }
  // 对于typeof返回结果是object的，再进行如下的判断，正则返回结果
  return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
}

/* 代码验证，需要注意大小写，哪些是typeof判断，哪些是toString判断？思考下 */
getType([])     // "Array" typeof []是object，因此toString返回
getType('123')  // "string" typeof 直接返回
getType(window) // "Window" toString返回
getType(null)   // "Null"首字母大写，typeof null是object，需toString来判断
getType(undefined)   // "undefined" typeof 直接返回
getType()            // "undefined" typeof 直接返回
getType(function(){}) // "function" typeof能判断，因此首字母小写
getType(/123/g)      //"RegExp" toString返回

// 数据类型转换
Number()
parseInt()
parseFloat()
toString()
String()
Boolean()

// 隐式类型转换
// '==' 的隐式类型转换规则
// 如果类型相同，无须进行类型转换；
// 如果其中一个操作值是 null 或者 undefined，那么另一个操作符必须为 null 或者 undefined，才会返回 true，否则都返回 false；
// 如果其中一个是 Symbol 类型，那么返回 false；
// 两个操作值如果为 string 和 number 类型，那么就会将字符串转换为 number；
// 如果一个操作值是 boolean，那么转换成 number；
// 如果一个操作值为 object 且另一方为 string、number 或者 symbol，就会把 object 转为原始类型再进行判断（调用 object 的 valueOf/toString 方法进行转换）。

// '+' 的隐式类型转换规则
// 如果其中有一个是字符串，另外一个是 undefined、null 或布尔型，则调用 toString() 方法进行字符串拼接；如果是纯对象、数组、正则等，则默认调用对象的转换方法会存在优先级（下一讲会专门介绍），然后再进行拼接。
// 如果其中有一个是数字，另外一个是 undefined、null、布尔型或数字，则会将其转换成数字进行加法运算，对象的情况还是参考上一条规则。
// 如果其中一个是字符串、一个是数字，则按照字符串规则进行拼接。

// Object 的转换规则
// 如果部署了 Symbol.toPrimitive 方法，优先调用再返回；
// 调用 valueOf()，如果转换为基础类型，则返回；
// 调用 toString()，如果转换为基础类型，则返回；
// 如果都没有返回基础类型，会报错。

var obj = {
  value: 1,
  valueOf() {
    return 2
  },
  toString() {
    return '3'
  },
  [Symbol.toPrimitive]() {
    return 4
  }
}