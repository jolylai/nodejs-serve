import { EggPlugin } from "egg";

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  cors: {
    enable: true,
    package: "egg-cors"
  },
  // mysql: {
  //   enable: true,
  //   package: 'egg-mysql',
  // },

  validate: {
    enable: true,
    package: "egg-validate"
  },
  sequelize: {
    enable: true,
    package: "egg-sequelize"
  }
};

export default plugin;
