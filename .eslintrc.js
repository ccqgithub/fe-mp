module.exports = {
  globals: {
    getApp: true,
    wx: true,
    App: true,
    Page: true,
    getCurrentPages: true,
  },
  parserOptions: {
    // move it into parserOptions, for eslint-plugin-vue
    // https://github.com/vuejs/eslint-plugin-vue#couple-faq
    parser: 'babel-eslint',
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    // https://github.com/benmosher/eslint-plugin-import#settings
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
  plugins: [
    // https://github.com/babel/eslint-plugin-babel
    'babel',
    // https://github.com/prettier/eslint-plugin-prettier
    'prettier',
  ],
  extends: [
    // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
    'airbnb-base',

    // https://github.com/prettier/eslint-plugin-prettier
    'prettier',
    'prettier/standard',
  ],
  env: {
    browser: false,
    es6: true,
  },
  rules: {
    // 变量命名
    camelcase: 'off',
    // 强制使用全等
    eqeqeq: 'warn',
    // prettier 格式化
    'prettier/prettier': 'warn',
    // 未使用变量
    'no-unused-vars': ['warn', { args: 'none' }],
    // 不能使用console
    'no-console': 'off',
    // 禁止使用 javascript: url
    'no-script-url': 'warn',
    // 不能定义和父作用域同名变量
    'no-shadow': 'off',
    // 不重新设置参数
    'no-param-reassign': 'off',
    // 变量不使用下划线
    'no-underscore-dangle': 'off',
    // 未改变的变量，强制使用const
    'prefer-const': 'off',
    // 只能使用解构获取对象的值
    'prefer-destructuring': 'off',
    // use Error for Promise reject
    'prefer-promise-reject-errors': 'off',
    // es6 prefer-template
    'prefer-template': 'off',
    // 不能导入dependencies之外的模块，比如devDependencies
    'import/no-extraneous-dependencies': 'off',
    // 强制 export default
    'import/prefer-default-export': 'off',
    // 不允许全局require
    'global-require': 'off',
    // 要求 return 语句要么总是指定返回的值，要么不指定
    'consistent-return': 'off',
    // 箭头函数body类型
    'arrow-body-style': 'off',
    // 回调函数使用箭头函数
    'prefer-arrow-callback': 'off',
  },
};
