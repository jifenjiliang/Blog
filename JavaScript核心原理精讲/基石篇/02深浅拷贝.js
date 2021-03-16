/*
 * @Description: 深浅拷贝
 * @Autor: lijinpeng
 * @Date: 2021-03-04 10:50:02
 * @LastEditors: lijinpeng
 */

// 浅拷贝的原理和实现
// 自己创建一个新的对象，来接受你要重新复制或引用的对象值。如果对象属性是基本的数据类型，复制的就是基本类型的值给新对象；
// 但如果属性是引用数据类型，复制的就是内存中的地址，如果其中一个对象改变了这个内存中的地址，肯定会影响到另一个对象。

// 方法一：Object.assign
// 该方法的第一个参数是拷贝的目标对象，后面的参数是拷贝的来源对象
// 语法为：Object.assign(target, ...sources)
let target = {};
let source = { a: { b: 1 } };
Object.assign(target, source);
console.log(target); // { a: { b: 1 } };

// 它不会拷贝对象的继承属性；
// 它不会拷贝对象的不可枚举的属性；
// 可以拷贝 Symbol 类型的属性。
let obj1 = { a:{ b:1 }, sym:Symbol(1)};
Object.defineProperty(obj1, 'innumerable' ,{
    value:'不可枚举属性',
    enumerable:false
});
let obj2 = {};
Object.assign(obj2,obj1)
obj1.a.b = 2;
console.log('obj1',obj1);
console.log('obj2',obj2);

// 方法二：扩展运算符方式
// 扩展运算符的语法为：let cloneObj = { ...obj };

/* 对象的拷贝 */
let obj = {a:1,b:{c:1}}
let obj2 = {...obj}
obj.a = 2
console.log(obj)  //{a:2,b:{c:1}} console.log(obj2); //{a:1,b:{c:1}}
obj.b.c = 2
console.log(obj)  //{a:2,b:{c:2}} console.log(obj2); //{a:1,b:{c:2}}
/* 数组的拷贝 */
let arr = [1, 2, 3];
let newArr = [...arr]; //跟arr.slice()是一样的效果

// 扩展运算符 和 object.assign 有同样的缺陷，也就是实现的浅拷贝的功能差不多，
// 但是如果属性都是基本类型的值，使用扩展运算符进行浅拷贝会更加方便。

// 方法三：concat 拷贝数组
// 数组的 concat 方法其实也是浅拷贝，
// 所以连接一个含有引用类型的数组时，需要注意修改原数组中的元素的属性，因为它会影响拷贝之后连接的数组。
// 不过 concat 只能用于数组的浅拷贝，使用场景比较局限。代码如下所示。
let arr = [1, 2, 3, {a: 2}];
let newArr = arr.concat();
newArr[1] = 100;
console.log(arr);  // [ 1, 2, 3 ]
console.log(newArr); // [ 1, 100, 3 ]

// 方法四：slice 拷贝数组
// slice 方法也比较有局限性，因为它仅仅针对数组类型。
// slice 方法会返回一个新的数组对象，这一对象由该方法的前两个参数来决定原数组截取的开始和结束时间，是不会影响和改变原始数组的。
let arr = [1, 2, {val: 4}];
let newArr = arr.slice();
newArr[2].val = 1000;
console.log(arr);  //[ 1, 2, { val: 1000 } ]

// 从上面的代码中可以看出，这就是浅拷贝的限制所在了——它只能拷贝一层对象。

// 手工实现一个浅拷贝
// 对基础类型做一个最基本的一个拷贝；
// 对引用类型开辟一个新的存储，并且拷贝一层对象属性。
const shallowClone = (target) => {
  if (typeof target === 'object' && typeof target !== 'function' && target !== null) {
    const cloneTarget = Array.isArray(target) ? [] : {}
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = target[prop]
      }
    }
    return cloneTarget
  } else {
    return target
  }
}

// 深拷贝的原理和实现
// 浅拷贝只是创建了一个新的对象，复制了原有对象的基本类型的值，而引用数据类型只拷贝了一层属性，再深层的还是无法进行拷贝。
// 深拷贝则不同，对于复杂引用数据类型，其在堆内存中完全开辟了一块内存地址，并将原有的对象完全复制过来存放。
// 将一个对象从内存中完整地拷贝出来一份给目标对象，并从堆内存中开辟一个全新的空间存放新对象，且新对象的修改并不会改变原对象，二者实现真正的分离。

