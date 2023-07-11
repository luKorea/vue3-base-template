# 项目运行配置 (目前只支持 hash 模式)

npm run dev
npm run build:electron

# 以下库为了解决 electron 启动同时打开浏览器 tab 以及 electron 客户单

1. npm i concurrently
2. npm i wait-on
3. npm i cross-env
4. npm install electron-is-dev --save-dev

```json
    "dev": "concurrently \"wait-on http://localhost:9999 && electron .\" \"cross-env BROWSER=none npm start\"",

```

# 打包

npm i electron-builder

```json
 "build:electron": "vue-cli-service build && electron-builder",

```

# 集成 element-plus

1. npm i element-plus
2. npm install -D unplugin-vue-components unplugin-auto-import
