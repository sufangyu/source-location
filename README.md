# @yu/source-location
UI 视图定位源代码（Shift+鼠标右键）


## 使用（Webpack）
**1、安装依赖**
```bash
# 添加文件路径、行号 loader
npm install @yu/source-location-loader --save-dev

# 绑定打开编辑器请求事件
npm install @yu/location-to-source --save


# 响应处理打开 IDE 请求（openEditor）
npm install @yu/location-common --save-dev
```

**2、配置 vue.config.js**

在 vue.config.js 配置使用 loader，启动一个API去接收/响应发起的打开 IDE 请求
```js
const { openEditor } = require('@yu/location-common');

module.exports = {
  configureWebpack: (config) => {
    // 加载 node_modules 的 loader
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

**3、配置绑定事件**

为带 data-location 的元素绑定 shift + 右键事件，发起打开 IDE 的请求
```js
// main.js/main.ts
import { bindEventForLocation } from "@yu/location-to-source";

bindEventForLocation(process.env.NODE_ENV);
```

## 使用（Vite）
**1、安装依赖**
```bash
# 添加文件路径、行号 loader
npm install @yu/vite-plugin-source-location --save-dev

# 响应处理打开 IDE 请求（openEditor）
npm @yu/vite-plugin-source-location-server --save-dev

# 绑定打开编辑器请求事件
npm install @yu/location-to-source --save
```

**2、配置 vite.config.js**

在 vue.config.js 配置使用 loader，启动一个API去接收/响应发起的打开 IDE 请求
```js
import vitePluginSourceLocation from "@yu/vite-plugin-source-location";
import vitePluginSourceLocationServer from "@yu/vite-plugin-source-location-server";

export default () => ({
  plugins: [
    vitePluginSourceLocationServer({
      editor: 'vscode', // "vscode" | "webstorm"
    }),
    vitePluginSourceLocation(),
    // 其他插件配置. 这两个插件一定要在其他插件前配置
  ],
});
```

**3、配置绑定事件**
```js
import { bindEventForLocation } from "@yu/location-to-source";


bindEventForLocation(import.meta.env.MODE);
```

## 注意
要配置命令行支持 `code` 以及 `webstorm` 命令打开 IDE


## License
MIT
