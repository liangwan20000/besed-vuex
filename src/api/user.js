import request from '@/utils/request.js';
// 登录
export const login = ({ mobile, code }) => {
    return request.post('/app/v1_0/authorizations', {
        mobile, code
    });
};
// 拉黑作者
export const blackUserList = (id) => {
    return request.post('/app/v1_0/user/blacklists', {
        target: id
    });
};