// 方法一：乞丐版（JSON.stringifyy）
// JSON.stringfy() 是目前开发过程中最简单的深拷贝方法，
// 其实就是把一个对象序列化成为 JSON 的字符串，并将对象里面的内容转换成字符串，最后再用 JSON.parse() 的方法将JSON 字符串生成一个新的对象。
let obj1 = { a:1, b:[1,2,3] }
let str = JSON.stringify(obj1);
let obj2 = JSON.parse(str);
console.log(obj2);   //{a:1,b:[1,2,3]}
obj1.a = 2;
obj1.b.push(4);
console.log(obj1);   //{a:2,b:[1,2,3,4]}
console.log(obj2);   //{a:1,b:[1,2,3]}

/*
不足之处：
  1.拷贝的对象的值中如果有函数、undefined、symbol 这几种类型，经过 JSON.stringify 序列化之后的字符串中这个键值对会消失；
  2.拷贝 Date 引用类型会变成字符串；
  3.无法拷贝不可枚举的属性；
  4.无法拷贝对象的原型链；
  5.拷贝 RegExp 引用类型会变成空对象；
  6.对象中含有 NaN、Infinity 以及 -Infinity，JSON 序列化的结果会变成 null；
  7.无法拷贝对象的循环应用，即对象成环 (obj[key] = obj)。
*/
function Obj() {
  this.func = function () { alert(1) };
  this.obj = {a:1};
  this.arr = [1,2,3];
  this.und = undefined;
  this.reg = /123/;
  this.date = new Date(0);
  this.NaN = NaN;
  this.infinity = Infinity;
  this.sym = Symbol(1);
}
let obj1 = new Obj();
Object.defineProperty(obj1,'innumerable',{
  enumerable:false,
  value:'innumerable'
});
console.log('obj1',obj1);
let str = JSON.stringify(obj1);
let obj2 = JSON.parse(str);
console.log('obj2',obj2);

// 方法二：基础版（手写递归实现）
function deepClone(obj) {
  let cloneObj = {}
  for (let key in obj) {   //遍历
    if (typeof obj[key] === 'object') {
      cloneObj[key] = deepClone(obj[key])  //是对象就再次调用该函数递归
    } else {
      cloneObj[key] = obj[key]  //基本类型的话直接复制值
    }
  }
  return cloneObj
}
/*
不足之处：
  1.这个深拷贝函数并不能复制不可枚举的属性以及 Symbol 类型；
  2.这种方法只是针对普通的引用类型的值做递归复制，而对于 Array、Date、RegExp、Error、Function 这样的引用类型并不能正确地拷贝；
  3.对象的属性里面成环，即循环引用没有解决。
*/

// 方法三：改进版（改进后递归实现）
// 针对能够遍历对象的不可枚举属性以及 Symbol 类型，我们可以使用 Reflect.ownKeys 方法；
// 当参数为 Date、RegExp 类型，则直接生成一个新的实例返回；
// 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性，以及对应的特性，
// 顺便结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链；
// 利用 WeakMap 类型作为 Hash 表，因为 WeakMap 是弱引用类型，可以有效防止内存泄漏（你可以关注一下 Map 和 weakMap 的关键区别，这里要用 weakMap），
// 作为检测循环引用很有帮助，如果存在循环，则引用直接返回 WeakMap 存储的值。
// 引用数据类型
const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)
const deepClone = function (obj, hash = new WeakMap()) {
  if (obj.constructor === Date) return new Date(obj) // 日期对象直接返回一个新的日期对象
  if (obj.constructor === RegExp) return new RegExp(obj) // 正则对象直接返回一个新的正则对象
  if (hash.has(obj)) return hash.get(obj)  // 如果循环引用了就用 weakMap 来解决
  let allDesc = Object.getOwnPropertyDescriptors(obj) // 获取对象所有属性的描述
  // 遍历传入参数所有键的特性
  let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
  // 继承原型链
  hash.set(obj, cloneObj)
  for (let key of Reflect.ownKeys(obj)) {
    cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key], hash) : obj[key]
  }
  return cloneObj
}

// 下面是验证代码
let obj = {
  num: 0,
  str: '',
  boolean: true,
  unf: undefined,
  nul: null,
  obj: { name: '我是一个对象', id: 1 },
  arr: [0, 1, 2],
  func: function () { console.log('我是一个函数') },
  date: new Date(0),
  reg: new RegExp('/我是一个正则/ig'),
  [Symbol('1')]: 1,
};
Object.defineProperty(obj, 'innumerable', {
  enumerable: false, value: '不可枚举属性' }
);
obj = Object.create(obj, Object.getOwnPropertyDescriptors(obj))
obj.loop = obj    // 设置loop成循环引用的属性
let cloneObj = deepClone(obj)
cloneObj.arr.push(4)
console.log('obj', obj)
console.log('cloneObj', cloneObj)

// Object.create
// 创建一个新对象，使用现有的对象来提供新创建的对象的proto。
// 语法为：Object.create(proto, [propertiesObject])
let source = { a: { b: 1 } };
let target = Object.create(source)
console.log(target)