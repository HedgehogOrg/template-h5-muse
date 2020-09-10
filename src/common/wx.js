import scriptjs from 'scriptjs';

const wx = {};
export default wx;

scriptjs('//res.wx.qq.com/open/js/jweixin-1.6.0.js', () => {
  // const WxJSConfig = window.WxJSConfig || {};
  // const Share = window.Share || {};

  // // WxJSConfig.debug = true; //__DEBUG__;

  // WxJSConfig.jsApiList = [
  //   'updateAppMessageShareData',
  //   'updateTimelineShareData',
  //   'onMenuShareTimeline', // 即将废弃
  //   'onMenuShareAppMessage', // 即将废弃
  //   'onMenuShareQQ', // 即将废弃
  //   'onMenuShareWeibo',
  //   'onMenuShareQZone',
  //   'startRecord',
  //   'stopRecord',
  //   'onVoiceRecordEnd',
  //   'playVoice',
  //   'pauseVoice',
  //   'stopVoice',
  //   'onVoicePlayEnd',
  //   'uploadVoice',
  //   'downloadVoice',
  //   'chooseImage',
  //   'previewImage',
  //   'uploadImage',
  //   'downloadImage',
  //   'translateVoice',
  //   'getNetworkType',
  //   'openLocation',
  //   'getLocation',
  //   'hideOptionMenu',
  //   'showOptionMenu',
  //   'hideMenuItems',
  //   'showMenuItems',
  //   'hideAllNonBaseMenuItem',
  //   'showAllNonBaseMenuItem',
  //   'closeWindow',
  //   'scanQRCode',
  //   'chooseWXPay',
  //   'openProductSpecificView',
  // ];

  // function initShare() {
  //   [
  //     'onMenuShareTimeline',
  //     'onMenuShareAppMessage',
  //     'onMenuShareQQ',
  //     'onMenuShareWeibo',
  //     'onMenuShareQZone',
  //   ].forEach(fn => {
  //     if (typeof window.wx[fn] === 'function') {
  //       window.wx[fn]({
  //         title: Share.Title,
  //         desc: Share.Content,
  //         link: Share.Url,
  //         imgUrl: Share.ImageUrl,
  //         icon: Share.Icon,
  //         success() {
  //           if (typeof window.wx.onShareSuccess === 'function') {
  //             window.wx.onShareSuccess();
  //           }

  //           if (typeof Wx.onShareSuccess === 'function') {
  //             Wx.onShareSuccess();
  //           }
  //         },

  //         cancel() {
  //           if (typeof window.wx.onShareCancel === 'function') {
  //             window.wx.onShareCancel();
  //           }

  //           if (typeof Wx.onShareCancel === 'function') {
  //             Wx.onShareCancel();
  //           }
  //         },
  //       });
  //     }
  //   });
  // }

  // window.wx.config(WxJSConfig);
  // window.wx.ready(() => {
  //   window.wxReady = true;
  //   initShare();
  //   if (typeof Wx.onReady === 'function') {
  //     Wx.onReady();
  //   }
  // });
  // window.wx.reInitShare = initShare;
});

/*
Wx.onReady = () => {
  window.isWx = true;
  wx.hideMenuItems({
    menuList: [
      'menuItem:share:appMessage',
      'menuItem:share:timeline',
      'menuItem:share:qq',
      'menuItem:share:weiboApp',
      'menuItem:favorite',
      'menuItem:share:facebook',
      'menuItem:share:QZone',
      'menuItem:editTag',
      'menuItem:delete',
      'menuItem:copyUrl',
      'menuItem:originPage',
      'menuItem:readMode',
      'menuItem:openWithQQBrowser',
      'menuItem:openWithSafari',
      'menuItem:share:email',
      'menuItem:share:brand',
    ], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
  });
};
 */
