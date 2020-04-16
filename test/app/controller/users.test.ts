import * as assert from "assert";
const { app } = require("egg-mock/bootstrap");
const { factory } = require("factory-girl");

describe("text /app/controller/users.test.js", () => {
  // 定义用户类型
  before(() => {
    factory.define("user", app.model.User, {
      name: "Bob",
      age: 50
    });
  });

  it("GET /users", async () => {
    // 创建3条数据
    await factory.createMany("user", 3);

    const res = await app
      .httpRequest()
      .get("/api/users?limit=2")
      .expect(200);

    assert(res.body.length === 2);
    assert(res.body[0].name === "Bob");
    assert(res.body[0].age === 50);
  });

  afterEach(async () => {
    // 测试结束清空数据库
    await Promise.all([
      app.model.User.destroy({ truncate: true, force: true })
    ]);
  });
});
