// 引入请求API
import { login } from '@/api/user.js';
// 引入存储模块
import { setUser } from '@/utils/local.js';

export default {
    // 开启命名空间
    namespaced: true,
    // 各项参数
    state: {
        // 提交信息
        user: {
            mobile: '13930333639',
            code: '246810'
        }
    },
    // 同步操作各项参数
    mutations: {
        Token (state, token) {
            // 保存登录状态
            setUser(token);
        }
    },
    // 异步操作各项参数
    actions: {
        // 请求登录状态 context代表store
        async request (context) {
            // 获取登录状态
            let token = await login(context.state.user).catch((err) => { return this.$toast.fail('登录失败' + err); });
            // 判断
            if (!token) { return { code: 401, message: '获取失败' }; }
            // 提交mutations里的Token方法
            context.commit('Token', token);
            // 成功  返回需要的参数
            return { code: 200, message: '获取成功' };
        }
    },
    // 计算属性
    getters: {

    }
};
