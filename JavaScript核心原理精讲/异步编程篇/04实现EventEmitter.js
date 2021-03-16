/*
 * @Description: 怎样轻松实现一个 EventEmitter？
 * @Autor: lijinpeng
 * @Date: 2021-03-07 23:03:54
 * @LastEditors: lijinpeng
 */
// events 模块属于 Node.js 服务端的知识，但是由于大多数 Node.js 核心 API 构建用的是异步事件驱动架构

// Events 基本介绍
// Node.js的events 模块对外提供了一个 EventEmitter 对象，用于对 Node.js 中的事件进行统一管理。
// 因为 Node.js 采用了事件驱动机制，而 EventEmitter 就是 Node.js 实现事件驱动的基础。
// 在 EventEmitter 的基础上，Node.js 中几乎所有的模块都继承了这个类，以实现异步事件驱动架构。
var events = require('events');
const { on, off, once } = require('process');
var eventEmitter = new events.EventEmitter();
eventEmitter.on('say',function(name){
  console.log('Hello',name);
})
eventEmitter.emit('say','Jonh');

// 常用的 EventEmitter 模块的 API
// addListener(event, listener)   为指定事件添加一个监听器到监听器数组的尾部
// on(event, listener)            addListener的别名
// once(event, listener)          为指定事件注册一个单次监听器，只会触发一次，触发后立即解除绑定
// removeListener(event, listener)删除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器
// off(event, listener)           removeListener的别名
// removeAllListeners([event])    移除所有事件的所有监听器，如有指定，则移除指定事件的所有监听器
// emit(event, [arg1], [arg2], [arg3], [...]) 按参数的顺序执行每个监听器 如果事件有注册监听器返回true 否则false
// newListener      该事件在添加新事件监听器的时候触发
// removeListener   从指定监听器数组中删除一个监听器，此操作将会改变处于被删监听器之后的那些监听器的索引

// addListener 和 removeListener、on 和 off 方法对比
// addListener 方法的作用是为指定事件添加一个监听器，其实和 on 方法实现的功能是一样的，
// on 其实就是 addListener 方法的一个别名。二者实现的作用是一样的，
// 同时 removeListener 方法的作用是为移除某个事件的监听器，同样 off 也是 removeListener 的别名。
var events = require('events');
var emitter = new events.EventEmitter();
function hello1(name){
  console.log("hello 1",name);
}
function hello2(name){
  console.log("hello 2",name);
}
emitter.addListener('say',hello1);
emitter.addListener('say',hello2);
emitter.emit('say','John');
//输出hello 1 John
//输出hello 2 John
emitter.removeListener('say',hello1);
emitter.emit('say','John');
//相应的，监听say事件的hello1事件被移除
//只输出hello 2 John

// removeListener 和 removeAllListeners
// removeListener 方法是指移除一个指定事件的某一个监听器，
// 而 removeAllListeners 指的是移除某一个指定事件的全部监听器。
var events = require('events');
var emitter = new events.EventEmitter();
function hello1(name){
  console.log("hello 1",name);
}
function hello2(name){
  console.log("hello 2",name);
}
emitter.addListener('say',hello1);
emitter.addListener('say',hello2);
emitter.removeAllListeners('say');
emitter.emit('say','John');
//removeAllListeners 移除了所有关于 say 事件的监听
//因此没有任何输出

// on 和 once 方法区别
// on 的方法对于某一指定事件添加的监听器可以持续不断地监听相应的事件；
// once 方法添加的监听器，监听一次后，就会被消除。
var events = require('events');
var emitter = new events.EventEmitter();
function hello(name){
  console.log("hello",name);
}
emitter.on('say',hello);
emitter.emit('say','John');
emitter.emit('say','Lily');
emitter.emit('say','Lucy');
//会输出 hello John、hello Lily、hello Lucy，之后还要加也可以继续触发
emitter.once('see',hello);
emitter.emit('see','Tom');
//只会输出一次 hello Tom

