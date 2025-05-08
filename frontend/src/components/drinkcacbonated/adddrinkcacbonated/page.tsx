import React, { useEffect, useState } from "react";
import { Col, Input, Row } from "antd";
import PopUpModal from "@/components/common/popup/page";
import { useDispatch } from "react-redux";
import { addDrinkVegetable } from "@/reduce/drinkcacbonated/apiRequest";
import toastMessage from "@/components/common/toastMessage/page";
interface UserCardProps {
  isModalOpen: boolean;
  onClose: () => void;
  title: string;
}

const PopUpModals: React.FC<UserCardProps> = ({
  isModalOpen,
  onClose,
  title,
}) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [number, setNumber] = useState<number>(0);
  const [unit, setUnit] = useState<string>("");
  const [supplier, setSupplier] = useState<string>("");
  // const [isActive, setIsActive] = useState<boolean>(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setName("");
    setPrice(0);
    setNumber(0);
    setUnit("");
    setSupplier("");
  }, [isModalOpen]);
  const fetchData = async () => {
    try {
      const payload = {
        name: name,
        price: price,
        number: number,
        unit: unit,
        supplier: supplier,
      };
      const res = await addDrinkVegetable(dispatch, payload);
      if (res?.status.toString().startsWith("2")) {
        toastMessage(true);
        onClose();
      } else {
        toastMessage(false);
        onClose();
      }
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  return (
    <>
      <PopUpModal
        isModalOpen={isModalOpen}
        onClose={onClose}
        title={title}
        handleOk={fetchData}
      >
        <Row gutter={16}>
          <Col span={12} style={{ marginTop: 16 }}>
            <p style={{ marginBottom: 10 }}>Tên đồ uống có ga</p>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </Col>
          <Col span={12} style={{ marginTop: 16 }}>
            <p style={{ marginBottom: 10 }}>giá sản phẩm </p>
            <Input
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </Col>
          <Col span={12} style={{ marginTop: 16 }}>
            <p style={{ marginBottom: 10 }}>số lượng</p>
            <Input
              value={number}
              onChange={(e) => setNumber(Number(e.target.value))}
            />
          </Col>
          <Col span={12} style={{ marginTop: 16 }}>
            <p style={{ marginBottom: 10 }}>đơn vị</p>
            <Input value={unit} onChange={(e) => setUnit(e.target.value)} />
          </Col>
          <Col span={24} style={{ marginTop: 16 }}>
            <p style={{ marginBottom: 10 }}>Nhà cung cấp</p>
            <Input
              value={supplier}
              onChange={(e) => setSupplier(e.target.value)}
            />
          </Col>
        </Row>
      </PopUpModal>
    </>
  );
};

export default PopUpModals;
