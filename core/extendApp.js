import Data from './data';

// extend app
export default function extendApp(app) {
  // $data
  app.$data = new Data();

  // temp Data
  const tempData = {};

  // navigate back to near page
  // name: 页面名
  // delta: 从后往前，第一个找到的为1, 第二个找到的为2
  app.navigateBackTo = function navigateBack({ name, delta = 1, ...args }) {
    let pages = getCurrentPages()
      .slice()
      .reverse();
    let count = 0;
    let i = -1;

    pages.forEach((page, index) => {
      if (page.name === name) {
        count += 1;
        if (count === delta) i = index;
      }
    });

    if (i === -1) {
      throw new Error(`can not back to page <${name}>, because not exist!`);
    }

    wx.navigateBack({
      ...args,
      delta: i,
    });
  };

  // find pages by name
  // name: 页面名
  // delta: 从后往前，第一个找到的为1, 第二个找到的为2
  app.getNearPage = function getNearPage({ name, delta = 1 }) {
    let pages = getCurrentPages();
    let rst = [];

    pages.forEach((page) => {
      if (page.name === name) rst.push(page);
    });

    return rst.reverse()[delta - 1] || null;
  };

  // set temp data
  app.setTempData = function registerEvent(name, data = {}) {
    tempData[name] = data;
  };

  // get temp data
  app.getTempData = function getTempData(name, callback, clear = true) {
    if (tempData[name]) {
      callback(tempData[name]);
      if (clear) delete tempData[name];
    }
  };
}
