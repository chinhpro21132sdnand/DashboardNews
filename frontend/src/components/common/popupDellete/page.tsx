import React from "react";
import { Modal } from "antd";

interface UserCardProps {
  isModalOpen: boolean;
  onClose: () => void;
  handleOk: () => void;
  title: string;
  name: string;
}
const PopUpDellete: React.FC<UserCardProps> = ({
  isModalOpen,
  onClose,
  handleOk,
  title,
  name,
}) => {
  return (
    <>
      <Modal
        title={
          <span style={{ fontSize: "24px", fontWeight: "bold" }}>{title}</span>
        }
        width={500}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={onClose}
        className="custom-modal"
      >
        <div style={{ fontSize: "14px", color: "red" }}>
          Bạn có chắc chắn muốn xóa {name}
        </div>
      </Modal>
    </>
  );
};

export default PopUpDellete;
