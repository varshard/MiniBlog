import React from "react";
import { Row, Col } from "antd";
import BlogCard from "./BlogCard";

export default function Cards({ posts, deletePost, editPost }) {
  return (
    <Row align="top" gutter={8}>
      {posts &&
        posts.map((post) => {
          return (
            <Col xs={24} sm={6} key={post._id}>
              <BlogCard
                post={post}
                deletePost={deletePost}
                editPost={editPost}
              />
            </Col>
          );
        })}
    </Row>
  );
}
