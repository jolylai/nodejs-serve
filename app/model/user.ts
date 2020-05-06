module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define("user", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    email: {
      type: STRING(30),
      unique: true
    },
    mobile: STRING(30),
    password: STRING
  });

  // User.sync({ force: true });

  return User;
};
