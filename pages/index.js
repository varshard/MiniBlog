import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Form, Input, Button, Row, Col } from "antd";
const { Item } = Form;

const layout = {
  wrapperCol: { span: 16 },
  layout: "vertical",
};

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  async function onSubmit(values) {
    setLoading(true);
    const resp = await axios.post("/login", {
      username: values.username,
    });

    localStorage.setItem("token", resp.data.token);
    setLoading(false);
    router.push("/blog");
  }

  return (
    <Row justify="center">
      <Col>
        <Form {...layout} onFinish={onSubmit}>
          <Item label="Username" name="username" rules={[{ required: true }]}>
            <Input style={{ width: 300 }} />
          </Item>
          <Item>
            <Button type="primary" htmlType="button" loading={loading}>
              Login
            </Button>
          </Item>
        </Form>
      </Col>
    </Row>
  );
}
