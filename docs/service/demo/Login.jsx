import React from "react";
import { UserOutlined, LockOutlined, GithubOutlined } from "@ant-design/icons";
import { Form, Input, Checkbox, Button } from "antd";
import md5 from "blueimp-md5";
import { useRequest } from "@umijs/hooks";

function Login() {
  const { run, loading } = useRequest(
    data => ({
      url: "http://127.0.0.1:7001/api/user/login",
      method: "post",
      data,
      credentials: "include"
    }),
    {
      manual: true
    }
  );

  const onFinish = values => {
    if (values.password) {
      values.password = md5(values.password);
    }
    run(values);
  };

  return (
    <Form
      style={{ width: 368 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="account"
        rules={[{ required: true, message: "请输入账号!" }]}
      >
        <Input prefix={<UserOutlined />} placeholder="用户名/邮箱/手机号" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入密码!" }]}
      >
        <Input prefix={<LockOutlined />} type="password" placeholder="密码" />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>自动登录</Checkbox>
        </Form.Item>

        <a style={{ float: "right" }} href="">
          忘记密码
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          登录
        </Button>
      </Form.Item>

      <Form.Item>
        <span>其他登录方式</span>
        <GithubOutlined />
        <a href="" style={{ float: "right" }}>
          注册
        </a>
      </Form.Item>
    </Form>
  );
}

export default Login;
