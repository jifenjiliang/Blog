import Vue from "vue";
import Router from "vue-router";
import layout from "@/components/layout/layout";
// 版块有点多,版块独立路由管理,里面都是懒加载引入
import customerManage from "./customerManage"; // 客户管理
import account from "./account"; //登录
import adManage from "./adManage"; // 广告管理
import dataStat from "./dataStat"; // 数据统计
import logger from "./logger"; // 日志
import manager from "./manager"; // 管理者
import putonManage from "./putonManage"; // 投放管理
import error from "./error"; // 服务端错误
import { Message } from "element-ui";

Vue.use(Router);

// 请跳过这一段,看下面的
const router = new Router({
  hashbang: false,
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/adver",
      component: layout,
      children: [
        ...customerManage,
        ...adManage,
        ...dataStat,
        ...putonManage,
        ...manager,
        ...logger
      ]
    },
    ...account,
    ...error
  ]
});

// 路由拦截
// 差点忘了说明,不是所有版块都需要鉴权的
// 所以需要鉴权,我都会在路由meta添加添加一个字段requireLogin,设置为true的时候
// 这货就必须走鉴权,像登录页这些不要,是可以直接访问的!!!
router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireLogin)) {
    // 判断是否需要登录权限
    if (window.localStorage.getItem("loginUserBaseInfo")) {
      // 判断是否登录
      let lifeTime =
        JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime *
        1000;
      let nowTime = (new Date()).getTime(); // 当前时间的时间戳
      if (nowTime < lifeTime) {
        next();
      } else {
        Message({
          showClose: true,
          message: "登录状态信息过期,请重新登录",
          type: "error"
        });
        next({
          path: "/login"
        });
      }
    } else {
      // 没登录则跳转到登录界面
      next({
        path: "/login"
      });
    }
  } else {
    next();
  }
});