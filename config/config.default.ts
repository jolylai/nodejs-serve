import { EggAppConfig, EggAppInfo, PowerPartial } from "egg";

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_1585530613192_9267";

  // add your egg config in here
  config.middleware = [];

  config.security = {
    domainWhiteList: ["*"],
    csrf: {
      enable: false
    }
  };

  config.cors = {
    credentials: true,
    origin: ctx => ctx.get("origin"),
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS"
  };

  config.sequelize = {
    dialect: "mysql",
    host: "106.12.140.131",
    port: 3306,
    username: "root",
    password: "123456",
    database: "dev",
    // 是否自动进行下划线转换（这里是因为DB默认的命名规则是下划线方式，而我们使用的大多数是驼峰方式）
    // underscored: true,
    // 时区，sequelize有很多自动时间的方法，都是和时区相关的，记得设置成东8区（+08:00）
    timezone: "+08:00"
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
