import axios from 'axios';
// 引入store
import store from '@/store/index.js';
// 引入大数处理
import JSONbig from 'json-bigint';

const request = axios.create({
    baseURL: 'http://ttapi.research.itcast.cn'
});


// allows changes to the response data to be made before
request.defaults.transformResponse = [function (data) {
    try {
    // data 数据可能不是标准的 JSON 格式字符串，否则会导致 JSONbig.parse(data) 转换失败报错
        return JSONbig.parse(data);
    } catch (err) {
    // 无法转换的数据直接原样返回
        return data;
    }
}];


// 请求拦截器
request.interceptors.request.use((config) => {
    // 设置请求头的Authorization
    const { user } = store.state;
    // 如果用户登录，就有user
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});
// 响应拦截器
request.interceptors.response.use((response) => {
    // 处理返回的数据
    return response.data.data || response.data;
}, (err) => {
    return Promise.reject(err);
});

export default request;
