import React from "react";
import { Modal } from "antd";

export default function ConfirmDeletePostModal({
  visible,
  handleOk,
  handleCancel,
  post,
}) {
  return (
    <Modal
      title="Confirm deleting a post"
      visible={visible}
      okText="Delete"
      onOk={() => {
        handleOk(post);
      }}
      onCancel={handleCancel}
    >
      Are you sure that you want to delete this post?
    </Modal>
  );
}
