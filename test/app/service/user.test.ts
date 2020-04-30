import * as assert from "assert";
import { app } from "egg-mock/bootstrap";

describe("service /app/service/user", () => {
  // 根据用户id查询用户
  it.only("should getUserById work", async () => {
    const ctx = app.mockContext();
    const result = await ctx.service.user.getUserById(1);
    assert(result.id === 1);
  });

  //
});
