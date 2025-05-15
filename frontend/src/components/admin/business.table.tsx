"use client";
import { UserOutlined } from "@ant-design/icons";
import { Card, Input, Select, List } from "antd";
import PaginationComponent from "../common/pagination/page";
import PopUpModal from "../common/popup/page";

import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllBusiness, detailBusiness } from "@/reduce/business/apiRequest";
import IsActiveStart from "@/types/dataStart";
import Meta from "antd/es/card/Meta";
import { formatdate } from "@/library/format";

const UserTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [PageSize, getPagesize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [total, getTotal] = useState(1);
  const [currentPage, getCurrent] = useState(1);
  const [name, setName] = useState("");
  const [isActive, setIsActive] = useState("");
  const [dataDetail, setDataDetail] = useState([]);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const params = [
        name.toString() && `name=${name}`,
        isActive.toString() && `active=${isActive}`,
        PageSize && `page=${PageSize}`,
        currentPage && `current=${currentPage}`,
      ].filter(Boolean);
      const url = params.length > 0 ? `?${params.join("&")}` : "";
      const res = await getAllBusiness(dispatch, url);
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
  const onClose = () => {
    setIsModalOpen(false);
    fetchData();
  };
  const handelID = async (item: string): Promise<void> => {
    try {
      const resDetail = await detailBusiness(dispatch, item);
      setDataDetail(resDetail?.data.data);
      setIsModalOpen(true);
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
      ></div>
      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <h3>Quản lý bài viết về kinh doanh</h3>
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

        <List
          grid={{ gutter: 16, column: 4 }}
          dataSource={dataSource}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                onClick={() => handelID(item?._id)}
                style={{ width: 300, height: 300, overflow: "hidden" }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
              >
                <Meta
                  title={<h3 className="custom-title">{item?.author}</h3>}
                  description={
                    <>
                      <p className="custom-content">{item?.content}</p>
                      <p className="custom-time">{formatdate(item.time)}</p>
                    </>
                  }
                />
              </Card>
            </List.Item>
          )}
        />
        <PopUpModal
          dataDetail={dataDetail}
          isModalOpen={isModalOpen}
          onClose={onClose}
          title="Chi tiết bài viết giải trí"
        />

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
