/*
 * @Description: 手写 JS 数组多个方法的底层实现
 * @Autor: lijinpeng
 * @Date: 2021-03-07 20:11:49
 * @LastEditors: lijinpeng
 */

// V8 数组源码地址
// https://github.com/v8/v8/blob/98d735069d0937f367852ed968a33210ceb527c2/src/js/array.js

// push 方法的底层实现
// 关键点就在于给数组本身循环添加新的元素 item，然后调整数组的长度 length 为最新的长度
Array.prototype.push = function(...items) {
  let O = Object(this);  // ecma 中提到的先转换为对象
  let len = this.length >>> 0;
  let argCount = items.length >>> 0;
  // 2 ^ 53 - 1 为JS能表示的最大正整数
  if (len + argCount > 2 ** 53 - 1) {
    throw new TypeError("The number of array is over the max value")
  }
  for (let i = 0; i < argCount; i++) {
    O[len + i] = items[i];
  }
  let newLength = len + argCount;
  O.length = newLength;
  return newLength;
}

// pop 方法的底层实现
// 其核心思路还是在于删掉数组自身的最后一个元素，index 就是数组的 len 长度，然后更新最新的长度，最后返回的元素的值
// 另外就是在当长度为 0 的时候，如果执行 pop 操作，返回的是 undefined，需要做一下特殊处理。
Array.prototype.pop = function() {
  let O = Object(this);
  let len = this.length >>> 0;
  if (len === 0) {
    O.length = 0;
    return undefined;
  }
  len --;
  let value = O[len];
  delete O[len];
  O.length = len;
  return value;
}

// map 方法的底层实现
// 基本就是再多加一些判断，循环遍历实现 map 的思路，将处理过后的 mappedValue
// 赋给一个新定义的数组 A，最后返回这个新数组 A，并不改变原数组的值
Array.prototype.map = function(callbackfn, thisArg) {
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'map' of null");
  }
  if (Object.prototype.toString.call(callbackfn) !== "[object Function]") {
    throw new TypeError(callbackfn + ' is not a function')
  }
  let O = Object(this);
  let T = thisArg;

  let len = O.length >>> 0;
  let A = new Array(len);
  for (let k = 0; k < len; k++) {
    if (k in O) {
      let kValue = O[k];
      // 依次传入this, 当前项，当前索引，整个数组
      let mappedValue = callbackfn.call(T, kValue, k, O);
      A[k] = mappedValue;
    }
  }
  return A;
}

// reduce 方法的底层实现
Array.prototype.reduce = function(callbackfn, initialValue) {
  console.log(this)
  // 异常处理，和 map 类似
  if (this === null || this === undefined) {
    throw new TypeError("Cannot read property 'reduce' of null");
  }
  // 处理回调类型异常
  if (Object.prototype.toString.call(callbackfn) !== "[object Function]") {
    throw new TypeError(callbackfn + ' is not a function')
  }
  let O = Object(this);
  let len = O.length >>> 0;
  let k = 0;
  let accumulator = initialValue;  // reduce方法第二个参数作为累加器的初始值
  if (accumulator === undefined) {  // 初始值不传的处理
    for (; k < len ; k++) {
      if (k in O) {
        accumulator = O[k];
        k++;
        break;
      }
    }
    if (accumulator === undefined) {
      throw new Error('Reduce of empty array with no initial value');
    }
  }
  for (;k < len; k++) {
    if (k in O) {
      // 注意 reduce 的核心累加器
      accumulator = callbackfn.call(undefined, accumulator, O[k], k);
    }
  }
  return accumulator;
}