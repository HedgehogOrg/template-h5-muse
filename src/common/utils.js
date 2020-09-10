import dayjs from 'dayjs';
import { WithAppBar, AppName } from './config';

export default function install(vue) {
  const Vue = vue;

  // APP是否带顶部AppBar
  Vue.prototype.WithAppBar = WithAppBar;
  // App Name
  Vue.prototype.AppName = AppName;
  // 格式化金额
  Vue.filter('formatPrice', (price = 0) => `¥${(price / 100).toFixed(2)}`);
  // px转vw单位
  Vue.prototype.$px2vw = function px2vw(px = 0) {
    return `${(px / 375) * 100}vw`;
  };
  // 修复微信软键盘弹起导致页面变形的bug
  Vue.prototype.$fixWechatKeybordBug = function fixWechatKeybordBug() {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollTop + 1);
    }, 17);
  };
  // 格式化日期
  Vue.prototype.$formatDate = function formatDate(time = Date.now()) {
    return dayjs(time).format('YYYY-MM-DD');
  };
  // 格式化日期时间
  Vue.prototype.$formatTimeDate = function formatTimeDate(time = Date.now()) {
    return dayjs(time).format('YYYY-MM-DD HH:mm:ss');
  };
  // 获取DOM的parentElement
  Vue.prototype.$getParentByClass = function getParentByClass(el, className) {
    function getParent(ele) {
      const parent = ele.parentElement;
      if (!parent) return undefined;
      const classList = Array.from(parent.classList);
      if (classList.includes(className)) {
        return parent;
      }
      return getParent(parent);
    }
    return getParent(el);
  };
  // 登录
  Vue.prototype.$login = function login() {
    return new Promise(resolve => {
      // 普通登录
      this.$router.push('/login');
      this.$root.$off('afterLogin');
      this.$root.$once('afterLogin', data => resolve(data));
    });
  };
  // 登录后才允许跳转
  Vue.prototype.$goToPageAfterLogin = function goToPageAfterLogin(path) {
    if (!this.$store.state.user.token) {
      this.$login().then(() => {
        this.$router.push(path);
      });
      return;
    }
    this.$router.push(path);
  };
}
