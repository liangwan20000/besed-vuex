<template>
    <div>
        <!-- 展示内容 -->
        <router-view></router-view>
        <!-- 底部tabbar -->
        <van-tabbar router>
            <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
            <van-tabbar-item icon="search" to="/qa">问答</van-tabbar-item>
            <van-tabbar-item icon="friends-o" to="/video">视频</van-tabbar-item>
            <van-tabbar-item icon="setting-o" to="/my">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
    // 数据
    data () {
        return {
            // 频道列表
            activeTab: 0
        };
    }
};
</script>

<style lang="less" scoped>
    .van-tabbar {
        background-color: #FF4040;
    }
</style>

