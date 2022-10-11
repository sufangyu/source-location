# @yu/vite-plugin-source-location-server
响应打开 IDE 请求 vite 插件

## 安装
```bash
npm install @yu/vite-plugin-source-location-server --save-dev
```

## 使用
配置 `vite.config.js`
```js
import vitePluginSourceLocationServer from "@yu/vite-plugin-source-location-server";

export default () => ({
  plugins: [
    vitePluginSourceLocationServer({
      editor: 'vscode', // "vscode" | "webstorm"
    }),
  ],
});
```

## 完整使用
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

