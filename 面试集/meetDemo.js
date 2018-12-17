// webpack 配置
var webpack = require('webpack')
module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }
    ]
  }
}

// 获取对象上已定义(可枚举)的属性和方法
Object.keys(obj)
// 获取对象所有自身属性的属性名（包括不可枚举属性但不包括Symbol值作为名称的属性）组成的数组
Object.getOwnPropertyNames()
//  for...in 循环
//返回直接定义在该对象上的可枚举属性，非继承。通过hasOwnProperty()方法可以将那些属性是对象自身(非继承)属性筛选出来，从而将不可枚举属性排除出去
//obj.hasOwnProperty(prop): prop要检测的属性,字符串 名称或者 Symbol。     返回值:用来判断某个对象是否含有指定的属性 的Boolean值

// 数组去重
let arr = [22,2,33,4,33,5,55,44,3,4]
let unique = [...new Set(arr)].sort(function(a,b){
  return a < b ? -1 : 1
})

let unique = arr => {
  var obj = {}
  arr.map(val => {
    obj[val] = 1
  })
  return Object.keys(obj)
}

// 数组去重并返回出现的次数
let unique = arr => {
  var obj = {}
  arr.map(val => {
    if (!obj[val]) {
      obj[val] = 1
    } else {
      obj[val]++
    }
  })
  return Object.keys(obj)
}

// 字符串倒置
let str = 'lijinpeng'
let rts = str.split('').reverse().join('')

// 驼峰 与 短线连接互转
I
let s = 'footStyleSheet';
let _s = s.replace(/([A-Z])/g, "-$1").toLowerCase()
console.log(_s)

II
let _s = 'foot-style-sheet';
let s = _s.replace(/\-(\w)/g, function(x){
  return x.slice(1).toUpperCase()
})

// new 关键字
new Animal('cat') = () => {
  let obj = {};
  obj._proto_ = Animal.prototype;
  let res = Animal.cell(obj, "cat")
  return typeof res === 'object' ? res : obj;
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 * 
 * 对对象类型进行严格检查，只有当对象是纯javascript对象的时候返回true
 */
const _toString = Object.prototype.toString
// Object.prototype.toString.call({})
// "[object Object]"
// Object.prototype.toString.call([])
// "[object Array]"
// Object.prototype.toString.call(/(a-z)/g)
// "[object RegExp]"

/* @flow */

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef(v: any): boolean % checks {
  return v === undefined || v === null
}

function isDef(v: any): boolean % checks {
  return v !== undefined && v !== null
}

function isTrue(v: any): boolean % checks {
  return v === true
}

/**
 * Check if value is primitive
 */
function isPrimitive(value: any): boolean % checks {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject(obj: mixed): boolean % checks {
  return obj !== null && typeof obj === 'object'
}

function isPlainObject (obj: any): boolean {
  return _toString.call(obj) === '[object Object]'
}

function isArray (arr: any): boolean {
  return _toString.call(arr) === '[object Array]'
}

function isRegExp (v: any): boolean {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Convert a value to a string that is actually rendered.
 * 
 * 将val转化成字符串
 */
function toString(val: any): string {
  return val == null 
    ? '' 
    : typeof val === 'object' 
      ? JSON.stringify(val) 
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 *
 * 将字符串转化为数字，如果转换失败会返回原字符串 
 * isNaN() 函数用于检查其参数是否是非数字值。
 */
function toNumber(val: any): number | string {
  let n = parseFloat(val)
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 * 
 * 返回一个函数用以检测是否一个key值存在这个函数中
 */

function makeMap (
  str: string,
  expectsLowerCase?: boolean
): (key: string) => true | void {
  const map = Object.create(null)
  const list: Array<string> = str.split(',')
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true
  }
  return expectsLowerCase
    ? val => map[val.toLowerCase()]
    : val => map[val]
}

/**
 * Check if a tag is a built-in tag.
 */
const isBuiltInTag = makeMap('slot,component', true)

/**
 * Remove an item from an array
 */
function remove (arr: Array<any>, item: any): Array<any> | void {
  if (arr.length) {
    const index = arr.indexOf(item)
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 * 
 * 检查对象是否具有属性。
 */
const hasOwnProperty = Object.prototype.hasOwnProperty
function hasOwn (obj: Object | Array<*>, key: string): boolean {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 *
 * 根据str得到fn(str)的结果，但是这个结果会被闭包中的cache缓存起来，下一次如果是同样的str则不需要经过fn(str)重新计算，而是直接得到结果
 */
function cached<F: Function> (fn: F): F {
  const cache = Object.create(null)
  return (function cachedFn (str: string) {
    const hit = cache[str]
    return hit || (cache[str] = fn(str))
  }: any)
}

/**
 * Camelize a hyphen-delimited string.
 */
/*将原本用-连接的字符串变成驼峰 aaa-bbb-ccc => aaaBbbCcc*/
const camelizeRE = /-(\w)/g
const camelize = cached((str: string): string => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})

/**
 * Capitalize a string.
 */
/*首字母转大写*/
const capitalize = cached((str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
})

/**
 * Hyphenate a camelCase string.
 */
/*连接一个camelCase字符串。*/
const hyphenateRE = /([^-])([A-Z])/g
const hyphenate = cached((str: string): string => {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
})

const hyphenateRE1 = /([A-Z])/g
const hyphenate1 = cached((str: string): string => {
  return str
    .replace(hyphenateRE1, '-$1')
    .toLowerCase()
})

/**
 * Simple bind, faster than native
 * 
 * 简单绑定 比原生快
 */
function bind (fn: Function, ctx: Object): Function {
  function boundFn(a) {
    const l: number = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  boundFn._length = fn.length
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
/*将类数组的对象转换成数组*/
function toArray (list: any, start?: number): Array<any> {
  start = start || 0
  let i = list.length - start
  const ret: Array<any> = new Array(i)
  while (i--) {
    ret[i] = list[i + start]
  }
  return ret
}

/**
 * Mix properties into target object.
 */
/*将_from的属性混合（会覆盖）to对象中*/
function extend (to: Object, _from: ?Object): Object {
  for (const key in _from) {
    to[key] = _from[key]
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
/*合并Array数组中的每一个对象到一个新的Object中*/
function toObject (arr: Array<any>): Object {
  const res = {}
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
    return res
  }
}

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules: Array<ModuleOptions>): string {
  return modules.reduce((keys, m) => {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
/*检测两个变量是否相等*/
function looseEqual (a: mixed, b: mixed): boolean {
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      return JSON.stringify(a) === JSON.stringify(b)
    } catch (e) {
      // possible circular reference
      return a === b
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * 检测arr数组中是否包含与val变量相等的项
 */
function looseIndexOf (arr: Array<mixed>, val: mixed): number {
  for (let i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) return i
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn: Function): Function {
  let called = false
  return function () {
    if (!called) {
      called = true
      fn.apply(this, arguments)
    }
  }
}
