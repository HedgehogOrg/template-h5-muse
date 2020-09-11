// 环境配置
export const Env = process.env.NODE_ENV;
const getApiHost = e => {
  switch (e) {
    case 'production':
      return 'https://production.h5template.com/api';
    case 'development':
      return 'https://development.h5template.com/api';
    case 'test':
      return 'https://test.h5template.com/api';
    default:
      return 'https://development.h5template.com/api';
  }
};

// 请求root
export const ApiHost = getApiHost(Env);

// UA判断是否微信
export const IsWechat = !!window.navigator.userAgent.match(/MicroMessenger/i);

export const IsIphone = !!window.navigator.userAgent.match(/iPhone/i);

export const IsAndroid = !!window.navigator.userAgent.match(/Android/i);

// 项目名称
export const AppName = '<%= projectName %>';

// APP是否带顶部AppBar
export const WithAppBar = true;

// 根据平台设置支付类型字符串
export const PayType = IsWechat
  ? { wechat: 'wechatpay' }
  : { wechat: 'wechatpay', ali: 'alipay' };

// / [APIURL] 请求接口统一定义
export const APIURL = {
  login: 'wxAuth',
  // 个人中心数据
  info: '/user/info',
  // 发送短信
  sms: '/user/sendSms',
  // 手机号码登录
  phoneSign: '/user/phoneSign',
  // 公用接口（首页初始数据）
  maininit: '/init',
  // 微信支付
  wxpay: '/user/wxpay',
  // 支付宝支付
  alipay: '/user/alipay',
  // 检查支付
  checkpay: '/user/checkpay',
  // 获取用户信息
  wxInfo: '/user/wxInfo',
  // 刷新token
  token: '/token',
};
