import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { Form, Input, Button, Row, Col, Alert, Space } from "antd";
const { Item } = Form;

const layout = {
  wrapperCol: { span: 16 },
  layout: "vertical",
};

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  async function onSubmit(values) {
    setLoading(true);
    setError(undefined);
    try {
      const resp = await axios.post("/login", {
        username: values.username,
        password: values.password,
      });

      localStorage.setItem("token", resp.data.token);
      setLoading(false);
      router.push("/blog");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 403) {
          setError(err.response.data);
        }
      } else {
        setError("Oops! Something went wrong. Failed to login.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && <Alert message={error} type="error" />}
      <Row justify="center">
        <Col>
          <Form {...layout} onFinish={onSubmit}>
            <Item label="Username" name="username" rules={[{ required: true }]}>
              <Input style={{ width: 300 }} />
            </Item>
            <Item label="Password" name="password" rules={[{ required: true }]}>
              <Input.Password type="password" style={{ width: 300 }} />
            </Item>
            <Item>
              <Space>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Login
                </Button>
                <Link href="/register">
                  <a>Create a new account</a>
                </Link>
              </Space>
            </Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
