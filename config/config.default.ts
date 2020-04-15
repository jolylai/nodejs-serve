import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1585530613192_9267";

  // add your egg config in here
  config.middleware = [];

  // config.security = {
  //   csrf: {
  //     ignoreJSON: true, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
  //   },
  // };

  config.sequelize = {
    dialect: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: "root",
    password: "123456",
    database: "dev"
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig
  };
};
