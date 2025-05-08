"use client";
import { UserOutlined } from "@ant-design/icons";
import { Column } from "@ant-design/plots";
import { Button, Card, Table, Tag } from "antd";
import { Input } from "antd";
import { Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PaginationComponent from "../common/pagination/page";
import { useCallback, useState } from "react";

interface SelectActive {
  value: number;
  text: string;
}

const UserTable = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
      acctive: {
        value: 1,
        text: "Hoạt động",
      },
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      acctive: {
        value: 2,
        text: "Khóa",
      },
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      acctive: {
        value: 2,
        text: "Khóa",
      },
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      acctive: {
        value: 2,
        text: "Khóa",
      },
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      acctive: {
        value: 2,
        text: "Khóa",
      },
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      acctive: {
        value: 2,
        text: "Khóa",
      },
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      acctive: {
        value: 2,
        text: "Khóa",
      },
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      acctive: {
        value: 2,
        text: "Khóa",
      },
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
      acctive: {
        value: 2,
        text: "Khóa",
      },
    },
  ];
  const [PageSize, getPagesize] = useState(10);
  const [total, getTotal] = useState(1);
  const handlePageChange = useCallback(
    (page: number, total: number) => {
      getPagesize(page);
      getTotal(total);
    },
    [getPagesize, getTotal]
  );
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "20px",
        }}
      >
        <Button>Create User</Button>
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
          <h3>Manager Users</h3>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Input
              size="large"
              style={{ width: "20%" }}
              placeholder="Nhập để tìm kiếm"
              prefix={<UserOutlined />}
            />
            <Select
              size="large"
              style={{ width: "20%", marginLeft: "20px" }}
              placeholder="large size"
              prefix={<UserOutlined />}
            />
            <Select
              size="large"
              style={{ width: "20%", marginLeft: "20px" }}
              placeholder="large size"
              prefix={<UserOutlined />}
            />
          </div>
        </div>
        <Table
          scroll={{ y: 310 }}
          dataSource={dataSource}
          pagination={false}
          className="custom-scroll-table"
        >
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Age" dataIndex="age" key="age" />
          <Column title="Address" dataIndex="address" key="address" />
          <Column
            title="Active"
            dataIndex="acctive"
            key="tags"
            render={(acctive: SelectActive) => {
              const color = acctive.value === 1 ? "green" : "red";
              return <Tag color={color}>{acctive.text.toUpperCase()}</Tag>;
            }}
          />
          <Column
            title="Chức năng"
            dataIndex="fn"
            key="Chức năng"
            render={() => <FontAwesomeIcon icon="ellipsis-vertical" />}
          />
        </Table>
        <PaginationComponent
          PageSize={PageSize}
          total={total}
          onChange={handlePageChange}
        />
      </Card>
    </>
  );
};

export default UserTable;
