import { createApp } from './core/index';
import * as API from './utils/api';
import { OBJError } from './utils/error';
import { logMsg, logError } from './utils/log';

// app.js
createApp({
  onLanguage() {
    return 'zh-CN';
  },
  onLaunch(options) {
    // 登录用户
    this.$data.set('loginUser', null);
  },
  onShow(options) {
    //
  },
  onHide() {
    // console.log('app hide');
  },
  onError(msg) {
    this.reportError(msg);
    logMsg(msg);
    wx.showToast({
      icon: 'none',
      title: msg,
    });
  },
  // 清除登录
  clearLogin() {
    this.$data.clear('loginUser');
  },
  // 检查登录状态
  checkSession() {
    return new Promise((resolve, reject) => {
      wx.checkSession({
        success() {
          resolve(true);
        },
        fail() {
          resolve(false);
        },
      });
    });
  },
  // 获取位置信息
  getLocation(type = 'wgs84') {
    let app = this;

    app.getLocationPromises = app.getLocationPromises || {};

    // 正在请求
    if (app.getLocationPromises[type]) {
      return app.getLocationPromises[type];
    }

    app.getLocationPromises[type] = new Promise((resolve, reject) => {
      // getLocation
      wx.getLocation({
        success(res) {
          resolve(res);
        },
        fail(res) {
          logMsg('getLocation fail', res);
          reject(
            new OBJError({
              code: null,
              message: res.errMsg || 'getLocation fail',
            }),
          );
        },
      });
    })
      .then((res) => {
        app.getLocationPromises[type] = null;
        return res;
      })
      .catch((error) => {
        app.reportError(error.message);
        app.getLocationPromises[type] = null;
        return Promise.reject(error);
      });

    return app.getLocationPromises[type];
  },
  // 获取登录用户信息
  login() {
    let app = this;

    // 正在请求
    if (app.getLoginInfoPromise) {
      return app.getLoginInfoPromise;
    }

    app.getLoginInfoPromise = app
      .checkSession()
      .then((flag) => {
        // 已登录
        let loginUser = app.$data.get('loginUser');
        if (flag && loginUser) {
          return Promise.resolve(loginUser);
        }

        return new Promise((resolve, reject) => {
          // login
          wx.login({
            success(res) {
              if (!res.code) {
                logMsg(`获取用户登录态失败！${res.errMsg}`);
                reject(
                  new OBJError({
                    code: null,
                    message: res.errMsg,
                  }),
                );
                return;
              }

              // 检查微信用户注册信息
              API.login({
                code: res.code,
              })
                .then(resolve)
                .catch(reject);
            },
            fail(res) {
              logMsg(`login fail！${res.errMsg}`);
              reject(
                new OBJError({
                  code: null,
                  message: res.errMsg || 'login fail',
                }),
              );
            },
          });
        });
      })
      .then((loginInfo) => {
        app.$data.set('loginUser', loginInfo);
        app.getLoginInfoPromise = null;
        return loginInfo;
      })
      .catch((error) => {
        app.reportError(error.message);
        app.getLoginInfoPromise = null;
        return Promise.reject(error);
      });

    return app.getLoginInfoPromise;
  },
  // 授权接口
  authorizeApi(scope) {
    let app = this;

    app.authorizeApiPromises = app.authorizeApiPromises || {};

    // 正在请求
    if (app.authorizeApiPromises[scope]) {
      return app.authorizeApiPromises[scope];
    }

    app.authorizeApiPromises[scope] = new Promise((resolve, reject) => {
      // 获取授权状态
      wx.getSetting({
        success: (res) => {
          if (!res.authSetting[scope]) {
            // 授权弹窗
            wx.authorize({
              scope,
              success(res) {
                resolve(res);
              },
              fail(res) {
                logMsg(`授权失败: ${scope}`);
                reject(
                  new OBJError({
                    code: null,
                    message: `授权失败`,
                    type: 'authorize',
                  }),
                );
              },
            });
          } else {
            resolve(res);
          }
        },
        fail(res) {
          reject(
            new OBJError({
              code: null,
              message: `授权失败`,
              type: 'authorize',
            }),
          );
        },
      });
    })
      .then((res) => {
        app.authorizeApiPromises[scope] = null;
        return res;
      })
      .catch((error) => {
        app.reportError(error.message);
        app.authorizeApiPromises[scope] = null;
        return Promise.reject(error);
      });

    return app.authorizeApiPromises[scope];
  },
  // 监控异常
  reportError(message) {
    wx.reportAnalytics('error_report', {
      message,
    });
  },
  // reportMonitor
  reportMonitor(name, value) {
    if (wx.reportMonitor) {
      wx.reportMonitor(name, value);
    }
  },
});
