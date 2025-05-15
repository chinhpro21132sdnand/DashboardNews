"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
//import { Line } from "@ant-design/charts";
import { Card, Col, Row } from "antd";
import { Pie } from "@ant-design/plots";
import { getAllDashboard } from "@/reduce/dashboard/apiRequest";
import { useDispatch } from "react-redux";
import { Select } from "antd";
import { getUtcDateRange } from "../../library/dateJs";
const AdminCard: React.FC = () => {
  const dispatch = useDispatch();
  const dateTo = new Date(2025, 4, 14);
  const dateFrom = new Date(dateTo.getFullYear(), dateTo.getMonth(), 2);
  const [dataPie, setDataPie] = useState([]);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const fetchData = useCallback(async () => {
    console.log(dateRange, "dateRange");
    try {
      const res = await getAllDashboard(dispatch, dateRange);
      setDataPie(res?.data.data);
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
      angleField: "value",
      colorField: "type",
      radius: 1,
      innerRadius: 0.6,
      label: {
        type: "inner",
        offset: "-30%",
        content: "{value}",
        style: {
          textAlign: "center",
          fontSize: 14,
        },
      },
      interactions: [
        {
          type: "element-active",
        },
      ],
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
        <Col span={24}>
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
            <Pie {...config2} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminCard;
