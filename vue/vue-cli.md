命令行工具 (CLI)
Vue 提供一个官方命令行工具，可用于快速搭建大型单页应用。该工具为现代化的前端开发工作流提供了开箱即用的构建配置。只需几分钟即可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目：

# 全局安装 vue-cli
$ npm install --global vue-cli

# 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project

# 安装依赖，走你
$ cd my-project

$ npm run dev


# 安装各种插件
$ npm i element-ui -s
$ npm i axios -s 
$ npm i vuex -s
$ npm i less less-loader --save-dev  