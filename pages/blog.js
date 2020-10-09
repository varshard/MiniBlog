import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form, Input, Select, Radio } from "antd";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../components/Loader";
import Cards from "../components/Cards";
import ConfirmDeletePostModal from "../components/ConfirmDeletePostModal";
const { Item } = Form;
const { Option } = Select;

const endpoint = "/posts";

export default function Blog() {
  const [token, setToken] = useState();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmDeleteVisibility, setConfirmDeleteVisibility] = useState(false);
  const [deleteId, setDeleteId] = useState();
  async function loadPosts() {
    setLoading(true);
    axios
      .get(endpoint, {
        headers: { Authorization: token },
      })
      .then((resp) => {
        setPosts(resp.data.posts);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => {
    setToken(localStorage.getItem("token"));

    loadPosts();
  }, [token]);

  async function onSubmit(values) {
    setLoading(true);
    await axios.post(
      endpoint,
      {
        ...values,
      },
      {
        headers: { Authorization: token },
      }
    );

    loadPosts();
  }

  function deletePost(id) {
    setConfirmDeleteVisibility(true);
    setDeleteId(id);
  }

  function handleCancel() {
    setConfirmDeleteVisibility(false);
  }

  async function handleConfirmDelete(id) {
    setLoading(true);
    await axios.delete(`${endpoint}/${id}`, {
      headers: { Authorization: token },
    });
    setConfirmDeleteVisibility(false);
    loadPosts();
  }

  return (
    <>
      <ConfirmDeletePostModal
        postId={deleteId}
        visible={confirmDeleteVisibility}
        handleCancel={handleCancel}
        handleOk={handleConfirmDelete}
      />
      <Card>
        <Form
          onFinish={onSubmit}
          layout="vertical"
          initialValues={{
            title: "",
            context: "",
            category: "idea",
            status: "green",
          }}
        >
          <Item label="Title" name="name" rules={[{ required: true }]}>
            <Input />
          </Item>
          <Item
            label="Write your blog"
            name="content"
            rules={[{ required: true }]}
          >
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
          <Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Create
            </Button>
          </Item>
        </Form>
      </Card>
      {loading && <Loader />}
      {!loading && <Cards cards={posts} deletePost={deletePost} />}
    </>
  );
}
