# 小程序初始框架

> 快速启动小程序项目

## 创建 App

```js
import { createApp } from './core/index';

createApp({
  onLaunch(options) {
    //
  },
  onShow({ scene, count, ...args }) {
    // count: invoke onshow counts
  },
  // 获取当前语言
  onLanguage() {
    let sysInfo = wx.getSystemInfoSync();
    let language = sysInfo.language || '';
    let myLang;

    if (language.indexOf('zh') !== '-1') {
      myLang = 'zh-CN';
    } else {
      myLang = 'en-US';
    }

    // return 'en-US'
    return myLang;
  },
});
```

## 创建 Page

```js
import { createPage } from '../../core/index';

createPage({
  // 名称必须设置
  name: 'items',
  // 可以为每个页面设置标题
  title: 'select items',
  // 数据
  data: {
    test: 111,
  },
  onLoad(options) {
    //
  },
  onShow({ count }) {
    // count: invoke onshow counts
  },
  onReady() {
    //
  }
});
```

## App 实例扩展属性

》 通过页面名跳转回最近的页面：`app.navigateBack({ name, delta = 1, ...args })`

- name: 页面名
- delta: 从后往前，第一个找到的为1, 第二个找到的为2

```js
app.navigateBackTo({
  name: 'home',
  delta: 1,
  success() {},
  ...
});
```

》 通过页面名获取最近的页面，从后到前：`app.getNearPage({ name, delta = 1 })`

- name: 页面名
- delta: 从后往前，第一个找到的为1, 第二个找到的为2

```js
let page = app.getNearPage({ name: 'home', delta: 1 });
```

》 注册一个暂存的数据，后面可以调用方法拉取数据：`page.setTempData(name, data = {})`

- name: 事件名称
- data: 事件数据

```js
// items page
onSelectItem(item) {
  // set temp data
  app.setTempData('select-item-back', item);
  // navigate back
  app.navigateBackTo({ name: 'home' });
}
```

》 获取缓存的数据(如果有)：`page.getTempData(name, callback, clear = true)`

- name: 事件名称
- callback: 事件回调
- clear: 是否清除缓存事件

```js
// home page
onShow() {
  app.getTempData('select-item-back', (data) => {
    this.setData({ item: data });
  });
}
```

》$data: 数据对象，详细见下面 `数据对象 $data`

- `$data.get('sysInfo')`: 系统信息
- `$data.get('isIOS')`: 是否IOS
- `$data.get('isIPhoneX')`: 是否 iPhoneX
- `$data.get('language')`: 语言
- `$data.get('scene')`: 最后一次进入的场景
- `$data.get('lastScene')`: 最后一次存在的场景

## Page 实例扩展属性

》$data: 数据对象，详细见下面 `数据对象 $data`

## 数据对象 $data

```js
import {Data} from './core/index';

const $data = new Data();
```

- `$data.set(key, value)`
- `$data.get(key)`
- `$data.getAndClear(key)`
- `$data.clear(key)`
- `$data.watch(fn)`
- `$data.watchField(field, fn)`
- `$data.removeWatch(fn)`
- `$data.removeWatchField`
