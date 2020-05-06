---
title: Resful API
nav:
  title: 指南
  order: 1
---

## 响应码

在 RESTful 风格的设计中，我们会通过响应状态码来标识响应的状态，保持响应的 body 简洁，只返回接口数据。

```js
const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。"
};
```

## 查询

- `GET /api/v2/topics`
- 响应状态码：`200`
- 响应体：

```json
[
  {
    "id": "57ea257b3670ca3f44c5beb6",
    "author_id": "541bf9b9ad60405c1f151a03",
    "tab": "share",
    "content": "content",
    "last_reply_at": "2017-01-11T13:32:25.089Z",
    "good": false,
    "top": true,
    "reply_count": 155,
    "visit_count": 28176,
    "create_at": "2016-09-27T07:53:31.872Z"
  },
  {
    "id": "57ea257b3670ca3f44c5beb6",
    "author_id": "541bf9b9ad60405c1f151a03",
    "tab": "share",
    "content": "content",
    "title": "《一起学 Node.js》彻底重写完毕",
    "last_reply_at": "2017-01-11T10:20:56.496Z",
    "good": false,
    "top": true,
    "reply_count": 193,
    "visit_count": 47633
  }
]
```

## 创建

- `POST /api/v2/topics`
- 响应状态码：`201`
- 响应体：

```json
{
  "topic_id": "57ea257b3670ca3f44c5beb6"
}
```

## 更新

- `PUT /api/v2/topics/57ea257b3670ca3f44c5beb6`
- 响应状态码：`201`
- 响应体：空

## 删除

- `DELETE /api/v2/topics/57ea257b3670ca3f44c5beb6`
- 响应状态码：`204`
- 响应体：空

## 错误处理

在接口处理发生错误的时候，如果是客户端请求参数导致的错误，我们会返回 `4xx` 状态码，如果是服务端自身的处理逻辑错误，我们会返回 `5xx` 状态码。所有的异常对象都是对这个异常状态的描述，其中 error 字段是错误的描述，detail 字段（可选）是导致错误的详细原因。

例如，当客户端传递的参数异常时，我们可能返回一个响应，状态码为 422，返回响应体为：

```json
{
  "error": "Validation Failed",
  "detail": [
    { "message": "required", "field": "title", "code": "missing_field" }
  ]
}
```