// 带你实现一个 EventEmitter
// 实现自定义事件的订阅和发布，从而提升业务开发的便利性。
function EventEmitter() {
  this.__events = {}
}
EventEmitter.VERSION = '1.0.0';
// 判断是否是合法的 listener
function isValidListener(listener) {
  if (typeof listener === 'function') {
    return true;
  } else if (listener && typeof listener === 'object') {
    return isValidListener(listener.listener);
  } else {
    return false;
  }
}
// 顾名思义，判断新增自定义事件是否存在
function indexOf(array, item) {
  var result = -1
  item = typeof item === 'object' ? item.listener : item;
  for (var i = 0, len = array.length; i < len; i++) {
    if (array[i].listener === item) {
      result = i;
      break;
    }
  }
  return result;
}
// on 方法的核心思路就是，当调用订阅一个自定义事件的时候，只要该事件通过校验合法之后，
// 就把该自定义事件 push 到 this.__events 这个对象中存储，等需要出发的时候，
// 则直接从通过获取 __events 中对应事件的 listener 回调函数，而后直接执行该回调方法就能实现想要的效果。
EventEmitter.prototype.on = function(eventName, listener){
  if (!eventName || !listener) return;
  // 判断回调的 listener 是否为函数
  if (!isValidListener(listener)) {
    throw new TypeError('listener must be a function');
  }
  var events = this.__events;
  var listeners = events[eventName] = events[eventName] || [];
  var listenerIsWrapped = typeof listener === 'object';
  // 不重复添加事件，判断是否有一样的
  if (indexOf(listeners, listener) === -1) {
    listeners.push(listenerIsWrapped ? listener : {
      listener: listener,
      once: false
    });
  }
  return this;
};

// 其实就是拿到对应自定义事件进行 apply 执行，在执行过程中对于一开始 once 方法绑定的自定义事件进行特殊的处理，
// 当once 为 true的时候，再触发 off 方法对该自定义事件进行解绑，从而实现自定义事件一次执行的效果。
EventEmitter.prototype.emit = function(eventName, args) {
  // 直接通过内部对象获取对应自定义事件的回调函数
  var listeners = this.__events[eventName];
  if (!listeners) return;
  // 需要考虑多个 listener 的情况
  for (var i = 0; i < listeners.length; i++) {
    var listener = listeners[i];
    if (listener) {
      listener.listener.apply(this, args || []);
      // 给 listener 中 once 为 true 的进行特殊处理
      if (listener.once) {
        this.off(eventName, listener.listener)
      }
    }
  }
  return this;
};

// off其实就是把和listener匹配的事件从对应的 listeners 数组中删除掉
EventEmitter.prototype.off = function(eventName, listener) {
  var listeners = this.__events[eventName];
  if (!listeners) return;
  var index;
  for (var i = 0, len = listeners.length; i < len; i++) {
    if (listeners[i] && listeners[i].listener === listener) {
      index = i;
      break;
    }
  }
  // off 的关键
  if (typeof index !== 'undefined') {
    listeners.splice(index, 1, null)
  }
  return this;
};

// once 方法的本质还是调用 on 方法，只不过传入的参数区分和非一次执行的情况。
// 当再次触发 emit 方法的时候，once 绑定的执行一次之后再进行解绑。
EventEmitter.prototype.once = function(eventName, listener){
  // 直接调用 on 方法，once 参数传入 true，待执行之后进行 once 处理
  return this.on(eventName, {
    listener: listener,
    once: true
  })
};

// allOff其实就是对内部的__events 对象进行清空，清空之后如果再次触发自定义事件，也就无法触发回调函数了。
EventEmitter.prototype.allOff = function(eventName) {
  // 如果该 eventName 存在，则将其对应的 listeners 的数组直接清空
  if (eventName && this.__events[eventName]) {
    this.__events[eventName] = []
  } else {
    this.__events = {}
  }
};

// 总结
// EventEmitter 采用的正是发布-订阅模式。
// 观察者模式和发布-订阅模式有些类似的地方，但是在细节方面还是有一些区别的，你要注意别把这两个模式搞混了。
// 发布-订阅模式其实是观察者模式的一种变形，
// 区别在于：发布-订阅模式在观察者模式的基础上，在目标和观察者之间增加了一个调度中心。

// 在 Vue 框架中不同组件之间的通讯里，有一种解决方案叫 EventBus。和 EventEmitter的思路类似，
// 它的基本用途是将 EventBus 作为组件传递数据的桥梁，所有组件共用相同的事件中心，可以向该中心注册发送事件或接收事件，
// 所有组件都可以收到通知，使用起来非常便利，其核心其实就是发布-订阅模式的落地实现。