import React from "react";
import { Card, Modal } from "antd";
import Meta from "antd/es/card/Meta";
import { formatdate } from "@/library/format";
type labels = {
  author: string;
  time: string;
  content: string;
  like: number;
  comment: number;
  labels: string;
};
interface UserCardProps {
  dataDetail: labels[];
  isModalOpen: boolean;
  onClose: () => void;
  title: string;
}
const PopUpModal: React.FC<UserCardProps> = ({
  dataDetail,
  isModalOpen,
  onClose,
  title,
}) => {
  console.log(dataDetail, "dataDetail");
  return (
    <>
      <Modal
        title={
          <span style={{ fontSize: "28px", fontWeight: "bold" }}>{title}</span>
        }
        width={700}
        open={isModalOpen}
        onCancel={onClose}
        className="custom-modal"
      >
        <Card
          style={{ width: "100% " }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        >
          <Meta
            title={
              <h3 className="custom-title">Tác giả: {dataDetail?.author}</h3>
            }
            description={
              <>
                <p>nội dung: {dataDetail?.content}</p>
                <p>Like: {dataDetail?.like}</p>
                <p>comment: {dataDetail?.comment}</p>
                <p className="custom-time">{formatdate(dataDetail?.time)}</p>
              </>
            }
          />
        </Card>
      </Modal>
    </>
  );
};

export default PopUpModal;
