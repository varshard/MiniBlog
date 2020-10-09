import React from "react";
import { Card, Space } from "antd";
import {
  faCircle,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Author from "./Author";

export default function BlogCard({ card, deletePost }) {
  const { editable } = card;
  return (
    <div>
      <Card
        title={card.name}
        extra={
          <Space>
            {editable && (
              <FontAwesomeIcon
                icon={faEdit}
                size="1x"
                style={{ cursor: "pointer" }}
              />
            )}
            <FontAwesomeIcon
              icon={faCircle}
              style={{ color: card.status }}
              size="1x"
            />
            {editable && (
              <FontAwesomeIcon
                icon={faTrashAlt}
                size="1x"
                onClick={() => {
                  deletePost(card);
                }}
                style={{ cursor: "pointer" }}
              />
            )}
          </Space>
        }
      >
        <p>{card.content}</p>
        <Author post={card} />
      </Card>
    </div>
  );
}
