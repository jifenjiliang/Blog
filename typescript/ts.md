# 字符串新特性
1、字符串特性
多行字符串用【`】，1左边那个键。
`aaaaa
bbb
ccc`
2、字符串模版
直接用${变量名} ，需要用多行字符串申明中使用。
var name = "hhhh";
`aaaaaa ${name}`
3、自动拆分字符串
let myName = 'vivian'
let getAge = ()=> 18
console.log(`hello${myName}`)
console.log(`hello${getAge()}`)
function test(template,name,age) {
console.log(template);
console.log(name)
console.log(age)
}
test `hello my name is ${myName}, i'm ${getAge()}`

# 参数新特性-参数类型
在参数名称后面使用冒号来指定参数的类型
var myname:string="zhai liang";
1、减少类型错误的问题
2、类型推断：根据第一次类型指定参数的类型
3、除了any就可以任意赋值
4、参数主要类型：any、string、 number、boolean
5、void仅能在函数后面使用
function test():void{}
6、自定义类型

# 参数新特性-参数默认值
在参数声明后面用等号来指定参数的默认值
function test(a:string, b:string, c:string="jojo"){}
test("xxx","yyy");
函数里的参数默认值最好声明在最右边，这个可以参考其他语言的做法

# 参数新特性-可选参数
可选参数：function；text（a: string，b?: number）{}（在参数后加个问号？）
可选参数和默认参数要在必选参数后面

# 函数新特性
# Rest and Spread操作符：用来声明任意数量的函数的参数
function fun1(...args){
  args.forEach(function (arg){
    console.log(arg);
  })
}
fun1(1,2,3)

# generator函数：控制函数的执行过程，手工暂停和恢复代码执行
yield  每执行一次停在这个关键字的位置

# destructuring析构表达式：通过表达式将对象或数组拆解成任意数量的变量
function getstock() {
    return {
        code: 'IBM',
        price: {
            price1: 200,
            price2: 400
        },
        aaa: 'xixi',
        bbb: 'hahah'
    }
}
let { code: codex, price: {price2} } = getstock();
console.log(codex);
console.log(price2)

var array1 = [1, 2, 3, 4];
function dosomething([number1, number2, ...others]) {
    console.log(number1);
    console.log(number2);
    console.log(others);
}
dosomething(array1)

# 循环新特性
JS中提供了forEach(function f)方法用于遍历数组中的元素.
typescript中额外的提供了for in以及for of两种遍历方法.

let myArray = [1,2,3,4,5]
myArray.forEach(value => console.log(value))
for (let v in myArray) {
    console.log(v)
    console.log(myArray[v])
}
for (let n of myArray) {
    if (n > 2) break;
    console.log(n)
}

# 面向对象的特性--类（class）：同java
访问控制：public private protected
public 类内部外部都可以访问
private 只能类内部访问
protected 类内部和其子类内部可以访问
constructor(){}//外部不能访问构造函数方法，在new的时候被调用而且只能被调用一次,这时实例化一个人的时候必须指定name的值，而且注意在声明参数的时候必须指定访问控制符（public private protected）
类的继承extends  super调用父类的属性和方法

class Person {
    constructor(public name: string) {
        this.name = name
        console.log('hhhh')
    }
    eat() {
        console.log(`${this.name}`)
    }
}

var p1 = new Person('ljp');
p1.eat();

var p2 = new Person('lx');
p2.eat();

class Employee extends Person {
    constructor(name: string, code: string){
        super(name)
        this.code = code;
        console.log('xixixi')
    }
    code: string;
    work() {
        super.eat();
        this.dowork();
    }
    dowork() {
        console.log('im working')
    }
}

let e1 = new Employee('qkc', '22222222')
e1.work()

# 面向对象的特性--泛型：参数化的类型，一般用来限制集合的内容
let workers: Array<Person> = []
workers[0] = new Person('ljp')
workers[1] = new Employee('lx', '111111')

# 面向对象的特性--接口
用来建立某种代码约定，使得其他开发者在调用某个方法或
创建新的类时必须遵循接口所定义的代码约定。
interface 声明接口
implements 实现接口

interface IPerson {
  name: string,
  age: number
}

class Person {
  constructor(public config: IPerson) {}
}

var p1 = new Person({
  name: 'ljp',
  age: 12
})

interface Animal {
    eat()
}

class tiger implements Animal {
    eat() {
        console.log('im a tiger!')
    }
}

class sheep implements Animal {
    eat() {
        console.log('im a sheep')
    }
}

# 面向对象的特性--模块(Module)
模块可以帮助开发者将代码分割为可重用的单元。
开发者可以自己决定将模块中的哪些资源（类、方法、变量）暴露出来
供外部使用，哪些资源只在模块内使用。
关键字 export 和 import

# 注解（annotation）
注解为程序的元素（类、方法、变量）加上更直观更明了的说明，
这些说明信息与程序的业务逻辑无关，而是供指定的工具或框架使用的。
@Component({})
@Directive({})

# 类型定义文件（*.d.ts）
类型定义文件用来帮助开发者在TypeScript中使用已有的JavaScript的工具包，如JQuery
下载JQuery类型定义文件：https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/jquery/jquery.d.ts
1.类型定义文件是为了能在TS上使用JS代码库、框架而引入的以.d.ts结尾的文件。
2.类型定义文件是别人配好的：https://github.com/DefinitelyTyped/DefinitelyTyped
比如使用jq ：https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/jquery/index.d.ts
3.可以使用专门用来安装类型定义文件的工具：https://github.com/typings/typings