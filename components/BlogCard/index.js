import React from "react";
import { Card, Space } from "antd";
import { faCircle, faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Author from "./Author";

export default function BlogCard({ card }) {
  return (
    <div>
      <Card
        title={card.name}
        extra={
          <Space>
            <FontAwesomeIcon icon={faEdit} size="1x" />
            <FontAwesomeIcon
              icon={faCircle}
              style={{ color: card.status }}
              size="1x"
            />
          </Space>
        }
      >
        <p>{card.content}</p>
        <Author post={card} />
      </Card>
    </div>
  );
}
