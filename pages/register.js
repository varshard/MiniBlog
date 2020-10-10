import React, { useState } from "react";
import { Alert, Button, Col, Form, Input, Row } from "antd";
import { useRouter } from "next/router";
import axios from "axios";

const { Item } = Form;
const layout = {
  wrapperCol: { span: 16 },
  layout: "vertical",
};

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);
  async function onSubmit(values) {
    setLoading(true);
    try {
      const resp = await axios.post("/register", {
        username: values.username,
        password: values.password,
      });

      localStorage.setItem("token", resp.data.token);
      router.push("/blog");
    } catch (err) {
      if (err.response) {
        if (err.response.status === 400) {
          setError(err.response.data);
        } else {
          setError(
            "Oops! Something went wrong. Failed to register a new user."
          );
        }
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
              <Input.Password style={{ width: 300 }} />
            </Item>
            <Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Register
              </Button>
            </Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}
