import * as assert from "assert";
const { app } = require("egg-mock/bootstrap");

describe("Mock", () => {
  it("GET /users", async () => {
    const ctx = app.mockContext();
    assert(ctx.method === "GET");
  });
});
