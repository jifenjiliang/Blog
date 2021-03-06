* Vue.js 是什么

Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

* Vue实现数据的双向绑定(mvvm)

把一个普通 JavaScript 对象传给 Vue 实例的 data 选项，Vue 将遍历此对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter。Object.defineProperty 是仅 ES5 支持，且无法 shim 的特性，这也就是为什么 Vue 不支持 IE8 以及更低版本浏览器的原因。访问器属性不包含数据值，他们包含一对getter函数和setter函数（这两个函数不是必须的）。在读取访问器属性时，会调用getter函数，这个函数负责返回有效的值；在写入访问器属性是，会调用setter函数并传入新值，这个函数负责决定如何处理数据。访问器属性不能直接定义，必须是用Object.defineProperty()来定义。所以，当对象下的访问器属性值发生了改变之后（vue会将属性都转化为访问器属性，之前提到了）， 那么就会调用set函数，这时vue就可以通过这个set函数来追踪变化，调用相关函数来实现view视图的更新。每个组件实例都有相应的 watcher 实例对象，它会在组件渲染的过程中把属性记录为依赖，之后当依赖项的 setter 被调用时，会通知 watcher 重新计算，从而致使它关联的组件得以更新。即在渲染的过程中就会调用对象属性的getter函数，然后getter函数通知wather对象将之声明为依赖，依赖之后，如果对象属性发生了变化，那么就会调用settter函数来通知watcher，watcher就会在重新渲染组件，以此来完成更新。