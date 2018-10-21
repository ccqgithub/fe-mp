import EventEmitter from '../plugin/eventemitter3';

// data class
export default class Data {
  constructor() {
    this.data = {};
    this.EE = new EventEmitter();
  }

  // set value
  set(key, value) {
    this.data[key] = value;
    this.EE.emit('update', this.data);
    this.EE.emit(`update.${key}`, this.data);
  }

  // get value
  get(key) {
    if (typeof this.data[key] === 'undefined') return null;
    return this.data[key];
  }

  // get and clear
  getAndClear(key) {
    let value = this.get(key);
    this.clear(key);
    return value;
  }

  // clear value
  clear(key) {
    this.data[key] = null;
    this.EE.emit('update', this.data);
    this.EE.emit(`update.${key}`, this.data);
  }

  // watch update
  watch(fn) {
    this.EE.on('update', fn);
  }

  // watch a fiedl update
  watchField(field, fn) {
    this.EE.on(`update.${field}`, fn);
  }

  // remove watch update
  removeWatch(fn) {
    this.EE.off('update', fn);
  }

  // remove watch field
  removeWatchField(field, fn) {
    this.EE.off(`update.${field}`, fn);
  }
}
