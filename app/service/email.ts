import { Service } from "egg";

const nodemailer = require("nodemailer");

interface NodeMailerOpts {
  // 发送者的邮箱厂商，支持列表：https://nodemailer.com/smtp/well-known/
  service: string;
  // SMTP 端口
  port: number;
  // SSL安全链接 true for 465, false for other ports
  secure?: boolean;
  auth: {
    //   发送者账号
    user: string;
    //smtp授权码 不是账号密码，到邮箱设置下获取
    pass: string;
  };
  // 发送者昵称和地址 eg: '"NodeMailer 👻" <chengyou126@126.com>'
  from: string; // sender address
  // 接收者的邮箱地址，多个邮箱地址用逗号隔开
  // eg: "123@163.com, 123@qq.com"
  to: string;
  // 邮件主题
  subject: string;
  // 邮件内容 纯文本
  text?: string;
  // 邮件内容 html
  html?: string;
}

/**
 * Mail Service
 */
export default class Email extends Service {
  public async send(opts: NodeMailerOpts) {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: opts.service,
      port: opts.port,
      secure: opts.secure, // true for 465, false for other ports
      auth: {
        user: opts.auth.user, // generated ethereal user
        pass: opts.auth.pass // generated ethereal password
      }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: opts.from, // sender address
      to: opts.to, // list of receivers
      subject: opts.subject, // Subject line
      text: opts.text, // plain text body
      html: opts.html // html body
    });

    return info;
  }
}
