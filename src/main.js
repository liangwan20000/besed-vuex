import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
// 引入vuex
import store from './store/index.js';
// 引入vue-function-api
import { plugin } from 'vue-function-api';
// 引入布局组件
import Vant, { Lazyload, Dialog, Popup, Search, Grid, GridItem } from 'vant';
// 引入布局组件样式
import 'vant/lib/index.css';
// 引入rem适配组件
import 'amfe-flexible';
// 引入全局样式
import './styles/index.css';
// 引入验证组件
import VeeValidate, { Validator } from 'vee-validate';
// 引入验证提示语言
import zhCN from 'vee-validate/dist/locale/zh_CN';
// 默认是input事件触发，可以改成 blur 事件触发
Vue.use(VeeValidate, {
    events: 'blur'
});
Validator.localize('zh-cn', zhCN);

// 挂载plugin
Vue.use(plugin);
// 使用前挂载
Vue.use(Vant);
// 挂载图片懒加载
Vue.use(Lazyload);
// 挂载弹窗
Vue.use(Dialog);
// 挂载频道弹窗
Vue.use(Popup);
// 挂载头部输入框
Vue.use(Search);
// 挂载频道宫格
Vue.use(Grid).use(GridItem);

// 给vue实例添加延时器
Vue.prototype.$sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => { resolve(); }, time);
    });
};

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
