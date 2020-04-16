---
title: 测试
nav:
  title: 指南
  order: 1
---

## 目录结构

约定 `test` 目录为存放所有测试脚本的目录，测试所使用到的 `fixtures` 和相关辅助脚本都应该放在此目录下。

测试脚本文件统一按 `${filename}.test.js` 命名，必须以 `.test.js` 作为文件后缀。

```
test
├── controller
│   └── users.test.js
├── users.test.js
└── service
    └── user.test.js
```

## 执行顺序

Mocha 使用 before/after/beforeEach/afterEach 来处理前置后置任务，基本能处理所有问题。 每个用例会按 before -> beforeEach -> it -> afterEach -> after 的顺序执行，而且可以定义多个。

```js
describe("egg test", () => {
  before(() => console.log("order 1"));
  //   可以定义多个
  before(() => console.log("order 2"));
  beforeEach(() => console.log("order 3"));
  it("should worker", () => console.log("order 4"));
  afterEach(() => console.log("order 5"));
  after(() => console.log("order 6"));
});
```

## Mock
