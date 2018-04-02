import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

// https://webpack.js.org/guides/dependency-management/#require-context
// require.context() 方法来创建自己的（模块）上下文，这个方法有 3 个参数：要搜索的文件夹目录，是否还应该搜索它的子目录，以及一个匹配文件的正则表达式。
let files = require.context('../store', true, /^\.\/.*\.js$/); // 获取到 /src/store 下的所有js文件
let filenames = files.keys();

let store;
let storeData = {};

// 如果src/store下有index.js文件，则直接部署为一个store
if (filenames.indexOf('./index.js') !== -1) {
  let mainModule = getModule('./index.js');
  if (mainModule.commit) {
    store = mainModule;
  } else {
    storeData = mainModule;
  }
}

// 模块化部署store
if (store == null) {
  storeData.modules = storeData.modules || {};
  for (let filename of filenames) {
    // 以文件路径+文件名称为模块名称
    console.log(filename)
    let name = filename.replace(/^\.\//, '').replace(/\.js$/, '');
    console.log(name)
    if (name === 'index') continue;

    let namePath = name.split(/\//); // arr
    let module = getModuleNamespace(storeData, namePath);

    name = namePath.pop(); // 从后向前开始取值
    module[name] = getModule(filename);
    module[name].namespaced = true;
  }
  store = new Vuex.Store(storeData);
}

/**
 * 根据文件获取模块内容
 * 
 * @param {any} filename 
 * @returns 
 */
function getModule(filename) {
  let file = files(filename); // 文件IO
  return file.default ?
    file.default :
    file
}

/**
 * 递归初始化模块
 * 
 * @param {any} storeData 
 * @param {any} namePath 
 * @returns 
 */
function getModuleNamespace(storeData, namePath) {
  if (namePath.length === 1) {
    return storeData.modules;
  }
  let namespace = namePath.shift();
  storeData.modules[namespace] = storeData.modules[namespace] || {};
  storeData.modules[namespace].namespaced = true;
  storeData.modules[namespace].modules = storeData.modules[namespace].modules || {};
  return getModuleNamespace(storeData.modules[namespace], namePath);
}

export default store;
