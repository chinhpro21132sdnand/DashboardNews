"use client";
import { MoreOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Table, Tag, Input, Select, Dropdown } from "antd";
import PaginationComponent from "../common/pagination/page";
import PopUpDellete from "../common/popupDellete/page";

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAllDrinkVegetable,
  delleteDrinkVegetable,
} from "@/reduce/drinkcacbonated/apiRequest";
import IsActiveStart from "@/types/dataStart";
import PopUpModals from "../drinkcacbonated/adddrinkcacbonated/page";
import UpdateVegatable from "../vegetable/updateVegatable/page";
import toastMessage from "@/components/common/toastMessage/page";
const { Column } = Table;

const UserTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [PageSize, getPagesize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateVege, setIsUpdateVege] = useState(false);
  const [IsDeletedVege, setIsDeletedVege] = useState(false);
  const [nameVege, setNameVege] = useState("");
  const [total, getTotal] = useState(1);
  const [currentPage, getCurrent] = useState(1);
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState("");
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [idDropdown, setIdDropdow] = useState("");
  const dispatch = useDispatch();
  const items = [
    {
      key: "edit",
      label: "Cập nhật",
    },
    {
      key: "delete",
      label: "Xóa",
    },
  ];
  const handleClickFN = (keys: string, record) => {
    if (keys === "delete") {
      setNameVege(record.name);
      setIsDeletedVege(true);
    } else {
      setIsUpdateVege(true);
    }
  };
  const handelOpenChange = (id: string, visible: boolean) => {
    setIdDropdow(id);
    setOpenDropdownId(visible ? id : null);
  };
  const fetchData = async () => {
    try {
      const params = [
        name.toString() && `name=${name}`,
        isActive.toString() && `active=${isActive}`,
        PageSize && `page=${PageSize}`,
        currentPage && `current=${currentPage}`,
      ].filter(Boolean);
      const url = params.length > 0 ? `?${params.join("&")}` : "";
      const res = await getAllDrinkVegetable(dispatch, url);
      getPagesize(res?.data.pagination?.pageSize);
      getTotal(res?.data.pagination?.totalItems);
      setDataSource(res?.data.data);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    fetchData();
  }, [currentPage, name, isActive]);
  const handlePageChange = useCallback((page: number) => {
    getCurrent(page);
    getTotal(total);
  }, []);
  const handleClosePopup = () => {
    setIsUpdateVege(false);
    fetchData();
  };
  const handleClosePopup2 = () => {
    setIsDeletedVege(false);
  };
  const handleDellete = async () => {
    try {
      const res = await delleteDrinkVegetable(dispatch, idDropdown);
      if (res?.data.status >= 200 && res?.data.status < 300) {
        toastMessage(true);
        setIsDeletedVege(false);
        fetchData();
      } else {
        toastMessage(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button type="primary" onClick={() => setIsModalOpen(true)}>
          Thêm mới
        </Button>
        <PopUpModals
          isModalOpen={isModalOpen}
          title="thêm mới loại đồ uống có ga"
          onClose={() => setIsModalOpen(false)}
        ></PopUpModals>
      </div>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h3>Quản lý đồ uống có ga</h3>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Input
              size="large"
              style={{ width: "40%" }}
              placeholder="Nhập để tìm kiếm"
              prefix={<UserOutlined />}
              onChange={(e) => setName(e.target.value)}
            />
            <Select
              size="large"
              style={{ width: "40%", marginLeft: "20px" }}
              onChange={(e) => setIsActive(e)}
              options={IsActiveStart}
              placeholder="Lọc theo..."
            />
          </div>
        </div>
        <Table
          dataSource={dataSource}
          scroll={{ y: 310 }}
          pagination={false}
          className="custom-scroll-table"
        >
          <Column title="STT" dataIndex="stt" key="stt" />
          <Column title="TÊN SẢN PHẨM" dataIndex="name" key="name" />
          <Column title="GIÁ SẢN PHẨM" dataIndex="price" key="price" />
          <Column title="SỐ LƯỢNG TỒN KHO" dataIndex="number" key="number" />
          <Column title="ĐƠN VỊ" dataIndex="unit" key="unit" />
          <Column title="NGÀY NHẬP" dataIndex="dateto" key="dateto" />
          <Column title="NGÀY HẾT HẠN" dataIndex="datefrom" key="datefrom" />
          <Column title="NHÀ CUNG CẤP" dataIndex="supplier" key="supplier" />
          <Column
            title="Active"
            dataIndex="isActive"
            key="tags"
            render={(isActive) => (
              <Tag color={isActive === 1 ? "green" : "red"}>
                {isActive === 1 ? "Hoạt động" : "Khóa"}
              </Tag>
            )}
          />
          <Column
            title="Chức năng"
            key="Chức năng"
            render={(_, record) => (
              <Dropdown
                menu={{
                  items: items.map((item) => ({
                    ...item,
                    onClick: () => handleClickFN(item.key, record),
                  })),
                }}
                trigger={["click"]}
                open={openDropdownId === record._id}
                onOpenChange={(visible) =>
                  handelOpenChange(record._id, visible)
                }
              >
                <a onClick={(e) => e.preventDefault()}>
                  <MoreOutlined />
                </a>
              </Dropdown>
            )}
          />
        </Table>
        <UpdateVegatable
          isModalOpen={isUpdateVege}
          title="Cập nhật đồ uống có ga"
          id={idDropdown}
          onClose={handleClosePopup}
        ></UpdateVegatable>
        <PopUpDellete
          isModalOpen={IsDeletedVege}
          title="Xóa đồ uống có ga"
          name={nameVege}
          handleOk={handleDellete}
          onClose={handleClosePopup2}
        ></PopUpDellete>
        <PaginationComponent
          PageSize={PageSize}
          currentPage={currentPage}
          total={total}
          onChange={handlePageChange}
        />
      </Card>
    </>
  );
};

export default UserTable;
