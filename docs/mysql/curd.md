---
title: 增删改查
---

## 新增

新增一条数据

```js
// Create a new user
const jane = await User.create({ firstName: "Jane", lastName: "Doe" });
console.log("Jane's auto-generated ID:", jane.id);
```

新增多条数据

`bulkCreate` 默认不开启对创建数据的效验（create 默认开启），需要效验的话需要传入 `validate: true` 配置手动开启

```js
const captains = await User.bulkCreate(
  [{ name: "Jack Sparrow" }, { name: "Davy Jones" }],
  { validate: true }
);
console.log(captains.length); // 2
console.log(captains[0] instanceof Captain); // true
console.log(captains[0].name); // 'Jack Sparrow'
console.log(captains[0].id); // 1 // (or another auto-generated value)
```

## 查询

### findAll

查询所有的数据

```sql
SELECT * FROM user
```

```js
// Find all users
const users = await User.findAll();
console.log(users.every(user => user instanceof User)); // true
console.log("All users:", JSON.stringify(users, null, 2));
```

指定返回的字段

```sql
SELECT foo, bar FROM ...
```

```js
// 指定需要的字段
User.findAll({
  attributes: ["foo", "bar"]
});

// 指定不需要的字段
User.findAll({
  attributes: { exclude: ["baz"] }
});
```

使用嵌套数值重命名属性名

```sql
SELECT foo, bar AS baz, qux FROM ...
```

```js
User.findAll({
  attributes: ["foo", ["bar", "baz"], "qux"]
});
```

聚汇查询

```sql
SELECT foo, COUNT(hats) AS n_hats, bar FROM ...
```

```js
User.findAll({
  attributes: [
    'foo',
    [sequelize.fn('COUNT', sequelize.col('hats')), 'n_hats']
    'bar'
  ]
});
```

```sql
SELECT id, foo, bar, baz, qux, hats, COUNT(hats) AS n_hats FROM ...
```

```js
// This is a tiresome way of getting the number of hats (along with every column)
Model.findAll({
  attributes: [
    "id",
    "foo",
    "bar",
    "baz",
    "qux",
    "hats", // We had to list all attributes...
    [sequelize.fn("COUNT", sequelize.col("hats")), "n_hats"] // To add the aggregation...
  ]
});

// This is shorter, and less error prone because it still works if you add / remove attributes from your model later
Model.findAll({
  attributes: {
    include: [[sequelize.fn("COUNT", sequelize.col("hats")), "n_hats"]]
  }
});
```

### 条件查询

```sql
SELECT * FROM post WHERE authorId = 2
```

```js
User.findAll({
  where: {
    authorId: 2
  }
});

const { Op } = require("sequelize");
Post.findAll({
  where: {
    authorId: {
      [Op.eq]: 2
    }
  }
});
```

```sql
SELECT * FROM post WHERE authorId = 12 AND status = 'active';
```

```js
User.findAll({
  where: {
    authorId: 12
    status: 'active'
  }
});

const { Op } = require("sequelize");
Post.findAll({
  where: {
    [Op.and]: [
      { authorId: 12 },
      { status: 'active' }
    ]
  }
});
```

```js
const { Op } = require("sequelize");

User.findAll({
  where: {
    [Op.and]: [{ a: 5 }, { b: 6 }], // (a = 5) AND (b = 6)
    [Op.or]: [{ a: 5 }, { b: 6 }], // (a = 5) OR (b = 6)
    someAttribute: {
      // Basics
      [Op.eq]: 3, // = 3
      [Op.ne]: 20, // != 20
      [Op.is]: null, // IS NULL
      [Op.not]: true, // IS NOT TRUE
      [Op.or]: [5, 6], // (someAttribute = 5) OR (someAttribute = 6)

      // Using dialect specific column identifiers (PG in the following example):
      [Op.col]: "user.organization_id", // = "user"."organization_id"

      // Number comparisons
      [Op.gt]: 6, // > 6
      [Op.gte]: 6, // >= 6
      [Op.lt]: 10, // < 10
      [Op.lte]: 10, // <= 10
      [Op.between]: [6, 10], // BETWEEN 6 AND 10
      [Op.notBetween]: [11, 15], // NOT BETWEEN 11 AND 15

      // Other operators

      [Op.all]: sequelize.literal("SELECT 1"), // > ALL (SELECT 1)

      [Op.in]: [1, 2], // IN [1, 2]
      [Op.notIn]: [1, 2], // NOT IN [1, 2]

      [Op.like]: "%hat", // LIKE '%hat'
      [Op.notLike]: "%hat", // NOT LIKE '%hat'
      [Op.startsWith]: "hat", // LIKE 'hat%'
      [Op.endsWith]: "hat", // LIKE '%hat'
      [Op.substring]: "hat", // LIKE '%hat%'
      [Op.iLike]: "%hat", // ILIKE '%hat' (case insensitive) (PG only)
      [Op.notILike]: "%hat", // NOT ILIKE '%hat'  (PG only)
      [Op.regexp]: "^[h|a|t]", // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
      [Op.notRegexp]: "^[h|a|t]", // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
      [Op.iRegexp]: "^[h|a|t]", // ~* '^[h|a|t]' (PG only)
      [Op.notIRegexp]: "^[h|a|t]", // !~* '^[h|a|t]' (PG only)

      [Op.any]: [2, 3], // ANY ARRAY[2, 3]::INTEGER (PG only)

      // In Postgres, Op.like/Op.iLike/Op.notLike can be combined to Op.any:
      [Op.like]: { [Op.any]: ["cat", "hat"] } // LIKE ANY ARRAY['cat', 'hat']

      // There are more postgres-only range operators, see below
    }
  }
});
```

## 更新

```js
// Change everyone without a last name to "Doe"
await User.update(
  { lastName: "Doe" },
  {
    where: {
      lastName: null
    }
  }
);
```

## 删除

```js
// Change everyone without a last name to "Doe"
await User.update(
  { lastName: "Doe" },
  {
    where: {
      lastName: null
    }
  }
);
```
