import { Controller } from "egg";
const jwt = require("jsonwebtoken");

export interface LoginParams {
  email: string;
  password: string;
}

const loginValidateRule = {
  username: { type: "string", require: true },
  password: { type: "string", require: true }
};

export default class LoginController extends Controller {
  public async index() {
    const { ctx } = this;

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

    const token = jwt.sign(user, "privateKey");

    ctx.body = {
      user,
      token
    };
  }

  /**
   * 注册
   */
  async register() {}
}
