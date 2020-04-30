module.exports = app => {
  const { STRING, INTEGER, ENUM } = app.Sequelize;

  const User = app.model.define("user", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING(30),
    email: STRING(30),
    mobile: STRING(30),
    address: STRING(30),
    gender: ENUM("femel", "male", "secrecy"),
    age: { type: INTEGER }
  });

  // User.sync({ force: true });

  return User;
};
