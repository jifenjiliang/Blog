/*
 * @Description: 从原型到原型链
 * @Autor: lijinpeng
 * @Date: 2021-03-03 13:36:36
 * @LastEditors: lijinpeng
 */
// 构造函数 使用 new 创建了一个实例对象 person
function Person() {}
var person = new Person()
person.name = 'Kevin'
console.log(person.name)

// 每个函数都有一个 prototype 属性
function Person() {}
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Person.prototype.name = 'Kevin'
var person1 = new Person()
var person2 = new Person()
console.log(person1.name)
console.log(person2.name)
// 那这个函数的 prototype 属性到底指向的是什么呢？是这个函数的原型吗？
// 其实，函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的实例的原型，
// 也就是这个例子中的 person1 和 person2 的原型。
// 什么是原型: 每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。

function Person() {}
var person = new Person();
person.constructor