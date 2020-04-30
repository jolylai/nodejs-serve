import React from "react";
import { UserOutlined, LockOutlined, GithubOutlined } from "@ant-design/icons";
import { Form, Input, Checkbox, Button } from "antd";
import { useRequest } from "@umijs/hooks";

function Login() {
  const { run } = useRequest(
    data => ({
      url: "http://127.0.0.1:7001/api/user/login",
      method: "post",
      data
    }),
    {
      manual: true
    }
  );

  const onFinish = values => {
    console.log("Success:", values);
    run(values);
  };

  return (
    <Form
      style={{ width: 368 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        // rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name="password"
        // rules={[{ required: true, message: "Please input your Password!" }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
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
        <Button type="primary" htmlType="submit" block>
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
