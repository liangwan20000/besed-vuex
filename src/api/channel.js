// 引入请求模块
import request from '@/utils/request.js';

// 封装请求方法
/**
 * 获取频道列表
 * 未登录：获取默认的列表
 * 已登录：请求头携带Authorization
 */
export const getChannels = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/channels'
    });
};
