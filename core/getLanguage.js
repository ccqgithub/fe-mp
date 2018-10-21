// get language
export default function getLanguage() {
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
}
