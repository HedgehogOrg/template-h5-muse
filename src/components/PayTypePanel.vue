<template>
  <div class="pay-type-panel-container">
    <mu-dialog width="100%" max-width="100%" :append-body="false" :open="value" transition="slide-bottom" :overlay-opacity="0.54" @close="closeDialog"
      class="pay-type-panel-main">
      <ul class="pay-type-panel-list">
        <li v-for="item in payTypeBtnData" :key="item.type" @click="pay(item.type)">
          <img :src="item.icon" alt="">
          <span>{{item.title}}</span>
          <mu-ripple></mu-ripple>
        </li>
      </ul>
      <mu-button slot="actions" full-width large @click="closeDialog">取消</mu-button>
    </mu-dialog>
    <mu-dialog title="请确认支付已完成" width="360" dialog-class="my-dialog" :open="showConfirm">
      <mu-button slot="actions" flat color="primary" @click="afterPay">遇到问题</mu-button>
      <mu-button slot="actions" flat color="primary" @click="afterPay">已完成</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import mgtv from '../common/mgtv';
import { PayType, IsWechat } from '../common/config';
import iconWechatPay from '../assets/images/wechatpay.png';
import iconAlipay from '../assets/images/alipay.png';

const payTypeBtnData = [{
  title: '微信',
  type: PayType.wx,
  icon: iconWechatPay,
}];
if (!IsWechat) {
  payTypeBtnData.push({
    title: '支付宝',
    type: PayType.ali,
    icon: iconAlipay,
  });
}

export default {
  data() {
    return {
      payTypeBtnData,
      showConfirm: false,
      rechargeSn: '',
    };
  },
  computed: {
    ...mapState(['user', 'cn']),
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    amount: {
      type: Number,
      default: 0,
    },
    sn: {
      type: String,
      default: '',
    },
    cid: {
      type: [String, Number],
      default: '',
    },
  },
  watch: {
    value(val) {
      if (val) {
        this.$emit('open');
      } else {
        this.$emit('close');
      }
    },
  },
  mounted() {
  },
  methods: {
    ...mapMutations(['setUser']),
    ...mapActions(['updateUserByToken']),
    closeDialog() {
      this.$emit('input', false);
    },
    pay(type) {
      this.closeDialog();
      const loading = this.$loading();
      let payRequest;
      if (mgtv) {
        payRequest = this.mgtvPay(type);
      } else {
        payRequest = this.normalPay(type);
      }
      payRequest.finally(() => { loading.close(); });
    },
    // 普通pay
    normalPay(type) {
      return this.$http('get', this.$APIURL[type], {
        query: {
          fee: this.amount,
          sn: this.sn,
        },
      }).then(({ data, pay_info: payInfo }) => {
        if (IsWechat && data) {
          // 微信内
          // data = { appId, timeStamp, nonceStr, package, signType, paySign };
          window.WeixinJSBridge.invoke(
            'getBrandWCPayRequest', data,
            res => {
              if (res.err_msg === 'get_brand_wcpay_request:ok') {
                // 使用以上方式判断前端返回,微信团队郑重提示：
                // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                this.showConfirmDialog();
              }
            },
          );
        } else {
          // 非微信内
          this.$router.push({
            path: '/pay',
            query: {
              fee: this.amount,
              sn: this.sn,
              payInfo,
            },
          });
        }
      }).catch(() => {});
    },
    // 芒果支付
    mgtvPay(type) {
      return this.$http('get', this.$APIURL.mgtvpay, {
        query: {
          fee: this.amount,
          sn: this.sn,
          way: type,
          ticket: this.user.ticket,
          cn: this.cn,
          cid: this.cid,
        },
      }).then(({ data }) => {
        mgtv.appPay(data.orderId, data.url, data.returnUrl);
      }).catch(() => {});
    },
    // 确认是否支付完成
    showConfirmDialog() {
      if (mgtv) {
        // 芒果tv
        const { sn } = this.$getQueryFromLocation();
        if (sn) {
          this.rechargeSn = sn;
          this.showConfirm = true;
        }
        // 芒果tv没sn不弹框
      } else {
        this.showConfirm = true;
      }
    },
    // 支付后
    async afterPay() {
      // 刷新本地user数据(for after pay)
      this.showConfirm = false;
      if (mgtv) {
        // 芒果tv
        await this.checkPay();
      } else {
        // 正常支付
        await this.updateUserByToken();
      }
      this.$emit('afterCheckPay');
    },
    // 查询充值结果（手动查询可避免延时）
    checkPay() {
      const loading = this.$loading();
      return this.$http('get', this.$APIURL.checkpay, {
        query: {
          sn: this.rechargeSn,
        },
      }).then(({ data }) => {
        this.setUser({ balance: data.balance });
      }).catch(() => {}).finally(() => { loading.close(); });
    },
  },
};
</script>

<style lang="less">
.pay-type-panel {
  &-main {
    -webkit-align-items: flex-end;
    align-items: flex-end;
    > div {
      border-radius: 0;
      background-color: rgba(255, 255, 255, 0.9);
    }
    .mu-dialog-actions {
      padding: 0;
      min-height: auto;
      .mu-button {
        vertical-align: middle;
      }
    }
  }
  &-list {
    display: flex;
    justify-content: space-around;
    li {
      position: relative;
      width: 80px;
      height: 80px;
      text-align: center;
      img {
        width: 50px;
      }
      span {
        display: block;
      }
    }
  }
}
</style>
