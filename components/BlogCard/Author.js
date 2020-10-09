import React from "react";
import { Card } from "antd";
const { Meta } = Card;

export default function Author({ post }) {
  return (
    <div>
      <Card>
        <Meta title={post.author} description={post.edited} />
      </Card>
    </div>
  );
}
