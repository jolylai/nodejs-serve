---
title: Modal
---

## Modal

```js
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define("user", {
    id: {
      // 数据类型
      type: INTEGER,
      // 主键
      primaryKey: true,
      // 自增
      autoIncrement: true,
      // 唯一值
      unique: true,
      // 不能为null
      allowNull: true
    },

    // Creating two objects with the same value will throw an error. The unique property can be either a
    // boolean, or a string. If you provide the same string for multiple columns, they will form a
    // composite unique key.
    uniqueOne: { type: DataTypes.STRING, unique: "compositeIndex" },

    // field 自定义数据库表中的 Column 名称
    fieldWithUnderscores: {
      type: DataTypes.STRING,
      field: "field_with_underscores"
    },

    // It is possible to create foreign keys:
    bar_id: {
      type: DataTypes.INTEGER,

      references: {
        // This is a reference to another model
        model: Bar,

        // This is the column name of the referenced model
        key: "id",

        // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
        deferrable: Deferrable.INITIALLY_IMMEDIATE
        // Options:
        // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
        // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
        // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
      }
    },

    // Comments can only be added to columns in MySQL, MariaDB, PostgreSQL and MSSQL
    commentMe: {
      type: DataTypes.INTEGER,
      comment: "This is a column name that has a comment"
    }
  });

  return User;
};
```

## 查询方法

### findAll

```js
const user = await this.ctx.modal.User.findAll();
if (project === null) {
  console.log("Not found!");
} else {
  console.log(project instanceof Project); // true
  // Its primary key is 123
}
```

### findByPk

根据主键查询

```js
const project = await Project.findByPk(123);
if (project === null) {
  console.log("Not found!");
} else {
  console.log(project instanceof Project); // true
  // Its primary key is 123
}
```

### findOne

获取符合条件的第一条数据

```js
const user = await this.ctx.User.findOne({ where: { title: "My Title" } });
```

### findOrCreate

根据查询条件，如果有查询到则返回查询到的结果，如果没有则根据 defaults 参数创建一条并返回新建的结果

```js
const [user, created] = await User.findOrCreate({
  where: { username: "sdepold" },
  defaults: {
    job: "Technical Lead JavaScript"
  }
});

// The boolean indicating whether this instance was just created
if (created) {
  // 新建数据
  console.log(user.job); // This will certainly be 'Technical Lead JavaScript'
} else {
  // 已存在的数据
}
```

### findAndCountAll

`findAndCountAll`方法是 `findAdd` 和`count` 两个方法的结合，在你使用 `limit` 和 `offset` 去分页查询，并且你需要知道查询到总条数

`findAndCountAll` 返回 `{ count: number, rows: array}`

- count - an integer - the total number records matching the query

- rows - an array of objects - the obtained records

```js
const { count, rows } = await this.ctx.modal.User.findAndCountAll({
  where: {
    title: {
      [Op.like]: "foo%"
    }
  },
  offset: 10,
  limit: 2
});
console.log(count);
console.log(rows);
```
