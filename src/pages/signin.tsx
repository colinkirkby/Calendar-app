import React from "react";
import { Form, Input, Button, Checkbox, Row } from "antd";
import LandingHeader from "src/components/Header/LandingHeader";
import BlankHeader from "src/components/Header/BlankHeader";
import Link from "next/link";

export default function SignInPage() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
    // Handle the login logic here
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <BlankHeader />
      <div style={{ maxWidth: 300, margin: "auto", marginTop: 50 }}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Row justify="space-around">
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Sign In
              </Button>
            </Form.Item>
            <Link href="signup">
              <Button type="default">Sign up</Button>
            </Link>
          </Row>
        </Form>
      </div>
    </>
  );
}
