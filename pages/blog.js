import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, Form, Input, Select, Radio, message } from "antd";
import { useRouter } from "next/router";
import { faCircle } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../components/Loader";
import Cards from "../components/Cards";
import ConfirmDeletePostModal from "../components/ConfirmDeletePostModal";
import EditPostModal from "../components/EditPostModal";
const { Item } = Form;
const { Option } = Select;

const endpoint = "/posts";

export default function Blog() {
  const router = useRouter();
  const [token, setToken] = useState();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [confirmDeleteVisibility, setConfirmDeleteVisibility] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState();
  const [editTarget, setEditTarget] = useState();
  const [editFormVisibility, setEditFormVisibility] = useState(false);

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
    try {
      await axios.post(
        endpoint,
        {
          ...values,
        },
        {
          headers: { Authorization: token },
        }
      );

      message.success("Your blog has been posted successfully.");
      loadPosts();
    } catch (err) {
      message.error("Oops! Something went wrong while creating a post.");
    } finally {
      setLoading(false);
    }
  }

  function deletePost(post) {
    setConfirmDeleteVisibility(true);
    setDeleteTarget(post);
  }

  function handleCancel() {
    setConfirmDeleteVisibility(false);
    setDeleteTarget(undefined);
  }

  async function handleConfirmDelete(post) {
    setLoading(true);
    try {
      await axios.delete(`${endpoint}/${post._id}`, {
        headers: { Authorization: token },
      });
      loadPosts();
      message.success("The post has been deleted successfully.");
    } catch (e) {
      message.error("Oops! Something went wrong. Failed to delete a post.");
    } finally {
      setDeleteTarget(undefined);
      setConfirmDeleteVisibility(false);
      setLoading(false);
    }
  }

  function editPost(post) {
    setEditTarget(post);
    setEditFormVisibility(true);
  }

  async function handleEditPost(id, values) {
    setEditLoading(true);
    try {
      await axios.patch(`${endpoint}/${id}`, values, {
        headers: { Authorization: token },
      });
      loadPosts();
      message.success("The post has been updated successfully.");
    } catch (e) {
      message.error("Opps! Something went wrong. Failed to update the post.");
    } finally {
      setEditLoading(false);
      setEditTarget(undefined);
      setEditFormVisibility(false);
    }
  }

  function logout() {
    localStorage.setItem("token", undefined);
    router.push("/");
  }

  return (
    <>
      {editTarget && (
        <EditPostModal
          post={editTarget}
          visible={editFormVisibility}
          setVisible={setEditFormVisibility}
          handleOk={handleEditPost}
          handleCancel={() => {
            setEditFormVisibility(false);
          }}
          loading={editLoading}
        />
      )}
      {deleteTarget && (
        <ConfirmDeletePostModal
          post={deleteTarget}
          visible={confirmDeleteVisibility}
          handleCancel={handleCancel}
          handleOk={handleConfirmDelete}
        />
      )}
      <Button onClick={logout}>Log out</Button>
      <Card>
        <Form
          onFinish={onSubmit}
          layout="vertical"
          initialValues={{
            name: "",
            content: "",
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
      {!loading && (
        <Cards posts={posts} deletePost={deletePost} editPost={editPost} />
      )}
    </>
  );
}
