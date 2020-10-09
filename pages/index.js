import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
const { Item } = Form;

const layout = {
  wrapperCol: { span: 16 },
};

export default function Home() {
  const onSubmit = () => {};

  return (
    <Row justify="center">
      <Col>
        <Form {...layout} onFinish={onSubmit}>
          <Item label="Username" name="username" rules={[{ required: true }]}>
            <Input style={{ width: 300 }} />
          </Item>
          <Item>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Item>
        </Form>
      </Col>
    </Row>
  );
}
