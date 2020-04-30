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

class UserController extends Controller {
  async index() {
    const ctx = this.ctx;
    // const { Sequelize } = this.app;

    const { current = 1, pageSize = 10, ...restParams } = ctx.query;

    const query = {
      limit: toInt(pageSize),
      offset: toInt((current - 1) * pageSize),
      where: restParams
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
    const { name, age } = ctx.request.body;
    const user = await ctx.model.User.create({ name, age });
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

  /**
   *  登录
   */

  async login() {
    const ctx = this.ctx;
    // 校验 `ctx.request.body` 是否符合我们预期的格式
    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(loginValidateRule, ctx.request.body);

    const user = await ctx.model.User.findOne({
      where: { name: ctx.request.body.username }
    });

    if (user == null) {
      ctx.body = {
        status: false,
        message: "用户名或密码错误"
      };
      ctx.status = 401;
      return;
    }
    ctx.body = { user };
  }
}

module.exports = UserController;
