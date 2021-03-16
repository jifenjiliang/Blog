/*
 * @Description: 继承方式
 * @Autor: lijinpeng
 * @Date: 2021-03-04 12:23:07
 * @LastEditors: lijinpeng
 */

// 继承的概念
// 继承是面向对象的，使用这种方式我们可以更好地复用以前的开发代码，缩短开发的周期、提升开发效率。
// 继承可以使得子类别具有父类的各种方法和属性并且可以重写或覆盖某些属性和方法

// JS 实现继承的几种方式
// 第一种：原型链继承
// 涉及构造函数、原型和实例，每一个构造函数都有一个原型对象，原型对象又包含一个指向构造函数的指针，而实例则包含一个原型对象的指针。
function Parent1() {
  this.name = 'parent1';
  this.play = [1, 2, 3]
}
function Child1() {
  this.type = 'child2';
}
Child1.prototype = new Parent1();
let s1 = new Child1()
let s2 = new Child1()
// 因为两个实例使用的是同一个原型对象。它们的内存空间是共享的，当一个发生变化的时候，另外一个也随之进行了变化，这就是使用原型链继承方式的一个缺点。

// 第二种：构造函数继承（借助 call）
function Parent1(){
  this.name = 'parent1';
}

Parent1.prototype.getName = function () {
  return this.name;
}

function Child1(){
  Parent1.call(this);
  this.type = 'child1'
}

let child = new Child1();
console.log(child);  // 没问题
console.log(child.getName());  // 会报错
// 构造函数实现继承的优缺点，它使父类的引用属性不会被共享，优化了第一种继承方式的弊端；
// 但是随之而来的缺点也比较明显——只能继承父类的实例属性和方法，不能继承原型属性或者方法。

// 第三种：组合继承（前两种组合）
function Parent3 () {
  this.name = 'parent3';
  this.play = [1, 2, 3];
}

Parent3.prototype.getName = function () {
  return this.name;
}
function Child3() {
  // 第二次调用 Parent3()
  Parent3.call(this);
  this.type = 'child3';
}
// 第一次调用 Parent3()
Child3.prototype = new Parent3();
// 手动挂上构造器，指向自己的构造函数
Child3.prototype.constructor = Child3;
var s3 = new Child3();
var s4 = new Child3();
s3.play.push(4);
console.log(s3.play, s4.play);  // 不互相影响
console.log(s3.getName()); // 正常输出'parent3'
console.log(s4.getName()); // 正常输出'parent3'

// 第四种：原型式继承
// ES5 里面的 Object.create 方法，这个方法接收两个参数：一是用作新对象原型的对象、二是为新对象定义额外属性的对象（可选参数）。
let parent4 = {
  name: "parent4",
  friends: ["p1", "p2", "p3"],
  getName: function() {
    return this.name;
  }
};

let person4 = Object.create(parent4);
person4.name = "tom";
person4.friends.push("jerry");

let person5 = Object.create(parent4);
person5.friends.push("lucy");

console.log(person4.name); // tom
console.log(person4.name === person4.getName()); // true
console.log(person5.name);  // parent4
console.log(person4.friends); // ["p1", "p2", "p3", "jerry", "lucy"]
console.log(person5.friends); // ["p1", "p2", "p3", "jerry", "lucy"]
// 那么关于这种继承方式的缺点也很明显，多个实例的引用类型属性指向相同的内存，存在篡改的可能。

// 第五种：寄生式继承
// 使用原型式继承可以获得一份目标对象的浅拷贝，然后利用这个浅拷贝的能力再进行增强，添加一些方法，这样的继承方式就叫作寄生式继承。
let parent5 = {
  name: "parent5",
  friends: ["p1", "p2", "p3"],
  getName: function() {
    return this.name;
  }
};

function clone(original) {
  let clone = Object.create(original);
  clone.getFriends = function() {
    return this.friends;
  };
  return clone;
}

let person5 = clone(parent5);

console.log(person5.getName());
console.log(person5.getFriends());

// 第六种：寄生组合式继承
function clone (parent, child) {
  // 这里改用 Object.create 就可以减少组合继承中多进行一次构造的过程
  child.prototype = Object.create(parent.prototype)
  child.prototype.constructor = child
}

function Parent6() {
  this.name = 'parent6';
  this.play = [1, 2, 3]
}

Parent6.prototype.getName = function() {
  return this.name
}

function Child6() {
  Parent6.call(this)
  this.friends = 'child5'
}

clone(Parent6, Child6)
Child6.prototype.getFriends = function() {
  return this.friends
}

let person6 = new Child6()
console.log(person6);
console.log(person6.getName());
console.log(person6.getFriends());

// 寄生组合式继承方式，基本可以解决前几种继承方式的缺点，较好地实现了继承想要的结果，同时也减少了构造次数，减少了性能的开销。

// ES6 还提供了继承的关键字 extends，我们再看下 extends 的底层实现继承的逻辑。
class Person {
  constructor(name) {
    this.name = name
  }
  // 原型方法
  // 即 Person.prototype.getName = function() { }
  // 下面可以简写为 getName() {...}
  getName = function () {
    console.log('Person:', this.name)
  }
}
class Gamer extends Person {
  constructor(name, age) {
    // 子类中存在构造函数，则需要在使用“this”之前首先调用 super()。
    super(name)
    this.age = age
  }
}
const asuna = new Gamer('Asuna', 20)
asuna.getName() // 成功访问到父类的方法