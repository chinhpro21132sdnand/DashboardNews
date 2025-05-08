"use client";

import { HomeOutlined } from "@ant-design/icons";
import { Layout } from "antd";

const AdminContent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { Content } = Layout;

  return (
    <Content>
      <div
        style={{
          padding: 24,
          minHeight: "calc(100vh - 180px)",
          background: "#f1f3f8",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ marginBottom: "20px" }}>DEFAULT DASHBOARD</h2>
          <p>
            <span>
              <HomeOutlined />
            </span>{" "}
            <span>/ Dashboard</span>
            <span>/ Default</span>
          </p>
        </div>

        {children}
      </div>
    </Content>
  );
};

export default AdminContent;
