import * as assert from "assert";
const { app } = require("egg-mock/bootstrap");

describe("Mock", () => {
  it.only("GET /users", async () => {
    const ctx = app.mockContext();
    console.log("ctx: ", ctx.service);
    assert(ctx.method === "GET");
  });
});
