import React from "react";
import { Row, Col } from "antd";
import BlogCard from "./BlogCard";

export default function Cards({ cards, deletePost }) {
  return (
    <Row align="top" gutter={8}>
      {cards &&
        cards.map((card) => {
          return (
            <Col xs={24} sm={6} key={card._id}>
              <BlogCard card={card} deletePost={deletePost} />
            </Col>
          );
        })}
    </Row>
  );
}
