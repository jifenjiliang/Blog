/*
 * @Description: 理解浏览器中的 EventLoop
 * @Autor: lijinpeng
 * @Date: 2021-03-10 22:53:40
 * @LastEditors: lijinpeng
 */

// 无论是浏览器端还是服务端，都在使用 Eventloop
// 利用了 JavaScript 语言的单线程和非阻塞的特点

// 浏览器的 Eventloop
// 1.调用堆栈（call stack）负责跟踪所有要执行的代码
// 每当一个函数执行完成时，就会从堆栈中弹出（pop）该执行完成函数；如果有代码需要进去执行的话，就进行 push 操作
// 2.事件队列（event queue）负责将新的 function 发送到队列中进行处理
// 遵循 queue 的数据结构特性，先进先出，在该顺序下发送所有操作以进行执行
// 3.每当调用事件队列（event queue）中的异步函数时，都会将其发送到浏览器 API 事件队列（event queue）
// 4.JavaScript 语言本身是单线程的，而浏览器 API 充当单独的线程
// 它会不断检查调用堆栈是否为空。如果为空，则从事件队列中添加新的函数进入调用栈（call stack）
// 如果不为空，则处理当前函数的调用

// 调用栈、事件队列以及 Eventloop
// 以 setTimeout 为代表的任务被称为宏任务，放到宏任务队列（macrotask queue）中
// 而以 Promise 为代表的任务被称为微任务，放到微任务队列（microtask queue）中
// macrotasks(宏任务):
// script(整体代码),setTimeout,setInterval,setImmediate,I/O,UI rendering,event listner
// microtasks(微任务):
// process.nextTick, Promises, Object.observe, MutationObserver
// JavaScript 引擎首先从宏任务队列（macrotask queue）中取出第一个任务；
// 执行完毕后，再将微任务（microtask queue）中的所有任务取出，按照顺序分别全部执行
//（这里包括不仅指开始执行时队列里的微任务），如果在这一步过程中产生新的微任务，也需要执行；
// 然后再从宏任务队列中取下一个，执行完毕后，再次将 microtask queue 中的全部取出，循环往复，
// 直到两个 queue 中的任务都取完。

// 一次 Eventloop 循环会处理一个宏任务和所有这次循环中产生的微任务

// Node.js 的 Eventloop
// 当 Node.js 开始启动时，会初始化一个 Eventloop，处理输入的代码脚本，
// 这些脚本会进行 API 异步调用，process.nextTick() 方法会开始处理事件循环

// EventLoop 对渲染的影响
// requestIdlecallback 和 requestAnimationFrame
// 浏览器作为一个复杂的应用是多线程工作的，除了运行 JS 的线程外，还有渲染线程、定时器触发线程、HTTP 请求线程，等等
// JS 线程可以读取并且修改 DOM，而渲染线程也需要读取 DOM，这是一个典型的多线程竞争临界资源的问题。
// 所以浏览器就把这两个线程设计成互斥的，即同时只能有一个线程在执行。
// 把它看成是一个高级版的 setInterval
// 它们都是在一段时间后执行回调，但是前者的间隔时间是由浏览器自己不断调整的，而后者只能由用户指定。
// 这样的特性也决定了 requestAnimationFrame 更适合用来做针对每一帧来修改的动画效果
// ，在执行 animation callback 时也有可能产生微任务（比如 promise 的 callback），会放到 animation queue
// 处理完后再执行。所以微任务并不是像之前说的那样在每一轮 Eventloop 后处理，而是在 JS 的函数调用栈清空后处理
// 当宏任务队列中没有任务可以处理时，浏览器可能存在“空闲状态”。
// 这段空闲时间可以被 requestIdlecallback 利用起来执行一些优先级不高、不必立即执行的任务
// 当然为了防止浏览器一直处于繁忙状态，导致 requestIdlecallback 可能永远无法执行回调，
// 它还提供了一个额外的 timeout 参数，为这个任务设置一个截止时间。浏览器就可以根据这个截止时间规划这个任务的执行。