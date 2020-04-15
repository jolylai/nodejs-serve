import { Controller } from 'egg';
const jwt = require('jsonwebtoken');

export interface LoginParams {
  email: string;
  password: string;
}

export default class LoginController extends Controller {
  public async index() {
    const { ctx, app } = this;
    console.log('mysql', app);
    // const params: LoginParams = ctx.request.body;

    const user = { id: 1, name: 'Tony' };
    const token = jwt.sign(user, 'privateKey');

    ctx.body = {
      status: true,
      message: 'success',
      body: token,
    };
  }
}
