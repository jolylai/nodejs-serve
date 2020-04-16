---
title: 登录
---

## JWT

> [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

```shell
yarn add jsonwebtoken
```

```ts
const jwt = require("jsonwebtoken");

// 加密  同步
const token = jwt.sign({ foo: "bar" }, "shhhhh");

// 加密 异步
jwt.sign({ foo: "bar" }, privateKey, function(err, token) {
  console.log(token);
});

// 同步
// 验证 token
var decoded = jwt.verify(token, "shhhhh");
console.log(decoded.foo); // bar

// 异步
// 验证 token
jwt.verify(token, "shhhhh", function(err, decoded) {
  console.log(decoded.foo); // bar
});
```
