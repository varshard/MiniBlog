import React from "react";
import { Form, Input, Modal, Radio, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-regular-svg-icons";

const { Item } = Form;
const { Option } = Select;

export default function EditPostModal({
  visible,
  handleOk,
  handleCancel,
  post,
  loading,
}) {
  const [form] = Form.useForm();
  function onFinish(values) {
    handleOk(post._id, values);
  }

  function onCancel() {
    form.resetFields();
    handleCancel();
  }

  return (
    <Modal
      title="Edit a post"
      visible={visible}
      okText="Save"
      onCancel={onCancel}
      onOk={() => {
        form.submit();
      }}
      confirmLoading={loading}
    >
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{
          name: post.name,
          content: post.content,
          category: post.category,
          status: post.status,
        }}
      >
        <Item label="Title" name="name">
          <Input />
        </Item>
        <Item label="Write your blog" name="content">
          <Input.TextArea />
        </Item>
        <Item label="Category" name="category">
          <Select>
            <Option value="idea">Idea</Option>
            <Option value="recipe">Recipe</Option>
            <Option value="rant">Rant</Option>
          </Select>
        </Item>
        <Item label="Status" name="status">
          <Radio.Group>
            <Radio.Button value="green">
              <FontAwesomeIcon icon={faCircle} style={{ color: "green" }} />
            </Radio.Button>
            <Radio.Button value="blue">
              <FontAwesomeIcon icon={faCircle} style={{ color: "blue" }} />
            </Radio.Button>
            <Radio.Button value="red">
              <FontAwesomeIcon icon={faCircle} style={{ color: "red" }} />
            </Radio.Button>
          </Radio.Group>
        </Item>
      </Form>
    </Modal>
  );
}
