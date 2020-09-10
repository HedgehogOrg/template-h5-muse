import axios from 'axios';
import { ApiHost, APIURL } from './config';
import store from '../store';

function request(type, url, {
  query = {}, body = {}, path = {}, showErrTips = true,
}) {
  // 处理path
  let reqUrl = `${ApiHost}${url}`;
  if (Object.keys(path).length) {
    Object.entries(path).forEach(([key, val]) => {
      const reg = new RegExp(`:${key}`, 'g');
      reqUrl = reqUrl.replace(reg, val);
    });
  }
  // 处理query
  if (Object.keys(query).length) {
    let q = '?';
    Object.entries(query).forEach(item => {
      q += `${item.join('=')}&`;
    });
    reqUrl += q.slice(0, -1);
  }
  return new Promise((resolve, reject) => {
    axios({
      method: type,
      url: reqUrl,
      data: body,
      headers: {
        token: `${store.state.user.token}` || '',
        cuid: `${store.state.user.cuid}` || '',
      },
    }).then(({ data }) => {
      if (data.code === 0) {
        // success
        resolve(data);
        return;
      }
      if (data.code === 3) {
        // token失效就清空本地数据
        store.commit('clearUser');
        Object.assign(data, { msg: '请先登录' });
        console.warn('请求详情：', type, reqUrl, body);
      }
      if (showErrTips && data.code !== 1004) {
        this.$toast.warning(data.msg);
      }
      reject(data);
    }).catch(reject);
  });
}

export default function install(vue) {
  const Vue = vue;
  Vue.prototype.$APIHOST = ApiHost;
  Vue.prototype.$APIURL = APIURL;
  Vue.prototype.$http = function http(type = 'get', url = '', opt = {}) {
    return request.call(this, type, url, opt);
  };
}
