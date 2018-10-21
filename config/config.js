// 小程序配置文件

// 运行环境：
const APP_ENV = 'test';
// const APP_ENV = 'prod';
const APP_VERSION = '1.0.0'; // 版本号
// const APP_REMOTE_CONFIG = true; // 是否远程拉配置

const configs = {};

// common
let common = {
  env: APP_ENV,
  version: APP_VERSION,
};

configs.test = Object.assign({}, common, {
  apiBaseUrl: 'http://127.0.0.1:50021/',
});

configs.prod = Object.assign({}, common, {
  apiBaseUrl: 'http://127.0.0.1:50021/',
});

// module.exports
module.exports = configs[APP_ENV];
