import Vue from 'vue';
import Vuex from 'vuex';
// 引入登录模块
import login from '@/store/login/index.js';

// 挂载
Vue.use(Vuex);

const store = new Vuex.Store({
    // 模块
    modules: {
        // 添加登录模块
        login
    }
});

export default store;
