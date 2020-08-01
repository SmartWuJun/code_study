/*
 * @Date: 2020-08-01 19:31:20
 * @LastEditors: wj
 * @Description: 
 */
import Vue from "vue";
import MVueRouter from "./my-vue-router";
import Home from "../views/Home.vue";

Vue.use(MVueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new MVueRouter({
  routes
});

export default router;
