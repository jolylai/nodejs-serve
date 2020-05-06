// app/controller/users.js
const Controller = require("egg").Controller;

function toInt(str) {
  if (typeof str === "number") return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

const loginValidateRule = {
  username: { type: "string", require: true },
  password: { type: "string", require: true }
};

// 新建用户参数效验
const createValidataRule = {
  name: { type: "string", require: true },
  email: { type: "string", require: true },
  mobile: { type: "string", require: true },
  age: { type: "string", require: true },
  gender: { type: "string", require: true }
};

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;

    this.ctx.cookies.set("cooooo", "111");

    const { current = 1, pageSize = 10, name, email } = ctx.query;

    // 查询参数
    const queryParams: { name?: string; email?: string } = {};

    if (name) {
      queryParams.name = name;
    }

    if (email) {
      queryParams.email = email;
    }

    const query = {
      limit: toInt(pageSize),
      offset: toInt((current - 1) * pageSize),
      where: queryParams
    };

    const { rows, count } = await ctx.model.User.findAndCountAll(query);

    ctx.body = {
      list: rows,
      total: count
    };
  }

  async show() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.user.getUserById(toInt(ctx.params.id));
  }

  async create() {
    const ctx = this.ctx;

    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(createValidataRule, ctx.request.body);

    const user = await ctx.model.User.create(ctx.request.body);

    ctx.status = 201;
    ctx.body = user;
  }

  async update() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    const { name, age } = ctx.request.body;
    await user.update({ name, age });
    ctx.body = user;
  }

  async destroy() {
    const ctx = this.ctx;
    const id = toInt(ctx.params.id);
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }

    await user.destroy();
    ctx.status = 200;
  }
}

module.exports = UserController;
