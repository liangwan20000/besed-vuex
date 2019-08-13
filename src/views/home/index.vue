<template>
    <div>
        <!-- 头部 -->
        <div class="home-top">
            <!-- <van-nav-bar fixed left-text="返回"> -->
                <van-search placeholder="请输入搜索关键词" v-model="value" background="#FF4040"/>
            <!-- </van-nav-bar> -->
        </div>
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <!-- 频道 -->
            <van-tabs v-model="activeTab">
                <div slot="nav-right" class="bigbox">
                    <van-icon class="wap-nav" name="wap-nav"  @click="showChannel = true"></van-icon>
                </div>

                <van-tab v-for="item in channels"
                :title="item.name"
                :key="item.id">
                    <!-- 文章列表 -->
                    <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="onLoad"
                    >
                        <!-- 展示每一篇文章 -->
                        <van-cell
                            v-for="item in item.articles"
                            :key="item.aut_id.toString()"
                            :title="item.title"
                        >
                            <!-- 文章里的内容 -->
                            <div slot="label">
                                <template v-if="item.cover.type">
                                    <van-grid :border="false" :column-num="3">
                                        <van-grid-item v-for="(item, index) in item.cover.images" :key="index">
                                            <van-image lazy-load :src="item"/>
                                        </van-grid-item>
                                    </van-grid>
                                </template>
                                <p>
                                    <span>{{ item.aut_name }}</span>&nbsp;
                                    <span>{{ item.comm_count }}条评论</span>&nbsp;
                                    <span>{{ item.pubdate | fltime}}</span>
                                    <van-icon name="close" class="xx" @click="handleArticleShow(item)"/>
                                </p>
                            </div>
                        </van-cell>
                    </van-list>
                </van-tab>
            </van-tabs>
        </van-pull-refresh>
        <!-- 弹出投诉框 -->
         <!-- :value="showAction" @input="showAction" -->
        <complaint
        @handleok="handleok"
        :currentArticle="currentArticle"
        v-model="showAction">
        </complaint>
        <!-- 弹出频道列表 -->
        <homeChannel v-model="showChannel"></homeChannel>
    </div>
</template>

<script>
// 引入请求频道的方法
import { getChannels } from '../../api/channel.js';
// 加载文章列表方法
import { getArticles } from '../../api/article.js';
// 引入全局过滤器
import '@/filters/index.js';
// 引入投诉模块
import complaint from './components/Complaint.vue';
// 引入管理频道
import homeChannel from './components/HomeChannel.vue';
export default {
    name: 'Home',
    // 模板
    components: {
        complaint,
        homeChannel
    },
    // 数据
    data () {
        return {
            // 输入框内容
            value: '',
            // 频道弹窗开关
            showChannel: false,
            // 保存当前要投诉的对象
            currentArticle: {},
            // 控制投诉弹窗显示隐藏
            showAction: false,
            // 当前频道
            activeTab: 0,
            // 控制发起异步请求
            loading: false,
            // 结束加载
            finished: false,
            // 文章列表加载状态
            isLoading: false,
            // 展示的文章列表
            list: [],
            // 频道列表
            channels: [],
            // 时间戳
            timestamp: Date.now()
        };
    },
    // 自定义方法
    methods: {
        // 控制频道弹窗
        // showPopup () {
        // this.show = true;
        // },
        // 获取频道列表
        async loadChannels () {
            try {
                // 从store中获取登录信息
                const user = this.$store.state.user;
                // 判断是否登录
                if (user) {
                    const data = await getChannels();
                    // 获取频道列表
                    this.channels = data.channels;
                } else {
                    // 没有登录，从本地获取数据，如果没有再重新请求，请求到数据后存储到本地
                    this.channels = JSON.parse(window.localStorage.getItem('channels')) || [];
                    if (this.channels.length === 0) {
                        const data = await getChannels();
                        this.channels = data.channels;
                        window.localStorage.setItem('channels', JSON.stringify(this.channels));
                    }
                };
                // 给每一个频道添加articles属性
                this.channels.forEach((item) => {
                    // item.articles = [];
                    // 动态增加的成员想要成为响应式的数据，需要使用$set
                    this.$set(item, 'articles', []);
                    // 给每个频道一个独立的时间戳
                    item.timestamp = Date.now();
                });
            } catch (err) {
                this.$stoast.fail('获取频道数据失败');
                console.log(err);
            }
            this.channels.push('');
        },
        // 加载文章列表
        async onLoad () {
            // 加入延时器
            await this.$sleep(1000);
            // 获取当前频道
            const activeChannel = this.channels[this.activeTab];
            // 发送请求
            const data = await getArticles({
                // 携带ID
                channelId: activeChannel.id,
                // 携带最新时间
                timestamp: activeChannel.timestamp
            });
            // 把文章列表存储到channel的articles属性中
            activeChannel.articles.push(...data.results);
            // 保存时间戳
            this.timestamp = data.pre_timestamp;
            // 判断是否还有数据
            if (data.results.length === 0) {
                // 显示提示
                this.finished = true;
            };
            // 加载状态结束
            this.loading = false;
        },
        // 下拉刷新
        onRefresh () {
            setTimeout(() => {
                this.$toast('刷新成功');
                this.isLoading = false;
                this.count++;
            }, 1000);
        },
        // 投诉文章
        handleArticleShow (item) {
            this.showAction = true;
            this.currentArticle = item;
        },
        // 操作成功执行移除文章
        handleok (x) {
            // 如果成功，隐藏弹窗
            this.showAction = false;
            // 获取当前频道的文章
            const articles = this.channels[this.activeTab].articles;
            // 索引
            const index = articles.findIndex((item) => {
                // findIndex返回true时候的那条数据的索引
                return item.art_id === this.currentArticle.art_id;
            });
            // 移除当前文章
            articles.splice(index, 1);
        }
    },
    // 创建实例前
    mounted () {
        // 获取频道列表
        this.loadChannels();
    }
};
</script>

<style lang="less" scoped>
    .home-top {
        height: 107px;
        overflow: hidden;
    }
    // 整个文章页
    .van-tabs {
        margin-top: 92px;
        margin-bottom: 100px;
    }
    // 频道列表
    .van-tabs /deep/ .van-tabs__wrap {
        position: fixed;
        width: 99%;
        transform: translateX(-50%);
        margin-left: 50%;
        margin-right: 1px;
        margin-top: -96px;
        z-index: 9;
    }
    // 评论右侧投诉按钮
    .xx {
        float: right;
        font-size: 30px;
    }
    // 弹窗
    .van-dialog {
        z-index: 999;
    }
    // 顶部搜索框
    .home-top /deep/ .van-search {
        position: fixed;
        width: 100%;
        transform: translateX(-50%);
        margin-left: 50%;
        z-index: 99;
        background-color: #1989fa;
    }
    // 频道弹窗开关
    .wap-nav {
        position: fixed;
        right: 0;
        height: 88px;
        line-height: 88px;
        background-color: #fff;
        width: 80px;
        font-size: 30px;
        text-align: center;
        border-left: 1px solid #ccc;
    }
</style>

