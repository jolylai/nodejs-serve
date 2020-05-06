---
title: 配置
nav:
  title: 指南
  order: 1
---

## 跨域

安装 egg-cors

```bash
yarn add egg-cors
```

启用插件

```js
// config/plugin.js
exports.cors = {
  enable: true,
  package: "egg-cors"
};
```

配置

```js
// config/config.default.js
module.exports = appInfo => {
  const config = {};

  config.security = {
    domainWhiteList: ["*"], // 没有配置的话，错误信息：404
    csrf: {
      enable: false // 暂时禁用掉 csrf，错误信息：403 missing csrf token
    }
  };

  config.cors = {
    credentials: true,
    origin: ctx => ctx.get("origin"),
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS"
  };

  return config;
};
```

## 参数效验

安装

```bash
yarn add egg-validate
```

开启插件

```js
// config/plugin.js
exports.cors = {
  enable: true,
  package: "egg-validate"
};
```

使用

```js
// app/controller/topics.js
const Controller = require("egg").Controller;

// 定义创建接口的请求参数规则
const createRule = {
  accesstoken: "string",
  title: "string",
  tab: { type: "enum", values: ["ask", "share", "job"], required: false },
  content: "string"
};

class TopicController extends Controller {
  async create() {
    const ctx = this.ctx;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createRule, ctx.request.body);
    // 调用 service 创建一个 topic
    const id = await ctx.service.topics.create(ctx.request.body);
    // 设置响应体和状态码
    ctx.body = {
      topic_id: id
    };
    ctx.status = 201;
  }
}
module.exports = TopicController;
```
