"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
//import { Line } from "@ant-design/charts";
import { Card, Col, List, Row } from "antd";
import { Column } from "@ant-design/plots";
import {
  getAllDashboard,
  getHotDashboard,
} from "@/reduce/dashboard/apiRequest";
import { useDispatch } from "react-redux";
import { Select } from "antd";
import { getUtcDateRange } from "../../library/dateJs";
import { Tabs } from "antd";
const AdminCard: React.FC = () => {
  const dispatch = useDispatch();
  const dateTo = new Date(2025, 4, 14);
  const dateFrom = new Date(dateTo.getFullYear(), dateTo.getMonth(), 2);
  const [dataPie, setDataPie] = useState([]);
  const [dataHot, setDataHot] = useState([]);

  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const fetchData = useCallback(async () => {
    try {
      const res = await getAllDashboard(dispatch, dateRange);
      const res2 = await getHotDashboard(dispatch, dateRange);
      const data = res2?.data.data.map((item, index) => {
        return {
          key: index,
          label: `bài viết nôỉ bật ${item.type}`,
          children: (
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={item.value}
              renderItem={(post) => (
                <List.Item>
                  <Card
                    hoverable
                    style={{ width: 300, height: 140, overflow: "hidden" }}
                  >
                    <Card.Meta
                      title={
                        <h3 className="custom-title">author: {post?.author}</h3>
                      }
                      description={
                        <>
                          <p className="custom-content">
                            content: {post?.content}
                          </p>
                          <p>like: {post?.like}</p>
                          <p>comment: {post?.comment}</p>
                        </>
                      }
                    />
                  </Card>
                </List.Item>
              )}
            />
          ),
        };
      });
      setDataPie(res?.data.data);
      setDataHot(data);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  }, [dateRange]);

  useEffect(() => {
    setDateRange(getUtcDateRange(dateTo, dateTo));
  }, []);

  useEffect(() => {
    if (dateRange.start && dateRange.end) {
      setTimeout(() => {
        fetchData();
      }, 1000);
    }
  }, [dateRange]);
  const config2 = useMemo(
    () => ({
      appendPadding: 10,
      data: dataPie,
      xField: "type",
      yField: "sales",
      colorField: "type",
      width: 700,
      scale: {
        color: {
          range: ["#f4664a", "#faad14", "#a0d911", "#52c41a"],
        },
      },
    }),
    [dataPie]
  );
  const handleChange = (value: number) => {
    const RangeDate =
      value === 1
        ? getUtcDateRange(dateTo, dateTo)
        : getUtcDateRange(dateTo, dateFrom);
    setDateRange(RangeDate);
    fetchData();
  };
  return (
    <div style={{}}>
      <Row gutter={24}>
        <Col span={12}>
          <Card bordered={false}>
            <Select
              defaultValue={1}
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: 1, label: "Daily" },
                { value: 2, label: "Month" },
              ]}
            />
            <Column {...config2} />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Tabs defaultActiveKey="0" items={dataHot} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminCard;
