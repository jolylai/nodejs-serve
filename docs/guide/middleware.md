---
title: 中间件
nav:
  title: 指南
  order: 1
---

## 统一错误处理

```js
// app/middleware/error_handler.js
module.exports = () => {
  return async function errorHandler(ctx, next) {
    try {
      await next();
    } catch (err) {
      // 所有的异常都在 app 上触发一个 error 事件，框架会记录一条错误日志
      ctx.app.emit("error", err, ctx);

      const status = err.status || 500;
      // 生产环境时 500 错误的详细错误内容不返回给客户端，因为可能包含敏感信息
      const error =
        status === 500 && ctx.app.config.env === "prod"
          ? "Internal Server Error"
          : err.message;

      // 从 error 对象上读出各个属性，设置到响应中
      ctx.body = { error };
      if (status === 422) {
        ctx.body.detail = err.errors;
      }
      ctx.status = status;
    }
  };
};
```

通过这个中间件，我们可以捕获所有异常，并按照我们想要的格式封装了响应。将这个中间件通过配置文件(config/config.default.js)加载进来：

```js
// config/config.default.js
module.exports = {
  // 加载 errorHandler 中间件
  middleware: ["errorHandler"],
  // 只对 /api 前缀的 url 路径生效
  errorHandler: {
    match: "/api"
  }
};
```
