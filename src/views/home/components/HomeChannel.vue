<template>
    <!-- 弹出频道列表 -->
    <van-popup
    :value="value"
    @input="$emit('input', $event)"
    position="bottom"
    :style="{ height: '90%', width: '100%' }">
        <!-- 已有频道列表 -->
        <div class="channel">
            <div class="channel-head">
                <!-- 左侧提示 -->
                <div>
                    <span class="title">我的频道</span>
                    <span class="desc">点击进入频道</span>
                </div>
                <!-- 按钮 -->
                <div>
                    <van-button
                        v-show="!showClose"
                        @click="showClose=true"
                        type="danger"
                        plain
                        size="mini"
                    >
                        编辑
                    </van-button>
                    <div v-show="showClose">
                        <van-button size="mini" plain type="danger" class="title">全部删除</van-button>&nbsp;
                        <van-button size="mini" plain type="danger" class="title" @click="showClose = false">完成</van-button>
                    </div>
                </div>
            </div>
            <!-- 展示已有频道 -->
            <van-grid class="channel-content" :gutter="10" clickable>
                <van-grid-item
                    v-for="value in 6"
                    :key="value"
                    text="文字">
                    <span class="text">文字</span>
                    <van-icon class="close-icon" name="close" v-show="showClose"/>
                </van-grid-item>
            </van-grid>
        </div>

        <!-- 所有频道列表 -->
        <div class="channel">
            <!-- 所有频道标题 -->
            <div class="channel-head">
                <div>
                    <span class="title">频道推荐</span>
                    <span class="desc">点击添加频道</span>
                </div>
            </div>
            <!-- 展示所有频道 -->
            <van-grid class="channel-content" :gutter="10" clickable>
                <van-grid-item
                    v-for="value in 6"
                    :key="value"
                    text="文字">
                    <div class="info">
                        <span class="text">文字</span>
                    </div>
                </van-grid-item>
            </van-grid>
        </div>
    </van-popup>
</template>

<script>
export default {
    name: 'show',
    props: ['value'],
    data () {
        return {
            showClose: false
        };
    }
};
</script>

<style lang="less" scoped>
    .channel {
        // 标题
        .channel-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            // 标题文字
            .title {
                font-size: 30px;
                margin-right: 5px;
            }
            // 进入频道文字
            .desc {
                font-size: 12px;
            }
        }
        .channel-content {
            .text {
                font-size: 16px;
            }
            .active {
                color: red;
            }
            .close-icon {
                font-size: 20px;
                position: absolute;
                top: -5px;
                right: -5px;
                z-index: 99;
                background-color: #fff;
            }
            .info {
                display: flex;
                align-items: center;
            }
        }
    }
</style>
