// 延迟、节流
export function debounce(fn, delay, prepose) {
  let timer;
  let last_exec = 0;
  return function debounceFn(...args) {
    let that = this;
    let diff;
    let exec = function exec() {
      last_exec = +new Date();
      fn.apply(that, args);
    };

    if (timer) clearTimeout(timer);

    if (prepose) {
      diff = delay - (+new Date() - last_exec);
      if (diff <= 0) exec();
    } else {
      timer = setTimeout(exec, delay);
    }
  };
}

// 提示错误
export function showError(error) {
  console.log(error);
  wx.showToast({
    icon: 'none',
    title: error.message,
  });
}

// 提示错误，关闭loading
export function showLoadingError(error) {
  console.log(error);
  wx.hideLoading();
  wx.showToast({
    icon: 'none',
    title: error.message,
  });
}

// 提示错误，关闭 nav loading
export function showNavLoadingError(error) {
  console.log(error);
  wx.hideNavigationBarLoading();
  wx.showToast({
    icon: 'none',
    title: error.message,
  });
}

// 删除参数对象中未定义的值
export function optimizeParams(obj) {
  let data = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] !== 'undefined') data[key] = obj[key];
  });
  return data;
}

// 替换字符串中参数
export function replaceVars(str, vars = []) {
  let format = str;
  vars.forEach((arr) => {
    let key = arr[0];
    let val = arr[1];
    let exp = new RegExp('\\$\\{' + key + '\\}', 'g');
    format = format.replace(exp, val);
  });

  return format;
}
