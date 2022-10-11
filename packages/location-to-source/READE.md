# @yu/location-to-source
为带 data-location 的元素绑定 shift + 右键事件，发起打开 IDE 的请求

## 使用
```js
// main.js/main.ts
import { bindEventForLocation } from "@yu/location-to-source";

// webpack 脚手架
bindEventForLocation(process.env.NODE_ENV);

// vite 脚手架
bindEventForLocation(import.meta.env.MODE);
```