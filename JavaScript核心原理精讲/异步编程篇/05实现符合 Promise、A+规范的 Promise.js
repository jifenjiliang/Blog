/*
 * @Description: 实现符合 Promise/A+ 规范的 Promise
 * @Autor: lijinpeng
 * @Date: 2021-03-07 23:37:25
 * @LastEditors: lijinpeng
 */

// Promise/A+ 规范
// “promise”：是一个具有 then 方法的对象或者函数，它的行为符合该规范。
// “thenable”：是一个定义了 then 方法的对象或者函数。
// “value”：可以是任何一个合法的 JavaScript 的值（包括 undefined、thenable 或 promise）。
// “exception”：是一个异常，是在 Promise 里面可以用 throw 语句抛出来的值。
// “reason”：是一个 Promise 里 reject 之后返回的拒绝原因。

// 状态描述
// 一个 Promise 有三种状态：pending、fulfilled 和 rejected。
// 当状态为 pending 状态时，即可以转换为 fulfilled 或者 rejected 其中之一。
// 当状态为 fulfilled 状态时，就不能转换为其他状态了，必须返回一个不能再改变的值。
// 当状态为 rejected 状态时，同样也不能转换为其他状态，必须有一个原因的值也不能改变。

// then 方法
// 一个 Promise 必须拥有一个 then 方法来访问它的值或者拒绝原因。
// then 方法有两个参数：
// promise.then(onFulfilled, onRejected)
// onFulfilled 和 onRejected 都是可选参数。

// onFulfilled 和 onRejected 特性
// 如果 onFulfilled 是函数，则当 Promise 执行结束之后必须被调用，最终返回值为 value，其调用次数不可超过一次。
// 而 onRejected 除了最后返回的是 reason 外，其他方面和 onFulfilled 在规范上的表述基本一样。
// then 方法其实可以被一个 Promise 调用多次，且必须返回一个 Promise 对象。
promise2 = promise1.then(onFulfilled, onRejected);

// 一步步实现 Promise
// 按照 Promise/A+ 的规范，第一步就是构造函数。
// 构造函数
// 这一步的思路是：Promise 构造函数接受一个 executor 函数，
// executor 函数执行完同步或者异步操作后，调用它的两个参数 resolve 和 reject。请看下面的代码，大致的构造函数框架就是这样的。
try {
  module.exports = Promise
} catch (e) {}
function Promise(executor) {
  var self = this
  self.status = 'pending'   // Promise当前的状态
  self.data = undefined     // Promise的值
  self.onResolvedCallback = [] // Promise resolve时的回调函数集
  self.onRejectedCallback = [] // Promise reject时的回调函数集
  function resolve(value) {
    // TODO
    if (value instanceof Promise) {
      return value.then(resolve, reject)
    }
    setTimeout(function() { // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'resolved'
        self.data = value
        for (var i = 0; i < self.onResolvedCallback.length; i++) {
          self.onResolvedCallback[i](value)
        }
      }
    })
  }
  function reject(reason) {
    // TODO
    setTimeout(function() { // 异步执行所有的回调函数
      if (self.status === 'pending') {
        self.status = 'rejected'
        self.data = reason
        for (var i = 0; i < self.onRejectedCallback.length; i++) {
          self.onRejectedCallback[i](reason)
        }
      }
    })
  }
  try { // 考虑到执行过程中有可能出错，所以我们用try/catch块给包起
    executor(resolve, reject) // 执行executor并传入相应的参数
  } catch(e) {
    reject(e)
  }
}
function resolvePromise(promise2, x, resolve, reject) {
  var then
  var thenCalledOrThrow = false
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise!'))
  }
  if (x instanceof Promise) {
    if (x.status === 'pending') {
      x.then(function(v) {
        resolvePromise(promise2, v, resolve, reject)
      }, reject)
    } else {
      x.then(resolve, reject)
    }
    return
  }
  if ((x !== null) && ((typeof x === 'object') || (typeof x === 'function'))) {
    try {
      then = x.then
      if (typeof then === 'function') {
        then.call(x, function rs(y) {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          return resolvePromise(promise2, y, resolve, reject)
        }, function rj(r) {
          if (thenCalledOrThrow) return
          thenCalledOrThrow = true
          return reject(r)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (thenCalledOrThrow) return
      thenCalledOrThrow = true
      return reject(e)
    }
  } else {
    resolve(x)
  }
}
// then方法接收两个参数onResolved和onRejected，分别为Promise成功或失败后的回调
Promise.prototype.then = function(onResolved, onRejected) {
  var self = this
  var promise2
  // 根据标准，如果then的参数不是function，则需要忽略它
  onResolved = typeof onResolved === 'function' ? onResolved : function(v) {return v}
  onRejected = typeof onRejected === 'function' ? onRejected : function(r) {throw r}
  if (self.status === 'resolved') {
    // 如果promise1的状态已经确定并且是resolved，我们调用onResolved，考虑到有可能throw，所以还需要将其包在try/catch块里
    return promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() { // 异步执行onResolved
        try {
          var x = onResolved(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    })
  }
  // 此处与前一个if块的逻辑几乎相同，区别在于所调用的是onRejected函数
  if (self.status === 'rejected') {
    return promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() { // 异步执行onRejected
        try {
          var x = onRejected(self.data)
          resolvePromise(promise2, x, resolve, reject)
        } catch (reason) {
          reject(reason)
        }
      })
    })
  }
  if (self.status === 'pending') {
    // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，只能等到Promise的状态确定后，才能确定如何处理
    // 这里之所以没有异步执行，是因为这些函数必然会被resolve或reject调用，而resolve或reject函数里的内容已是异步执行，构造函数里的定义
    return promise2 = new Promise(function(resolve, reject) {
      self.onResolvedCallback.push(function(value) {
        try {
          var x = onResolved(value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (r) {
          reject(r)
        }
      })
      self.onRejectedCallback.push(function(reason) {
        try {
          var x = onRejected(reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (r) {
          reject(r)
        }
      })
    })
  }
}
Promise.prototype.catch = function(onRejected) {
  return this.then(null, onRejected)
}
// 最后这个是测试用的，后面会说
Promise.deferred = Promise.defer = function() {
  var dfd = {}
  dfd.promise = new Promise(function(resolve, reject) {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}