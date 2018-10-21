import { createPage } from '../../core/index';

const app = getApp();

createPage({
  name: 'items',
  title: 'select items',
  data: {
    items: [1, 2, 3],
  },
  onLoad() {
    //
  },
  select(e) {
    let idx = e.currentTarget.dataset.index;
    let item = this.data.items[idx];
    app.$data.set('loginUser', { name: 'test' });
    app.setTempData('select-item-back', item);
    app.navigateBackTo({ name: 'home' });
  },
});
