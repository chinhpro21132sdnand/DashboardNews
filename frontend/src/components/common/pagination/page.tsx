import React from "react";
import { Pagination } from "antd";

interface PaginationComponentProps {
  total: number;
  currentPage: number;
  PageSize: number;
  onChange: (page: number, total: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  total,
  PageSize,
  currentPage,
  onChange,
}) => (
  <>
    <Pagination
      style={{
        display: "flex",
        justifyContent: "flex-end",
        margin: "20px",
      }}
      total={total}
      defaultPageSize={PageSize}
      current={currentPage}
      onChange={onChange}
    />
  </>
);

export default PaginationComponent;
