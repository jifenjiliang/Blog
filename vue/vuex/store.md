# 状态树

支持两种使用 store 的方式，也可以择一使用：
- `普通方式`： `store/index.js` 返回一个 `Vuex.Store` 实例
- `模块方式`： `store` 目录下的每个 `.js` 文件会被转换成为`状态树指定命名的子模块` （index 是根模块）   

---

# 普通方式
## 部署  
添加 `store/index.js` 文件，并对外暴露一个 `Vuex.Store` 实例：
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    counter: 0
  },
  mutations: {
    increment (state) {
      state.counter++
    }
  }
})

export default store
```
## 使用
在组件里面通过 `this.$store` 来使用状态树:
```html
<template>
  <button @click="$store.commit('increment')">{{ $store.state.counter }}</button>
</template>
```
---

# 模块方式
## 部署
状态树模块化的方式:`store/index.js` 不需要返回 `Vuex.Store` 实例，而应该直接将 `state`、`mutations` 和 `actions` 暴露出来：
```js
export const state = {
  counter: 0
}

export const mutations = {
  increment (state) {
    state.counter++
  }
}
```
其他的模块文件也需要采用类似的方式，如 `store/todos.js` 文件:
```js
export const state = {
  list: []
}

export const mutations = {
  add (state, text) {
    state.list.push({
      text: text,
      done: false
    })
  },
  delete (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  toggle (state, todo) {
    todo.done = !todo.done
  }
}
```
最终处理的状态树如下：
```js
new Vuex.Store({
  state: { counter: 0 },
  mutations: {
    increment (state) {
      state.counter++
    }
  },
  modules: {
    todos: {
      state: {
        list: []
      },
      mutations: {
        add (state, { text }) {
          state.list.push({
            text,
            done: false
          })
        },
        delete (state, { todo }) {
          state.list.splice(state.list.indexOf(todo), 1)
        },
        toggle (state, { todo }) {
          todo.done = !todo.done
        }
      }
    }
  }
})
```
在页面组件 `pages/todos.vue`， 可以像下面这样使用 `todos` 模块：
```html
<template>
  <ul>
    <li v-for="todo in todos">
      <input type="checkbox" :checked="todo.done" @change="toggle(todo)">
      <span :class="{ done: todo.done }">{{ todo.text }}</span>
    </li>
    <li><input placeholder="What needs to be done?" @keyup.enter="addTodo"></li>
  </ul>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    todos () { return this.$store.state.todos.list }
  },
  methods: {
    addTodo (e) {
      this.$store.commit('todos/add', e.target.value)
      e.target.value = ''
    },
    ...mapMutations({
      toggle: 'todos/toggle'
    })
  }
}
</script>

<style>
.done {
  text-decoration: line-through;
}
</style>
```
