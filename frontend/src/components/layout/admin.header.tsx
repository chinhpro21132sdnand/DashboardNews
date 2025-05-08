"use client";
import { AdminContext } from "@/library/admin.context";
import {
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Layout } from "antd";
import { useContext } from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import images from "@/img/images.webp";
const AdminHeader = () => {
  const { Header } = Layout;
  const { collapseMenu, setCollapseMenu } = useContext(AdminContext)!;

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item (disabled)
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
    },
    {
      key: "3",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.luohanacademy.com"
        >
          3rd menu item (disabled)
        </a>
      ),
      disabled: true,
    },
    {
      key: "4",
      danger: true,
      label: "a danger item",
    },
  ];

  return (
    <>
      <Header
        style={{
          padding: 0,
          display: "flex",
          background: "#ffffff",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          type="text"
          icon={collapseMenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapseMenu(!collapseMenu)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <div>
          <BellOutlined
            style={{
              paddingRight: "20px",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          />
          <Dropdown menu={{ items }}>
            <a
              onClick={(e) => e.preventDefault()}
              style={{
                color: "unset",
                lineHeight: "0 !important",
                marginRight: 20,
              }}
            >
              <Avatar
                src={images.src}
                style={{
                  backgroundColor: "#red",
                  verticalAlign: "middle",
                  paddingRight: "10px",
                }}
                size="large"
              ></Avatar>
              <Space>
                Tiến chính
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </Header>
    </>
  );
};

export default AdminHeader;
