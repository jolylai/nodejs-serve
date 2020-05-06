---
title: 控制器
nav:
  title: 指南
  order: 1
---

简单的说 `Controller` 负责解析用户的输入，处理后返回相应的结果

框架推荐 `Controller` 层主要对用户的请求参数进行处理（校验、转换），然后调用对应的 `service` 方法处理业务，得到业务结果后封装并返回：

- 获取用户通过 HTTP 传递过来的请求参数。
- 校验、组装参数。
- 调用 `Service` 进行业务处理，必要时处理转换 `Service` 的返回结果，让它适应用户的需求。
- 通过 HTTP 将结果响应给用户。

## Controller

定义的 `Controller` 类，会在每一个请求访问到 server 时实例化一个全新的对象，而项目中的 Controller 类继承于 egg.Controller，会有下面几个属性挂在 this 上。

- `this.ctx`: 当前请求的上下文 Context 对象的实例，通过它我们可以拿到框架封装好的处理当前请求的各种便捷属性和方法。
- `this.app`: 当前应用 Application 对象的实例，通过它我们可以拿到框架提供的全局对象和方法。
- `this.service`: 应用定义的 Service，通过它我们可以访问到抽象出的业务层，等价于 this.ctx.service 。
- `this.config`: 应用运行时的配置项。
- `this.logger`: logger 对象，上面有四个方法（debug，info，warn，error），分别代表打印四个不同级别的日志，使用方法和效果与 context logger 中介绍的一样，但是通过这个 logger 对象记录的日志，在日志前面会加上打印该日志的文件路径，以便快速定位日志打印位置。

## 请求参数

### Router params

在 Router 中，我们介绍了 Router 上也可以申明参数，这些参数都可以通过 `ctx.params` 获取到。

```js
// router.get('/user/:id', 'controller.user.show');
// GET /user/1
class UserController extends Controller {
  async show() {
    console.log(this.ctx.params.id); // 1
  }
}
```

### query

在 URL 中 ? 后面的部分是一个 Query String，这一部分经常用于 GET 类型的请求中传递参数。例如 `GET /user?current=1&pageSize=10` 中 `current=1&pageSize=10` 就是用户传递过来的参数。我们可以通过 `ctx.query` 拿到解析过后的这个参数体

```js
class UserController extends Controller {
  async index() {
    const query = this.ctx.query;
    // {
    //   current: '1',
    //   pageSize: '10',
    // }
  }
```

从 ctx.query 上获取的参数一旦存在，一定是字符串类型。

**queries**

有时候我们的系统会设计成让用户传递相同的 key，例如 `GET /user?category=egg&id=1&id=2&id=3`。针对此类情况，框架提供了 `ctx.queries` 对象，这个对象也解析了 `Query String`，但是它不会丢弃任何一个重复的数据，而是将他们都放到一个数组中：

```js
// GET /user?category=egg&id=1&id=2&id=3
class UserController extends Controller {
  async index() {
    console.log(this.ctx.queries);
    // {
    //   category: [ 'egg' ],
    //   id: [ '1', '2', '3' ],
    // }
  }
}
```

ctx.queries 上所有的 key 如果有值，也一定会是数组类型。

### body

一般请求中有 body 的时候，客户端（浏览器）会同时发送 `Content-Type` 告诉服务端这次请求的 body 是什么格式的。Web 开发中数据传递最常用的两类格式分别是 `JSON` 和 `Form`。

```js
class UserController extends Controller {
  async index() {
    const body = this.ctx.request.body;
  }
```

框架内置了 bodyParser 中间件来对这两类格式的请求 body 解析成 object 挂载到 ctx.request.body 上。框架对 bodyParser 设置了一些默认参数，配置好之后拥有以下特性：

- 当请求的 `Content-Type` 为 `application/json`，`application/json-patch+json`，`application/vnd.api+json` 和 `application/csp-report` 时，会按照 json 格式对请求 body 进行解析，并限制 body 最大长度为 100kb。
- 当请求的 `Content-Type` 为 `application/x-www-form-urlencoded` 时，会按照 form 格式对请求 body 进行解析，并限制 body 最大长度为 100kb。
- 如果解析成功，body 一定会是一个 Object（可能是一个数组）。
