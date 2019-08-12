<template>
    <!-- v-model="show"等于 -->
    <!-- v-bind:value="show" -->
    <!-- v-on:input="show = $event" -->
    <van-dialog
    :value="value"
    @input="$emit('input', $event)"
    :showConfirmButton="false"
    closeOnClickOverlay
    >
        <van-cell-group v-show="!isReportShow">
            <van-cell icon="location-o" title="不感兴趣" @click="handle('dislike')"></van-cell>
            <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="isReportShow = true"></van-cell>
            <van-cell icon="location-o" title="拉黑作者" @click="handle('blacklist')"></van-cell>
        </van-cell-group>
        <!-- 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权' -->
        <van-cell-group v-show="isReportShow" :ary="arr">
            <van-cell icon="arrow-left" @click="isReportShow = false" />
            <van-cell v-for="(item, index) in arr" :key="index" icon="location-o" :title="item" @click="handle('report', index)"></van-cell>
        </van-cell-group>

    </van-dialog>
</template>

<script>
// 引入不感兴趣API
import { dislikeArticle, reportArticle } from '@/api/article.js';
import { blackUserList } from '@/api/user.js';
export default {
    // 组件名称
    name: 'complaint',
    // 接收传递的值
    props: ['value', 'currentArticle'],
    // 计算属性
    mounted () {
        this.handleAry();
    },
    // 数据
    data () {
        return {
            // 举报弹窗开关
            isReportShow: false,
            // 举报类型
            ary: '0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权',
            arr: []
        };
    },
    // 自定义方法
    methods: {
        // 处理举报类型
        handleAry () {
            const a = this.ary.split('，');
            a.forEach((item, index, arr) => {
                const num = item.indexOf('-');
                this.arr.push(item.slice(num + 1));
            });
        },
        // 按类投诉方法
        handle (type, reportType) {
            switch (type) {
            // 不感兴趣
            case 'dislike':
                this.dislike();
                break;
                // 拉黑作者
            case 'blacklist':
                this.blackUser();
                break;
                // 反馈文章
            case 'report':
                this.report(reportType);
                break;
            }
        },
        // 不感兴趣方法
        async dislike () {
            try {
                const id = this.currentArticle.art_id;
                console.log(id);
                // 1.发送请求
                await dislikeArticle(id);
                // 2.提示成功还是失败
                this.$toast.success('操作成功');
                // 3.告知home操作成功
                this.$emit('handleok');
                // 3.如果成功隐藏moreaction,移除不感兴趣的文章
            } catch (err) {
                this.$toast.fail('操作失败');
                // 3.告知home操作成功
                // this.$emit('handleok');
                console.log(err);
            }
        },
        // 拉黑作者
        async blackUser () {
            try {
                // 获取id
                const id = this.currentArticle.aut_id;
                // 1.发送请求
                await blackUserList(id);
                // 2.提示成功还是失败
                this.$toast.success('操作成功');
                // 3.告知home操作成功
                this.$emit('handleok');
                // 3.如果成功隐藏moreaction,移除不感兴趣的文章
            } catch (err) {
                this.$toast.fail('操作失败');
                // 3.告知home操作成功
                // this.$emit('blackUserok');
                console.log(err);
            }
        },
        // 反馈文章
        async report (reportType) {
            try {
                // 获取文章id
                const id = this.currentArticle.art_id;
                // 发送请求
                await reportArticle({ id, type: reportType });
                // 提示反馈成功
                this.$toast.success('操作成功');
                // 通知home组件，隐藏弹窗
                this.$emit('input', false);
            } catch (err) {
                this.$toast.fail('操作失败');
            }
        }
    }
};
</script>

<style>
    .van-dialog {
        top: 50%;
    }
</style>
