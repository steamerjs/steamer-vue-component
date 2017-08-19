# steamer-vue-component

用于开发 `vue` 组件的脚手架


## 快速启动

## 快速启动

* 推荐 >> 使用[steamerjs](https://steamerjs.github.io/docs/projectkits/Bootstrap.html)安装

```javascript

npm i -g steamerjs steamer-plugin-kit

npm i -g steamer-vue-component

steamer kit
```

* 直接从github clone 下来

### 安装依赖
```bash
npm i
```

### 开发

```bash
npm run start 或 npm run dev

// 打开链接，查看 demo
localhost:9000
```

> ps：此处在开启开发模式下默认会自动打开浏览器。

### 代码规范扫描

```bash
npm run lint
```

> ps：此处的扫描在开发模式下是默认开启的，不需要手动执行lint。

### 测试

```bash
// 使用 karma 测试
npm run test 或 npm run karma
```

### 生产代码生成

```bash
// 使用 babel 编译
npm run dist 或 npm run babel

// 使用 webapck 编译
npm run webpack
```

> ps：关于两种编译方式的区别可查看[这里](https://steamerjs.github.io/docs/Componet-Standard.html#两种编译与两种测试方式)。

## 编写demo

直接在`/example/src/container/`目录下调整关于组件的使用逻辑和范例样式即可，如范例中该目录下的index.js和index.less文件。


## 脚手架文档
[参见文档 - 组件脚手架](https://steamerjs.github.io/docs/componentkits/Starterkit.html)

## 文章参考
* [聊一聊前端自动化测试](https://github.com/tmallfe/tmallfe.github.io/issues/37)
