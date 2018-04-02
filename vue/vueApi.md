全局API

* Vue.extend( options )
参数：
{Object} options
用法：
使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。
data 选项是特例，需要注意 - 在 Vue.extend() 中它必须是函数

* Vue.nextTick( [callback, context] )
参数：
{Function} [callback]
{Object} [context]
用法：
在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。
<pre>
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})

// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  })
</pre>

* Vue.set( target, key, value )
参数：
{Object | Array} target
{string | number} key
{any} value
返回值：设置的值。
用法：
设置对象的属性。如果对象是响应式的，确保属性被创建后也是响应式的，同时触发视图更新。这个方法主要用于避开 Vue 不能检测属性被添加的限制。
// 还可以使用 vm.$set 实例方法，这也是全局 Vue.set 方法的别名。
// 当然，除了Vue.set,我们还可以push/shift等各种方式。

* Vue.delete( target, key )
参数：
{Object | Array} target
{string | number} key/index
仅在 2.2.0+ 版本中支持 Array + index 用法。
用法：
删除对象的属性。如果对象是响应式的，确保删除能触发更新视图。这个方法主要用于避开 Vue 不能检测到属性被删除的限制，但是你应该很少会使用它。

* Vue.directive( id, [definition] )
参数：
{string} id
{Function | Object} [definition]
用法：
注册或获取全局指令。
<pre>
// 注册
Vue.directive('my-directive', {
  bind: function () {},
  inserted: function () {},
  update: function () {},
  componentUpdated: function () {},
  unbind: function () {}
})

// 注册 (指令函数)
Vue.directive('my-directive', function () {
  // 这里将会被 `bind` 和 `update` 调用
})

// getter，返回已注册的指令
var myDirective = Vue.directive('my-directive')
</pre>

* Vue.filter( id, [definition] )
参数：
{string} id
{Function} [definition]
用法：
注册或获取全局过滤器。
<pre>
// 注册
Vue.filter('my-filter', function (value) {
  // 返回处理后的值
})

// getter，返回已注册的过滤器
var myFilter = Vue.filter('my-filter')
</pre>

* Vue.component( id, [definition] )
参数：
{string} id
{Function | Object} [definition]
用法：
注册或获取全局组件。注册还会自动使用给定的id设置组件的名称
<pre>
// 注册组件，传入一个扩展过的构造器
Vue.component('my-component', Vue.extend({ /* ... */ }))

// 注册组件，传入一个选项对象 (自动调用 Vue.extend)
Vue.component('my-component', { /* ... */ })

// 获取注册的组件 (始终返回构造器)
var MyComponent = Vue.component('my-component')
</pre>

* Vue.use( plugin )
参数：
{Object | Function} plugin
用法：
安装 Vue.js 插件。如果插件是一个对象，必须提供 install 方法。如果插件是一个函数，它会被作为 install 方法。install 方法调用时，会将 Vue 作为参数传入。
当 install 方法被同一个插件多次调用，插件将只会被安装一次。

* Vue.mixin( mixin )
参数：
{Object} mixin
用法：
全局注册一个混入，影响注册之后所有创建的每个 Vue 实例。插件作者可以使用混入，向组件注入自定义的行为。不推荐在应用代码中使用。

* Vue.compile( template )
参数：
{string} template
用法：
在 render 函数中编译模板字符串。只在独立构建时有效
<pre>
var res = Vue.compile('<div><span>{{ msg }}</span></div>')

