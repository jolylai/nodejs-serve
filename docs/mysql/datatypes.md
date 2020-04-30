---
title: 数据类型
---

## Strings

```js
DataTypes.STRING; // VARCHAR(255)
DataTypes.STRING(1234); // VARCHAR(1234)
DataTypes.STRING.BINARY; // VARCHAR BINARY
DataTypes.TEXT; // TEXT
DataTypes.TEXT("tiny"); // TINYTEXT
DataTypes.CITEXT; // CITEXT          PostgreSQL and SQLite only.
```

## Boolean

```js
DataTypes.BOOLEAN; // TINYINT(1)
```

## Numbers

```js
DataTypes.INTEGER; // INTEGER
DataTypes.BIGINT; // BIGINT
DataTypes.BIGINT(11); // BIGINT(11)

DataTypes.FLOAT; // FLOAT
DataTypes.FLOAT(11); // FLOAT(11)
DataTypes.FLOAT(11, 10); // FLOAT(11,10)

DataTypes.DOUBLE; // DOUBLE
DataTypes.DOUBLE(11); // DOUBLE(11)
DataTypes.DOUBLE(11, 10); // DOUBLE(11,10)

DataTypes.DECIMAL; // DECIMAL
DataTypes.DECIMAL(10, 2); // DECIMAL(10,2)
```

Unsigned & Zerofill integers - MySQL/MariaDB only
In MySQL and MariaDB, the data types INTEGER, BIGINT, FLOAT and DOUBLE can be set as unsigned or zerofill (or both), as follows:

```js
DataTypes.INTEGER.UNSIGNED;
DataTypes.INTEGER.ZEROFILL;
DataTypes.INTEGER.UNSIGNED.ZEROFILL;
// You can also specify the size i.e. INTEGER(10) instead of simply INTEGER
// Same for BIGINT, FLOAT and DOUBLE
```

## Dates

```js
// DATETIME for mysql / sqlite, TIMESTAMP WITH TIME ZONE for postgres
DataTypes.DATE;
// DATETIME(6) for mysql 5.6.4+. Fractional seconds support with up to 6 digits of precision
DataTypes.DATE(6);
// DATE without time
DataTypes.DATEONLY;
```

## UUIDs

For UUIDs, use DataTypes.UUID. It becomes the UUID data type for PostgreSQL and SQLite, and CHAR(36) for MySQL. Sequelize can generate UUIDs automatically for these fields, simply use Sequelize.UUIDV1 or Sequelize.UUIDV4 as the default value:

```
{
  type: DataTypes.UUID,
  defaultValue: Sequelize.UUIDV4 // Or Sequelize.UUIDV1
}
```
