import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/Login";
import Administrator from "../components/Administrator";

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', component: Login},
    {path: '/administrator', component: Administrator}
  ]
})
