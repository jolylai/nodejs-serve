---
title: 用户
---

## 用户列表

<code src="./demo/UserTable.jsx" />

## API

### 查询

分页查询

`GET /api/user?current=1&pageSize=10`

响应码： 200

```json
{
  "list": [],
  "total": 12
}
```

单个用户查询

`GET /api/user/:id`

响应码： 200

```json
{
  "id": 1,
  "name": jack
}
```

### 新增

`POST /api/user`

响应码：201

### 更新

`PUT /api/user`

响应码：201

### 删除

`DELETE /api/user/:id`

响应码：204
