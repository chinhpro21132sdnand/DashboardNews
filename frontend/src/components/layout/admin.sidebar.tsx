"use client";
import Layout from "antd/es/layout";
import Menu from "antd/es/menu";
import { AppstoreOutlined, MailOutlined } from "@ant-design/icons";
import React, { useContext } from "react";
import { AdminContext } from "@/library/admin.context";
import type { MenuProps } from "antd";
import Link from "next/link";

type MenuItem = Required<MenuProps>["items"][number];
const AdminSideBar = () => {
  const { Sider } = Layout;
  const { collapseMenu } = useContext(AdminContext)!;

  const items: MenuItem[] = [
    {
      key: "grp",
      label: "BASE VIEW CMS NEXTJS",
      type: "group",
      children: [
        {
          key: "dashboard",
          label: <Link href={"/dashboard"}>Dashboard</Link>,
          icon: <AppstoreOutlined />,
        },
        {
          key: "Quản lý danh mục Bài viết",
          label: "Quản lý danh mục Bài viết",
          icon: <MailOutlined />,
          children: [
            {
              key: "Quản lý các bài viết về công nghệ",
              label: (
                <Link href={"/dashboard/vegatable"}>
                  Quản lý bài viết công nghệ
                </Link>
              ),
            },
            {
              key: "Quản lý các bài viết về giải trí",
              label: (
                <Link href={"/dashboard/vegatable"}>
                  Quản lý bài viết giải trí
                </Link>
              ),
            },
            {
              key: "Quản lý các bài viết về hình sự",
              label: (
                <Link href={"/dashboard/vegatable"}>
                  Quản lý bài viết hình sự
                </Link>
              ),
            },
            {
              key: "Quản lý các bài viết kinh doanh",
              label: (
                <Link href={"/dashboard/vegatable"}>
                  Quản lý bài viết kinh doanh
                </Link>
              ),
            },
          ],
        },
      ],
    },
  ];

  return (
    <Sider
      className={`sider ${collapseMenu} ? "collapsed" : "expanded"`}
      collapsed={collapseMenu}
      style={{
        minWidth: "300px !important",
      }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["dashboard"]}
        items={items}
        style={{
          height: "100vh",
          overflowY: "scroll",
          paddingTop: "20px",
          backgroundColor: "#000000",
          boxShadow: " 0px 4px 10px rgba(0, 0, 0, 0.5)",
        }}
        className="MenuItem"
      />
    </Sider>
  );
};

export default AdminSideBar;
