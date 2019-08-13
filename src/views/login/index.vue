<template>
    <div class="login">
        <!-- 导航头 -->
        <van-nav-bar
          title="黑马头条"
        />
        <!-- 登录框 -->
        <van-cell-group>
            <van-field
                v-model="user.mobile"
                label="手机号"
                placeholder="请输入手机号"
                clearable
                left-icon="contact"
                name="mobile"
                v-validate="'required|digits:11'"
                :error-message="errors.first('mobile')"
            />
            <van-field
                v-model="user.code"
                label="验证码"
                placeholder="请输入验证码"
                clearable
                left-icon="gem-o"
                name="code"
                v-validate="'required|digits:6'"
                :error-message="errors.first('code')"
            >
                <van-button slot="button" size="small" type="default">发送验证码</van-button>
            </van-field>
            <van-button
                native-type="button"
                type="info"
                @click="loding"
                :loading="btnLoading"
                loading-type="spinner"
                loading-text="登录中..."
            >登录</van-button>
        </van-cell-group>
    </div>
</template>

<script>
// 引入状态树模块和异步模块
import { mapState, mapActions } from 'vuex';
export default {
    data () {
        return {
            // 登录开关
            btnLoading: false
        };
    },
    // 计算属性，根据变化实时更新
    computed: {
        // 引入登录模块中的用户数据
        ...mapState('login', ['user'])
    },
    // 自定义方法
    methods: {
        // 引入用户中的异步操作
        ...mapActions('login', ['request']),
        // 登录方法
        async loding () {
            // 打开登录等待
            this.btnLoading = true;
            // 登录前验证
            const valid = await this.$validator.validate();
            if (!valid) {
                // 关闭登录等待
                this.btnLoading = false;
                return;
            };
            // 执行异步操作
            let a = await this.request();
            // 判断是否登录
            if (a.code === 401) {
                // 关闭登录等待
                this.btnLoading = false;
                // 提示失败
                return this.$toast.fail('登录失败');
            };
            // 跳转到home
            this.$router.push({ name: 'layout' });
            // 关闭登录等待
            this.btnLoading = false;
            // 提示登陆成功
            this.$toast.success('登录成功');
        }
    },
    // 创建实例前生命周期函数
    created () {
        const dict = {
            custom: {
                mobile: {
                    required: '请输入手机号码',
                    digits: '手机号码必须是11位数字'
                },
                code: {
                    required: '请输入验证码',
                    digits: '验证码必须是6位数字'
                }
            }
        };
        this.$validator.localize('zh_CN', dict);
    }
};
</script>

<style>
    .van-button {
        width: 90%;
        transform: translateX(5%);
    }
</style>

