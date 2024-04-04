import React, { useState } from "react";
import { Form, Input, Button, Radio } from "antd";
import BlankHeader from "src/components/Header/BlankHeader";

export default function SignUpPage() {
  const onFinish = (values: any) => {
    console.log("Received values of form:", values);
    // Here you will handle the submission, probably sending the data to your backend server
  };

  return (
    <>
      <BlankHeader />

      <div style={{ maxWidth: 400, margin: "auto", marginTop: 50 }}>
        <Form name="user_signup" onFinish={onFinish} scrollToFirstError>
          <Form.Item
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email"
              }
            ]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item
            name="companyCode"
            rules={[
              { required: true, message: "Please input your company code!" }
            ]}
          >
            <Input placeholder="Company Code" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
