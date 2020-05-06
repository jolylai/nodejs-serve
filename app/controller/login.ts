import { Controller } from "egg";
const jwt = require("jsonwebtoken");

export default class LoginController extends Controller {
  public async index() {
    const { ctx, app } = this;
    const { Sequelize } = app;

    // 如果参数校验未通过，将会抛出一个 status = 422 的异常

    const validateRule = {
      account: { type: "string", require: true },
      password: { type: "string", require: true }
    };

    ctx.validate(validateRule, ctx.request.body);

    const { account, password } = ctx.request.body;

    // 效验用户密码是否正确
    const user = await ctx.model.User.findOne({
      where: {
        [Sequelize.Op.or]: [
          { name: account },
          { email: account },
          { mobile: account }
        ],
        password
      }
    });

    // 如果查不到这个用户则表明用户名或者密码错误
    if (user == null) {
      ctx.body = {
        message: "用户名或密码错误"
      };
      ctx.status = 401;
      return;
    }

    // 如果用户名密码正确，则生成token
    const token = jwt.sign(user.dataValues, "privateKey");

    // 将token存储在客户端的 cookie 中
    // https://eggjs.org/zh-cn/core/cookie-and-session.html
    this.ctx.cookies.set("node-server", token, {
      maxAge: 1000 * 60 // 设置 cookie 过期时间
    });

    ctx.body = null;
  }

  /**
   * 注册
   */
  async register() {
    const { ctx } = this;

    const validateRule = {
      email: { type: "email", require: true },
      password: { type: "string", require: true }
    };

    // 如果参数校验未通过，将会抛出一个 status = 422 的异常
    ctx.validate(validateRule, ctx.request.body);

    const { email, password } = ctx.request.body;

    // 新建用户
    const user = await ctx.model.User.create({ email, password });

    ctx.body = {
      user
    };
  }
}
