---
title: 查询
---

## 逻辑查询

### AND

获取用户名称为 tom 且 年龄为 16 的用户

```sql
SELECT * FROM user Where 'name'='tom' AND  'age'=16
```

```js
// 推荐
const users = await User.findAll({
  where: {
    name: "tom",
    age: 16
  }
});

const users = await User.findAll({
  where: {
    [Op.and]: [{ authorId: 12 }, { status: "active" }]
  }
});
```

### OR

获取用户名称为 tom 或者 年龄为 16 的用户

```sql
SELECT * FROM user Where 'name'='tom' OR  'age'=16
```

```js
const { Op } = require("sequelize");

const users = await User.findAll({
  where: {
    [Op.or]: [{ name: "tom" }, { age: 16 }]
  }
});
```

获取年龄为 16 或者 18 的用户

```sql
SELECT * FROM user Where 'age'=18' OR  'age'=16
```

```js
const { Op } = require("sequelize");

const users = await User.findAll({
  where: {
    age: {
      [Op.or]: [16, 18]
    }
  }
});
```

### NOT

## 条件查询

### 等于

获取用户名称为 tom 的用户

```sql
SELECT * FROM user Where 'name'= 'tom'
```

```js
// 推荐
const users = await User.findAll({
  where: {
    name: "tom"
  }
});

const { Op } = require("sequelize");
const users = await User.findAll({
  where: {
    name: {
      [Op.eq]: "tom"
    }
  }
});
```

### 不等于

获取用户名称不为 tom 的用户

```sql
SELECT * FROM user Where 'name' != 'tom'
```

```js
const { Op } = require("sequelize");

const users = await User.findAll({
  where: {
    name: {
      [Op.ne]: "tom"
    }
  }
});
```

### 大于

获取年龄大于 16 的用户

```sql
SELECT * FROM user Where 'age'  > 16
```

```js
const { Op } = require("sequelize");

const users = await User.findAll({
  where: {
    age: {
      [Op.gt]: "tom"
    }
  }
});
```

### 大于等于

获取年龄大于等于 16 的用户

```sql
SELECT * FROM user Where 'age'  >= 16
```

```js
const { Op } = require("sequelize");
const users = await User.findAll({
  where: {
    age: {
      [Op.gte]: "tom"
    }
  }
});
```

### 小于

获取年龄小于 16 的用户

```sql
SELECT * FROM user Where 'age'  < 16
```

```js
const { Op } = require("sequelize");
const users = await User.findAll({
  where: {
    age: {
      [Op.lt]: "tom"
    }
  }
});
```

### 小于等于

获取年龄小于等于 16 的用户

```sql
SELECT * FROM user Where 'age'  >= 16
```

```js
const { Op } = require("sequelize");
const users = await User.findAll({
  where: {
    age: {
      [Op.lte]: "tom"
    }
  }
});
```

## 模糊查询

## 聚汇查询

## 返回字段

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

## 排序

## 分组

## 分页

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

> [sequelize](https://sequelize.org/master/manual/model-querying-basics.html)
