/*
 * @Description: 实现JSON.Stringify方法
 * @Autor: lijinpeng
 * @Date: 2021-03-05 11:37:12
 * @LastEditors: lijinpeng
 */

// JSON.stringify
// 方法基本介绍
// JSON.stringify 是日常开发中经常用到的 JSON 对象中的一个方法，
// JSON 对象包含两个方法：一是用于解析成 JSON 对象的 parse()；二是用于将对象转换为 JSON 字符串方法的 stringify()。

// JSON.parse
// JSON.parse 方法用来解析 JSON 字符串，构造由字符串描述的 JavaScript 值或对象。
// 该方法有两个参数：第一个参数是需要解析处理的 JSON 字符串，
// 第二个参数是可选参数提供可选的 reviver 函数，用在返回之前对所得到的对象执行变换操作。
// 该方法的语法为：JSON.parse(text[, reviver])
const json = '{"result":true, "count":2}';
const obj = JSON.parse(json);
console.log(obj.count);
// 2
console.log(obj.result);
// true
/* 带第二个参数的情况 */
JSON.parse('{"p": 5}', function (k, v) {
  if(k === '') return v;     // 如果k不是空，
  return v * 2;              // 就将属性值变为原来的2倍返回
});

// JSON.stringify
// JSON.stringify 方法是将一个 JavaScript 对象或值转换为 JSON 字符串，
// 默认该方法其实有三个参数：第一个参数是必选，后面两个是可选参数非必选。
// 第一个参数传入的是要转换的对象；
// 第二个是一个 replacer 函数，比如指定的 replacer 是数组，则可选择性地仅处理包含数组指定的属性；
// 第三个参数用来控制结果字符串里面的间距，后面两个参数整体用得比较少。
// 该方法的语法为：JSON.stringify(value[, replacer [, space]])
JSON.stringify({ x: 1, y: 2 });
// "{"x":1,"y":2}"
JSON.stringify({ x: [10, undefined, function(){}, Symbol('')] })
// "{"x":[10,null,null,null]}"
/* 第二个参数的例子 */
function replacer(key, value) {
  if (typeof value === "string") {
    return undefined;
  }
  return value;
}
var foo = {foundation: "Mozilla", model: "box", week: 4, transport: "car", month: 7};
var jsonString = JSON.stringify(foo, replacer);
console.log(jsonString);
// "{"week":4,"month":7}"
/* 第三个参数的例子 */
JSON.stringify({ a: 2 }, null, " ");
/* "{
 "a": 2
}"*/
JSON.stringify({ a: 2 }, null, "");
// "{"a":2}"

// 代码逻辑实现
// JSON.stringify 实现思路
// 对于基础数据类型 和 引用数据类型区别
// unfefined、function、symbol 序列化返回 undefined
// boolean 返回 "false"/"true"
// number 返回字符串类型的数值
// null、NaN、Infinity、-Infinity 返回 "null"
// string 返回 string
// Array数组种出现了unfefined、function、symbol 返回 "null"
// RegExp 返回 "{}"
// Date 返回 toJSON() 字符串值
// 普通object
// 1.如果有toJSON()方法，那么序列化toJSON()的返回值
// 2.如果属性值中出现了unfefined、function、symbol 忽略掉
// 3.所有以symbol为属性键的属性都会被完全忽略掉

function jsonStringify(data) {
  const type = typeof data
  if (type !== 'object') {
    // 基础数据类型
    let result = data
    if (type === 'undefined' || type === 'function' || type === 'symbol') {
      // 由于 function 序列化返回 undefined，因此和 undefined、symbol 一起处理
      return undefined
    } else if (Number.isNaN(data) || data === Infinity || data === -Infinity) {
      //NaN 和 Infinity 序列化返回 "null"
      result = "null"
    } else if (type === 'string') {
      result = '"'+ data + '"'
    }
    return String(result)
  } else if (type === 'object') {
    // 引用数据类型
    if (data === null) {
      return "null" // 第01讲有讲过 typeof null 为'object'的特殊情况
    } else if (data.toJSON && typeof data.toJSON === 'function') {
      return jsonStringify(data.toJSON())
    } else if (data instanceof Array) {
      let result = []
      //如果是数组，那么数组里面的每一项类型又有可能是多样的
      data.forEach((item, index) => {
        const itemType = typeof item
        if (itemType === 'undefined' || itemType === 'function' || itemType === 'symbol') {
          result[index] = "null"
        } else {
          result[index] = jsonStringify(item)
        }
      })
      return ("[" + result + "]")
    } else {
      let result = []
      Object.keys(data).forEach(item => {
        if (typeof item !== 'symbol') {
          // key 如果是 symbol 对象，忽略
          const dataType = typeof data[item]
          if (dataType !== 'undefined' && dataType !== 'function' && dataType !== 'symbol') {
            result.push('"' + item + '"' + ":" + jsonStringify(data[item]))
          }
        }
      })
      return ("{" + result + "}")
    }
  }
}

// let array = [1,2,3,{obj: 2}];
// console.log(jsonStringify(array) === JSON.stringify(array));

// let boolean = true
// console.log(jsonStringify(array) === JSON.stringify(array));

// let regexp = new RegExp(/w/g)
// console.log(jsonStringify(regexp) === JSON.stringify(regexp));

// let objobj = {name: '2222'}
// objobj.objobj = objobj
// console.log(jsonStringify(objobj) === JSON.stringify(objobj));