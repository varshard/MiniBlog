import React from "react";
import { Card, Space, Badge } from "antd";
import {
  faCircle,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Author from "./Author";

export default function BlogCard({ post, deletePost, editPost }) {
  const { editable } = post;
  return (
    <div>
      <Card
        title={post.name}
        extra={
          <Space>
            {editable && (
              <FontAwesomeIcon
                icon={faEdit}
                size="1x"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  editPost(post);
                }}
              />
            )}
            <FontAwesomeIcon
              icon={faCircle}
              style={{ color: post.status }}
              size="1x"
            />
            {editable && (
              <FontAwesomeIcon
                icon={faTrashAlt}
                size="1x"
                onClick={() => {
                  deletePost(post);
                }}
                style={{ cursor: "pointer" }}
              />
            )}
          </Space>
        }
      >
        <Badge status="default" text={post.category} />
        <p>{post.content}</p>
        <Author post={post} />
      </Card>
    </div>
  );
}