new Vue({
  data: {
    msg: 'hello'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
})
</pre>

* Vue.version
细节：提供字符串形式的 Vue 安装版本号。这对社区的插件和组件来说非常有用，你可以根据不同的版本号采取不同的策略。
用法：
<pre>
var version = Number(Vue.version.split('.')[0])

if (version === 2) {
  // Vue v2.x.x
} else if (version === 1) {
  // Vue v1.x.x
} else {
  // Unsupported versions of Vue
}
</pre>

* vm.$data
类型：Object
详细：Vue 实例观察的数据对象。Vue 实例代理了对其 data 对象属性的访问。

* vm.$props
2.2.0 新增
类型：Object
详细：当前组件接收到的 props 对象。Vue 实例代理了对其 props 对象属性的访问。

* vm.$el
类型：HTMLElement
只读
详细：Vue 实例使用的根 DOM 元素。

* vm.$options
类型：Object
只读
详细：用于当前 Vue 实例的初始化选项。需要在选项中包含自定义属性时会有用处：
<pre>
new Vue({
  customOption: 'foo',
  created: function () {
    console.log(this.$options.customOption) // => 'foo'
  }
})
</pre>

* vm.$parent
类型：Vue instance
只读
详细：父实例，如果当前实例有的话。

* vm.$root
类型：Vue instance
只读
详细：当前组件树的根 Vue 实例。如果当前实例没有父实例，此实例将会是其自己。

* vm.$children
类型：Array<Vue instance>
只读
详细：
当前实例的直接子组件。需要注意 $children 并不保证顺序，也不是响应式的。如果你发现自己正在尝试使用 $children 来进行数据绑定，考虑使用一个数组配合 v-for 来生成子组件，并且使用 Array 作为真正的来源。

* vm.$slots
类型：{ [name: string]: ?Array<VNode> }
只读
详细：
用来访问被插槽分发的内容。每个具名插槽 有其相应的属性 (例如：slot="foo" 中的内容将会在 vm.$slots.foo 中被找到)。default 属性包括了所有没有被包含在具名插槽中的节点。
在使用渲染函数书写一个组件时，访问 vm.$slots 最有帮助。
示例：
<pre>
<'blog-post>
  <'h1 slot="header">
    About Me
  <'/h1>

  <'p>Here's some page content, which will be included in vm.$slots.default, because it's not inside a named slot.<'/p>

  <'p slot="footer">
    Copyright 2016 Evan You
  <'/p>

  <'p>If I have some content down here, it will also be included in vm.$slots.default.<'/p>.
<'/blog-post>
</pre>
<pre>
Vue.component('blog-post', {
  render: function (createElement) {
    var header = this.$slots.header
    var body   = this.$slots.default
    var footer = this.$slots.footer
    return createElement('div', [
      createElement('header', header),
      createElement('main', body),
      createElement('footer', footer)
    ])
  }
})
</pre>

* vm.$scopedSlots
2.1.0 新增
类型：{ [name: string]: props => VNode | Array<VNode> }
只读
详细：
用来访问作用域插槽。对于包括 默认 slot 在内的每一个插槽，该对象都包含一个返回相应 VNode 的函数。
vm.$scopedSlots 在使用渲染函数开发一个组件时特别有用。

* vm.$refs
类型：Object
只读
详细：一个对象，持有已注册过 ref 的所有子组件。

* vm.$isServer
类型：boolean
只读
详细：当前 Vue 实例是否运行于服务器。

* vm.$attrs
类型：{ [key: string]: string }
只读
详细：包含了父作用域中不作为 prop 被识别 (且获取) 的特性绑定 (class 和 style 除外)。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 (class 和 style 除外)，并且可以通过 v-bind="$attrs" 传入内部组件——在创建更高层次的组件时非常有用。

* vm.$listeners
类型：{ [key: string]: Function | Array<Function> }
只读
详细：包含了父作用域中的 (不含 .native 修饰器的) v-on 事件监听器。它可以通过 v-on="$listeners" 传入内部组件——在创建更高层次的组件时非常有用。

* vm.$watch( expOrFn, callback, [options] )
参数：
{string | Function} expOrFn
{Function | Object} callback
{Object} [options]
{boolean} deep
{boolean} immediate
返回值：{Function} unwatch
用法：观察 Vue 实例变化的一个表达式或计算属性函数。回调函数得到的参数为新值和旧值。表达式只接受监督的键路径。对于更复杂的表达式，用一个函数取代。
注意：在变异 (不是替换) 对象或数组时，旧值将与新值相同，因为它们的引用指向同一个对象/数组。Vue 不会保留变异之前值的副本。
示例：
<pre>
// 键路径
vm.$watch('a.b.c', function (newVal, oldVal) {
  // 做点什么
})

// 函数
vm.$watch(
  function () {
    return this.a + this.b
  },
  function (newVal, oldVal) {
    // 做点什么
  }
)
</pre>
vm.$watch 返回一个取消观察函数，用来停止触发回调：
<pre>
var unwatch = vm.$watch('a', cb)
// 之后取消观察
unwatch()
</pre>
选项：deep
为了发现对象内部值的变化，可以在选项参数中指定 deep: true 。注意监听数组的变动不需要这么做。
<pre>
vm.$watch('someObject', callback, {
  deep: true
})
vm.someObject.nestedValue = 123
// callback is fired
</pre>
选项：immediate
在选项参数中指定 immediate: true 将立即以表达式的当前值触发回调：
<pre>
vm.$watch('a', callback, {
  immediate: true
})
// 立即以 `a` 的当前值触发回调
</pre>

* vm.$set( target, key, value )
参数：
{Object | Array} target
{string | number} key
{any} value
返回值：设置的值。
用法：这是全局 Vue.set 的别名。

* vm.$delete( target, key )
参数：
{Object | Array} target
{string | number} key
用法：这是全局 Vue.delete 的别名。

* vm.$on( event, callback )
参数：
{string | Array<string>} event (数组只在 2.2.0+ 中支持)
{Function} callback
用法：监听当前实例上的自定义事件。事件可以由vm.$emit触发。回调函数会接收所有传入事件触发函数的额外参数。
示例：
<pre>
vm.$on('test', function (msg) {
  console.log(msg)
})
vm.$emit('test', 'hi')
// => "hi"
</pre>

* vm.$once( event, callback )
参数：
{string} event
{Function} callback
用法：监听一个自定义事件，但是只触发一次，在第一次触发之后移除监听器。

* vm.$off( [event, callback] )
参数：
{string | Array<string>} event (只在 2.2.2+ 支持数组)
{Function} [callback]
用法：
移除自定义事件监听器。
如果没有提供参数，则移除所有的事件监听器；
如果只提供了事件，则移除该事件所有的监听器；
如果同时提供了事件与回调，则只移除这个回调的监听器。

* vm.$emit( event, […args] )
参数：
{string} event
[...args]
触发当前实例上的事件。附加参数都会传给监听器回调。