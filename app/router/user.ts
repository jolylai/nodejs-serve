"use strict";
import { Application } from "egg";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app: Application) => {
  const { controller, router } = app;

  //   const tokenRequired = middleware.tokenRequired();
  //   const pagination = middleware.pagination();

  router.get("/api/user", controller.user.index);
  router.get("/api/user/:id", controller.user.show);

  router.post("/api/user", controller.user.create);

  // 登录
  router.post("/api/user/login", controller.login.index);
  router.post("/api/user/register", controller.login.register);
};
