import React from "react";
import { Form, Input, Button, Card } from "antd";

function EmailSubscribe() {
  const handleSubscrib = values => {
    fetch("/api/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: email })
    })
      .then(r => r.json())
      .then(data => {
        resolve(data);
      });
  };

  return (
    <Card>
      <Form onFinish={handleSubscrib}>
        <Form.Item
          name="email"
          validateTrigger="onBlur"
          rules={[
            { required: true, message: "请输入邮箱！" },
            { type: "email", message: "请输入正确的邮箱!" }
          ]}
          extra={`已有1000 人订阅`}
        >
          <Input.Search
            style={{ width: 300 }}
            placeholder="邮箱"
            enterButton={
              <Button type="primary" htmlType="submit">
                订阅
              </Button>
            }
          />
        </Form.Item>
      </Form>
    </Card>
  );
}

export default EmailSubscribe;
