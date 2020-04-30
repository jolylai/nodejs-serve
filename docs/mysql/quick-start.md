---
title: 快速开始
order: 1
---

## Docker

使用 docker 起一个本地数据库用于测试

```shell
# 从远程仓库拉取MySQL镜像
$ docker pull mysql

# 创建 MySQL 容器
# $ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
# 设置 root 用户密码为 123456
$ docker run --name docker-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=123456 -d mysql

# 设置挂载点数据持久化
# $ docker run --name some-mysql -v /my/own/datadir:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag
$ docker run --name docker-mysql -d -v /var/lib/mysql:/var/lib/mysql -p 3306:3306 -e MYSQL_ALLOW_EMPTY_PASSWORD=yes mysql:5.6.43
```

## 配置

> [sequelize](https://eggjs.org/zh-cn/tutorials/sequelize.html)

## 学习资源

- [mysqltutorial](https://www.mysqltutorial.org/)
