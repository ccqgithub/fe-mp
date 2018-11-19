import extendPage from './extendPage';

export default function createPage(opts = {}) {
  const app = getApp();

  // must set a name for page
  if (typeof opts.name !== 'string' || !/^[a-zA-Z\-_]*$/.test(opts.name)) {
    throw new Error('page name must set with "a-zA-Z-_"!');
  }

  const data = opts.data || {};
  const title = opts.title || '';
  const onLoad = opts.onLoad || function onLoad() {};
  const onShow = opts.onShow || function onShow() {};
  const onReady = opts.onReady || function onReady() {};

  // 额外的data信息
  data.ext = {
    language: app.$data.get('language'),
    windowHeight: app.$data.get('sysInfo').windowHeight,
    windowWidth: app.$data.get('sysInfo').windowWidth,
    isPhoneX: app.$data.get('isPhoneX'),
    isIOS: app.$data.get('isIOS'),
  };

  delete opts.data;
  delete opts.title;
  delete opts.onLoad;
  delete opts.onShow;
  delete opts.onReady;

  Page({
    ...opts,
    data,
    name: opts.name,
    onLoad(options = {}) {
      // extend page
      extendPage(this);
      // on load
      onLoad.bind(this)(options);
      app._lastPage = this.name;
    },
    onShow(options = {}) {
      // show count
      this._show_count = this._show_count ? this._show_count + 1 : 1;

      onShow.bind(this)({
        count: this._show_count,
        lastPage: app._lastPage;
      });
      app._lastPage = this.name;
    },
    onReady() {
      // set page custom title
      if (typeof title === 'string') {
        wx.setNavigationBarTitle({ title });
      } else if (typeof title === 'function') {
        wx.setNavigationBarTitle({ title: title(this) });
      }

      onReady.bind(this)();
    },
  });
}
