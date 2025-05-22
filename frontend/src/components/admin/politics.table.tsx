"use client";
import { UserOutlined } from "@ant-design/icons";
import { Card, Input, List } from "antd";
import PopUpModal from "../common/popup/page";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllPolitics, detailPolitics } from "@/reduce/politics/apiRequest";
import Meta from "antd/es/card/Meta";
import { formatdate } from "@/library/format";
import { DatePicker, Space } from "antd";
import { getUtcDateRange2 } from "@/library/dateJs";
import { Dayjs } from "dayjs";
type labels = {
  _id: string;
  author: string;
  time: string;
  content: string;
  like: number;
  comment: number;
  labels: string;
};
const UserTable = () => {
  const [dataSource, setDataSource] = useState<labels[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataDetail, setDataDetail] = useState<labels | null>(null);
  const [dataDate, setdataDate] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const { RangePicker } = DatePicker;

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const params = [
        dataDate.start && `dateFrom=${dataDate.start.toISOString()}`,
        dataDate.end && `dateTo=${dataDate.end.toISOString()}`,
      ].filter(Boolean);
      const url = params.length > 0 ? `?${params.join("&")}` : "";
      const res = await getAllPolitics(dispatch, url);

      setDataSource(res?.data.data);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    setdataDate(getUtcDateRange2(new Date(), new Date()));
  }, []);
  useEffect(() => {
    if (dataDate.start && dataDate.end) {
      fetchData();
    }
  }, [dataDate]);
  const handleDateChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string]
  ) => {
    if (!dates || !dates[0] || !dates[1]) {
      setdataDate(getUtcDateRange2(new Date(), new Date()));
    } else {
      console.log(dateStrings);
      setdataDate(getUtcDateRange2(dates[0].toDate(), dates[1].toDate()));
    }
  };
  const onClose = () => {
    setIsModalOpen(false);
    fetchData();
  };
  const handelID = async (item: string): Promise<void> => {
    try {
      const resDetail = await detailPolitics(dispatch, item);
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
          <h3>Quản lý bài viết về giải trí</h3>
          <div
            style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}
          >
            <Input
              size="large"
              style={{ width: "40%" }}
              placeholder="Nhập để tìm kiếm"
              prefix={<UserOutlined />}
              //onChange={(e) => setName(e.target.value)}
            />
            <Space direction="vertical" size={12}>
              <RangePicker
                style={{ padding: "10px" }}
                onChange={handleDateChange}
              />
            </Space>
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
                style={{ width: 300, height: 140, overflow: "hidden" }}
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
      </Card>
    </>
  );
};

export default UserTable;
