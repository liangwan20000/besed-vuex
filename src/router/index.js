import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        // 默认显示登录页
        {
            path: '/',
            redirect: '/login'
        },
        // 登录页
        {
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
        },
        // tabber外部框
        {
            path: '/layout',
            name: 'layout',
            component: () => import(/* webpackChunkName: "layout" */ '@/views/layout-tabbar/index.vue'),
            redirect: '/home',
            children: [
                // 首页
                {
                    path: '/home',
                    name: 'home',
                    component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
                }
            ]
        }
    ]
});
