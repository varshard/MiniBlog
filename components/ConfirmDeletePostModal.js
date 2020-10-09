import React from "react";
import { Modal } from "antd";

export default function ConfirmDeletePostModal({
  visible,
  handleOk,
  handleCancel,
  postId,
}) {
  return (
    <Modal
      title="Confirm deleting a post"
      visible={visible}
      onOk={() => {
        handleOk(postId);
      }}
      onCancel={handleCancel}
    >
      Are you sure that you want to delete this post?
    </Modal>
  );
}
