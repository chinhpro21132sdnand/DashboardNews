"use client";
import React from "react";
import { Line } from "@ant-design/charts";
import { Card, Col, Row } from "antd";
import { Pie } from "@ant-design/plots";

const AdminCard: React.FC = () => {
  // Dữ liệu biểu đồ đường
  const data = [
    { year: "1991", value: 3 },
    { year: "1992", value: 4 },
    { year: "1993", value: 3.5 },
    { year: "1994", value: 5 },
    { year: "1995", value: 4.9 },
    { year: "1996", value: 6 },
    { year: "1997", value: 7 },
    { year: "1998", value: 9 },
    { year: "1999", value: 13 },
  ];

  const config = {
    data,
    height: 400,
    xField: "year",
    yField: "value",
    smooth: true, 
  };

  const data2 = [
    { type: "Loại A", value: 27 },
    { type: "Loại B", value: 25 },
    { type: "Loại C", value: 18 },
    { type: "Loại D", value: 15 },
    { type: "Loại E", value: 10 },
    { type: "Loại F", value: 5 },
  ];

  const config2 = {
    appendPadding: 10,
    data: data2, 
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
  };

  return (
    <div style={{}}>
      <Row gutter={16}>
        <Col span={16}>
          <Card bordered={false}>
            <Line {...config} />
          </Card>
        </Col>
        <Col span={8}>
          <Card bordered={false}>
            <Pie {...config2} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminCard;
