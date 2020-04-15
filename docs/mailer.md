---
title: 邮件
nav:
  title: Api
  path: /api
---

## 邮件

```ts
import { Service } from "egg";

const nodemailer = require("nodemailer");

/**
 * Mail Service
 */
export default class Email extends Service {
  public async send() {
    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "126",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: "chengyou126@126.com", // generated ethereal user
        pass: "GMJLBDHHEOHSYLRJ" // generated ethereal password
      }
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: '"NodeMailer 👻" <chengyou126@126.com>', // sender address
      to: "jolylai163@163.com, 2635850288@qq.com", // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>" // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Message sent: %s", info);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  }
}
```
