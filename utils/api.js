import config from '../config/config';
import { OBJError } from './error';
import { logMsg, logError } from './log';

// 统一请求入口
export function request(opts) {
  // console.log(opts);
  const app = getApp();
  const loginUser = app.$data.get('loginUser');

  return new Promise((resolve, reject) => {
    if (opts.url.indexOf('https') !== 0) {
      opts.url =
        config.apiBaseUrl.replace(/\/$/, '') +
        '/' +
        opts.url.replace(/^\//, '');
    }

    if (!opts.header) opts.header = {};

    if (!opts.header['Content-Type']) {
      opts.header['Content-Type'] = 'application/json';
    }

    if (loginUser && loginUser.token) {
      opts.header.Token = loginUser.token;
    }

    let obj = Object.assign(opts, {
      success(res) {
        // console.log(res)
        if (res.data.error) {
          logMsg(`api error:${opts.url}`);
          return reject(new OBJError(res.data.error));
        }

        if (typeof res.data.result === 'undefined') {
          return reject(
            new OBJError({
              message: `api error: ${opts.url}`,
            }),
          );
        }

        resolve(res);
      },
      fail(res) {
        logError(res, 'wx.request fail');
        reject(
          new OBJError({
            code: null,
            message: res.errMsg || 'wx.request fail',
          }),
        );
      },
    });
    wx.request(obj);
  }).catch((error) => {
    app.reportError(error.message);
    return Promise.reject(error);
  });
}

// graphql
export function graphql(query, variables = {}) {
  return request({
    url: '/graphql',
    method: 'POST',
    data: JSON.stringify({
      query,
      variables,
    }),
  }).then((res) => {
    return res.data.result;
  });
}

// login
export function login({ code }) {
  return Promise.resolve({ openid: 'xxxx', nickname: '123' });

  // return graphql(
  //   `
  //     mutation Login($code: String) {
  //       login(code: $code) {
  //         openid
  //         nickname
  //       }
  //     }
  //   `,
  //   { code },
  // );
}
