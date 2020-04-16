---
title: 邮件
---

## 订阅

<code src="./demo/EmailSubscribe" inline />

## 邮箱配置

开启邮箱 `IMAP/SMTP服务`, 获取授权码， 这里用 126 邮箱为例
![](https://cy-picgo.oss-cn-hangzhou.aliyuncs.com/IMAP_126.jpg)

## 安装

> [Node Mailer](https://nodemailer.com/about/)

```bash
yarn add nodemailer
```

```ts
"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "126",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      // 邮箱账号
      user: testAccount.user,
      // 授权码
      pass: testAccount.pass
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
```
