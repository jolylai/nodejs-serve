import { Application } from "egg";

export default (app: Application) => {
  // const { controller, router } = app;

  require("./router/user")(app);
  // require('./router/api')(app);
};
