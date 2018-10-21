import getLanguage from './getLanguage';
import extendApp from './extendApp';

export default function createApp(opts = {}) {
  const onLaunch = opts.onLaunch || function onLaunch() {};
  const onShow = opts.onShow || function onShow() {};
  const onLanguage =
    opts.onLanguage ||
    function onLanguage() {
      return getLanguage();
    };

  delete opts.onLaunch;
  delete opts.onShow;
  delete opts.onLanguage;

  App({
    ...opts,
    onLaunch(options = {}) {
      // extend app
      extendApp(this);

      // 系统信息
      let sysInfo = wx.getSystemInfoSync();
      let isIOS = /iOS/.test(sysInfo.system);
      let isIPhoneX = /iPhone\sX/.test(sysInfo.model);
      let language = onLanguage.bind(this)();

      // 系统信息
      this.$data.set('sysInfo', sysInfo);
      // 是否 ios
      this.$data.set('isIOS', isIOS);
      // 是否 iphone
      this.$data.set('isIPhoneX', isIPhoneX);
      // 语言
      this.$data.set('language', language);

      // launch
      onLaunch.bind(this)(options);
    },
    onShow(options = {}) {
      let scene = decodeURIComponent(options.scene || '');

      // 最后一次存在的场景值
      this.$data.set('scene', scene);
      // 每次显示的场景值
      if (scene) this.$data.set('lastScene', scene);

      // on show
      onShow.bind(this)(options);
    },
  });
}
