---
title: 登录
---

## 登录

<code src="./demo/Login" inline />

## 密码安全

如果客户端将密码明文传送给服务器，这样可能会被监听获取密码

出于安全考虑，客户端不能明文传送用户密码，而且也不能明文存储到数据，

安装 [blueimp-md5](https://github.com/blueimp/JavaScript-MD5)

```bash
yarn add blueimp-md5
```

对密码进行哈希计算

```js
import md5 from "blueimp-md5";

const hash = md5("value"); // "2063c1608d6e0baf80249c42e2be5804"
```

## JWT

> [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken)

安装

```shell
yarn add jsonwebtoken
```

使用

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

## 服务端

> [CORS 跨域 Cookie 的设置与获取](https://www.jianshu.com/p/13d53acc124f)

客户端请求需要开启 `credentials: "include"`, 不然服务设置客户端 cookie 没有效果

```js
import { Controller } from "egg";
const jwt = require("jsonwebtoken");

const loginValidateRule = {
  username: { type: "string", require: true },
  password: { type: "string", require: true }
};

export default class LoginController extends Controller {
  async index() {
    const { ctx } = this;

    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(loginValidateRule, ctx.request.body);

    const { username, password } = ctx.request.body;

    // 效验用户密码是否正确
    const user = await ctx.model.User.findOne({
      where: { name: username, password }
    });

    // 如果查不到这个用户则表明用户名或者密码错误
    if (user == null) {
      ctx.body = {
        message: "用户名或密码错误"
      };
      ctx.status = 401;
      return;
    }

    // 如果用户名密码正确，则生成token
    const token = jwt.sign(user.dataValues, "privateKey");

    // 将token存储在客户端的 cookie 中
    // https://eggjs.org/zh-cn/core/cookie-and-session.html
    this.ctx.cookies.set("node-server", token, {
      httpOnly: true // 默认就是 true
      encrypt: true // 加密传输
    });

    ctx.body = {
      user
    };
  }
}
```
