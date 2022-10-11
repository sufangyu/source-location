
# @yu/source-location-loader
通过界面打开定位到源码行的 Webpack loader


## 使用
在 vue.config.js 配置使用 loader。

```js
module.exports = {
  configureWebpack: (config) => {
    config.resolveLoader = {
      modules: ['node_modules'],
    };
  },
  chainWebpack: (config) => {
    config.when(
      process.env.NODE_ENV !== 'production', (conf) => conf.module
        .rule('vue')
        .test(/\.vue$/)
        .use('@yu/source-location-loader')
        .loader('@yu/source-location-loader')
        .end(),
    );
  },
 };
```

在 vue.config.js 启动一个API去接收/响应发起的打开 IDE 请求。
```js
const { openEditor } = require('@yu/location-common');

module.exports = {
  devServer: {
    setup(app) {
      app.get('/open-ide', (req, res) => {
        openEditor(req, 'vscode');
        res.json({ success: true });
      });
    },
  },
};
```

为带 data-location 的元素绑定 shift + 右键事件，发起打开 IDE 的请求
```js
// main.js/main.ts
import { bindEventForLocation } from "@yu/location-to-source";

// webpack 脚手架
bindEventForLocation(process.env.NODE_ENV);

// vite 脚手架
bindEventForLocation(import.meta.env.MODE);
```