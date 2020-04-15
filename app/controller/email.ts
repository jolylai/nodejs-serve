import { Controller } from "egg";

export default class EmailController extends Controller {
  public async index() {
    const { ctx } = this;
    try {
      const info = await ctx.service.email.send({
        service: "126",
        port: 465,
        secure: true,
        auth: {
          user: "chengyou126@126.com",
          pass: "GMJLBDHHEOHSYLRJ"
        },
        from: '"NodeMailer 👻" <chengyou126@126.com>',
        to: "jolylai163@163.com, 2635850288@qq.com",
        subject: "Hello ✔",
        text: "Hello world? text"
        // html: "<b>Hello world?  HTML</b>"
      });
      ctx.body = {
        status: true,
        body: info.messageId
      };
    } catch (error) {
      ctx.body = {
        status: false,
        body: error
      };
    }
  }
}
