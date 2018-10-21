import { createPage } from '../../core/index';

const app = getApp();

createPage({
  name: 'home',
  data: {
    item: '',
    loginUser: null,
  },
  onLoad() {
    // app
    //   .login()
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    app.$data.watchField('loginUser', ({ loginUser }) => {
      this.setData({ loginUser });
    });
  },
  onShow(options) {
    console.log(options);
    app.getTempData('select-item-back', (data) => {
      this.setData({ item: data });
    });
  },
  selectItem() {
    wx.navigateTo({
      url: '/pages/items/index',
    });
  },
});
