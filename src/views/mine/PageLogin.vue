<template>
  <MyPage class="page-login" title="登录">
    <h2 class="login-title">补充信息</h2>
    <p class="login-desc">补充完手机信息，即可开始啦！</p>
    <div>
      <mu-form ref="form1" :model="validatePhoneForm" class="login-form phone-form">
        <mu-form-item prop="phone" :rules="phoneRules">
          <mu-text-field placeholder="手机号" v-model="validatePhoneForm.phone" underline-color="#FE7098" @blur="$fixWechatKeybordBug"></mu-text-field>
        </mu-form-item>
      </mu-form>
      <mu-form ref="form2" :model="validateCodeForm" class="login-form">
        <mu-form-item prop="code" :rules="codeRules">
          <mu-text-field placeholder="短信验证码" type="tel" :max-length="6" v-model="validateCodeForm.code" underline-color="#FE7098"
            @blur="$fixWechatKeybordBug">
            <my-button small v-loading="sendCodeLoading" data-mu-loading-size="22" data-mu-loading-class="round-loading" slot="append" round
              :disabled="!!timer" class="login-form-code-button" @click="sendCode">
              {{countDownText}}
            </my-button>
          </mu-text-field>
        </mu-form-item>
        <div class="login-form-protocal">
          <my-button major v-loading="loginLoading" :disabled="disabledLogin" data-mu-loading-size="22" data-mu-loading-class="round-loading"
            color="primary" @click="submit" round large class="login-form-submit">确认
          </my-button>
          <p>确认代表您同意{{AppName}}</p>
          <p>
            <a href="http://www.testh5.com/protocol.html" target="_blank">《用户协议》</a>
            及
            <a href="http://www.testh5.com/policy.html" target="_blank">《隐私政策》</a>
          </p>
          <p><br /></p>
        </div>
      </mu-form>
    </div>
  </MyPage>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import MyPage from '../../components/MyPage.vue';

// 获取验证码倒数时长
const countDown = 59;

export default {
  components: {
    MyPage,
  },
  data() {
    return {
      phoneRules: [
        { validate: val => !!val, message: '必须填写手机号' },
        { validate: val => /^1[3-9]\d{9}$/.test(val), message: '请输入正确的手机号' },
      ],
      codeRules: [
        { validate: val => !!val, message: '必须填写短信验证码' },
        { validate: val => val.length === 6, message: '请输入正确的验证码' },
      ],
      validatePhoneForm: {
        phone: '',
      },
      validateCodeForm: {
        code: '',
      },
      sendCodeLoading: false,
      timer: null,
      countDown,
      countDownText: '获取验证码',
      loginLoading: false,
      disabledLogin: false,
      loginSuccessData: null,
    };
  },
  computed: {
    ...mapState([]),
  },
  beforeRouteLeave(to, from, next) {
    if (this.loginSuccessData) {
      // 触发登录页自动返回的回调
      this.$root.$emit('afterLogin', this.loginSuccessData);
    }
    next();
  },
  methods: {
    ...mapMutations(['setUser']),
    // 发送验证码
    sendCode() {
      this.$refs.form1.validate().then(result => {
        if (result) {
          if (this.sendCodeLoading) return;
          this.sendCodeLoading = true;
          this.$http('get', this.$APIURL.sms, {
            query: {
              phone: this.validatePhoneForm.phone.trim(),
            },
          }).then(() => this.afterSendCode()).finally(() => {
            this.sendCodeLoading = false;
          });
        }
      });
    },
    // 倒计时
    afterSendCode() {
      if (this.timer) return;
      this.countDownText = `${this.countDown}s`;
      this.timer = setInterval(() => {
        if (this.countDown <= 0) {
          clearInterval(this.timer);
          this.timer = null;
          this.countDownText = '获取验证码';
          this.countDown = countDown;
          return;
        }
        this.countDown -= 1;
        this.countDownText = `${this.countDown}s`;
      }, 1000);
    },
    // 点击登录
    submit() {
      const validates = [this.$refs.form1.validate(), this.$refs.form2.validate()];
      Promise.all(validates).then(resultArr => {
        if (resultArr.filter(Boolean).length === validates.length) {
          this.login();
        }
      });
    },
    // 登录
    login() {
      if (this.loginLoading) return;
      this.loginLoading = true;
      const query = {
        phone: this.validatePhoneForm.phone,
        code: this.validateCodeForm.code,
      };
      this.$http('put', this.$APIURL.phoneSign, {
        query,
      }).then(({ data }) => {
        this.disabledLogin = true;
        this.$refs.form1.clear();
        this.$refs.form2.clear();
        this.afterLogin(data);
      }).catch(() => {}).finally(() => { this.loginLoading = false; });
    },
    // 登录后
    afterLogin(data) {
      // 保存用户信息
      this.loginSuccessData = data;
      this.setUser(data);
      // this.$toast.success('登录成功');
      console.log('登录成功');
      setTimeout(() => {
        this.$router.go(-1);
      }, 2000);
    },
  },
};
</script>

<style lang="less">
.page-login {
  .login- {
    &title {
      margin: 70px 0 0 15px;
      font-size: 34px;
      font-weight: bold;
    }
    &desc {
      margin: 8px 0 0 15px;
      font-size: 18px;
    }
    &form {
      box-sizing: border-box;
      padding-left: 15px;
      &.phone-form {
        margin-top: 64px;
      }
      &-code-button {
        padding: 10px;
      }
      .mu-input-help {
        > div:nth-child(2) {
          opacity: 0;
          padding-right: 10px;
        }
      }
      &-submit {
        display: inline-block;
        width: 60%;
      }
      &-protocal {
        margin-top: 46px;
        text-align: center;
        p {
          padding: 0;
          margin: 0;
          font-size: 12px;
          color: #999;
          line-height: 1.2;
          transform: scale(0.8);
          &:first-of-type {
            margin-top: 16px;
          }
          a {
            color: #999;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
