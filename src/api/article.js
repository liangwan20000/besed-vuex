// 引入axios实例
import request from '@/utils/request.js';

// 获取文章
export const getArticles = ({
    channelId,
    timestamp = Date.now(),
    withTop = 1
}) => {
    return request({
        method: 'GET',
        url: '/app/v1_1/articles',
        params: {
            channel_id: channelId,
            timestamp: timestamp,
            with_top: withTop
        }
    });
};

// 对文章不喜欢
export const dislikeArticle = (id) => {
    return request.post('/app/v1_0/article/dislikes', {
        target: id
    });
};

// 反馈
export const reportArticle = ({
    id,
    type
}) => {
    return request.post('/app/v1_0/article/reports', {
        type: type,
        target: id
    });
};
