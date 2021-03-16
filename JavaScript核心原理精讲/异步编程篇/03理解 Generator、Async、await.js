/*
 * @Description: 理解 Generator、Async/await 等异步编程的语法糖
 * @Autor: lijinpeng
 * @Date: 2021-03-07 22:28:37
 * @LastEditors: lijinpeng
 */
// Generator 是 ES6 标准中的异步编程方式，而 async/await 是 ES7 标准中的。
// Generator 执行之后，最后返回的是什么？
// async/await 的方式比 Promise 和 Generator 好在哪里？

// Generator 基本介绍
// Generator（生成器）是 ES6 的新关键词
// 通俗来讲 Generator 是一个带星号的“函数”（它并不是真正的函数），
// 可以配合 yield 关键字来暂停或者执行函数。
function* gen() {
  console.log("enter");
  let a = yield 1;
  let b = yield (function () {return 2})();
  return 3;
}
var g = gen()           // 阻塞住，不会执行任何语句
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
// output:
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: true }
// { value: undefined, done: true }
// Generator 中配合使用 yield 关键词可以控制函数执行的顺序，
// 每当执行一次 next 方法，Generator 函数会执行到下一个存在 yield 关键词的位置。
// 总结下来，Generator 的执行有这几个关键点。
// 调用 gen() 后，程序会阻塞住，不会执行任何语句。
// 调用 g.next() 后，程序继续执行，直到遇到 yield 关键词时执行暂停。
// 一直执行 next 方法，最后返回一个对象，其存在两个属性：value 和 done。

// yield基本介绍
// yield 同样也是 ES6 的新关键词，配合 Generator 执行以及暂停。
// yield 关键词最后返回一个迭代器对象，该对象有 value 和 done 两个属性，其中 done 属性代表返回值以及是否完成。
// yield 配合着 Generator，再同时使用 next 方法，可以主动控制 Generator 执行进度。
function* gen1() {
  yield 1;
  yield* gen2();
  yield 4;
}
function* gen2() {
  yield 2;
  yield 3;
}
var g = gen1();
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
// output:
// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: 4, done: false }
// {value: undefined, done: true}

// thunk 函数介绍
let isType = (type) => {
  return (obj) => {
    return Object.prototype.toString.call(obj) === `[object ${type}]`;
  }
}
let isString = isType('String');
let isArray = isType('Array');
isString("123");    // true
isArray([1,2,3]);   // true
// 相应的 isString 和 isArray 是由 isType 方法生产出来的函数，通过上面的方式来改造代码，明显简洁了不少。
// 像 isType 这样的函数我们称为 thunk 函数，它的基本思路都是接收一定的参数，会生产出定制化的函数，
// 最后使用定制化的函数去完成想要实现的功能。

// Generator 和 thunk 结合
const readFileThunk = (filename) => {
  return (callback) => {
    fs.readFile(filename, callback);
  }
}
const gen = function* () {
  const data1 = yield readFileThunk('1.txt')
  console.log(data1.toString())
  const data2 = yield readFileThunk('2.txt')
  console.log(data2.toString)
}
let g = gen();
g.next().value((err, data1) => {
  g.next(data1).value((err, data2) => {
    g.next(data2);
  })
})

function run(gen){
  const next = (err, data) => {
    let res = gen.next(data);
    if(res.done) return;
    res.value(next);
  }
  next();
}
run(g);
// 改造完之后，我们可以看到 run 函数和上面的执行效果其实是一样的。代码虽然只有几行，但其包含了递归的过程，
// 解决了多层嵌套的问题，并且完成了异步操作的一次性的执行效果。这就是通过 thunk 函数完成异步操作的情况

// Generator 和 Promise 结合
// 最后包装成 Promise 对象进行返回
const readFilePromise = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if(err) {
        reject(err);
      }else {
        resolve(data);
      }
    })
  }).then(res => res);
}
// 这块和上面 thunk 的方式一样
const gen = function* () {
  const data1 = yield readFilePromise('1.txt')
  console.log(data1.toString())
  const data2 = yield readFilePromise('2.txt')
  console.log(data2.toString)
}
// 这块和上面 thunk 的方式一样
function run(gen){
  const next = (err, data) => {
    let res = gen.next(data);
    if(res.done) return;
    res.value.then(next);
  }
  next();
}
run(g);

// co 函数库
// co 函数库是著名程序员 TJ 发布的一个小工具，用于处理 Generator 函数的自动执行。
// 核心原理其实就是上面讲的通过和 thunk 函数以及 Promise 对象进行配合，包装成一个库。
const co = require('co');
let g = gen();
co(g).then(res =>{
  console.log(res);
})

// 为什么 co 函数库可以自动执行 Generator 函数，它的处理原理是什么呢？
// 因为 Generator 函数就是一个异步操作的容器，它需要一种自动执行机制，
// co 函数接受 Generator 函数作为参数，并最后返回一个 Promise 对象。
// 在返回的 Promise 对象里面，co 先检查参数 gen 是否为 Generator 函数。
// 如果是，就执行该函数；如果不是就返回，并将 Promise 对象的状态改为 resolved。
// co 将 Generator 函数的内部指针对象的 next 方法，包装成 onFulfilled 函数。这主要是为了能够捕捉抛出的错误。
// 关键的是 next 函数，它会反复调用自身。

// async/await 介绍
// JS 的异步编程从最开始的回调函数的方式，演化到使用 Promise 对象，再到 Generator+co 函数的方式
// 而 async/await 被称为 JS 中异步终极解决方案，
// 它既能够像 co+Generator 一样用同步的方式来书写异步代码，又得到底层的语法支持，无须借助任何第三方库。
// readFilePromise 依旧返回 Promise 对象
const readFilePromise = (filename) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if(err) {
        reject(err);
      }else {
        resolve(data);
      }
    })
  }).then(res => res);
}
// 这里把 Generator的 * 换成 async，把 yield 换成 await
const gen = async function() {
  const data1 = await readFilePromise('1.txt')
  console.log(data1.toString())
  const data2 = await readFilePromise('2.txt')
  console.log(data2.toString)
}

// async 函数对 Generator 函数的改进，主要体现在以下三点。
// 内置执行器：Generator 函数的执行必须靠执行器，因为不能一次性执行完成，所以之后才有了开源的 co 函数库。
// 但是，async 函数和正常的函数一样执行，也不用 co 函数库，也不用使用 next 方法，而 async 函数自带执行器，会自动执行。
// 适用性更好：co 函数库有条件约束，yield 命令后面只能是 Thunk 函数或 Promise 对象，
// 但是 async 函数的 await 关键词后面，可以不受约束。
// 可读性更好：async 和 await，比起使用 * 号和 yield，语义更清晰明了。
async function func() {
  return 100;
}
console.log(func());
// Promise {<fulfilled>: 100}

// 异步编程特点
// Generator：
// 生成器函数配合着 yield 关键词来使用，不自动执行，需要执行 next 方法一步一步往下执行
// Generator+co：
// 通过引入开源co函数库，实现异步编程，并且还能控制返回结果为promise对象，方便后面继续操作，但是要求yield后面
// 只能是thunk函数或Promise对象
// async/await
// ES7引入的终极异步编程解决方案，不用引入其他任何库，对于await后面的类型无限制，可读性更好，容易理解