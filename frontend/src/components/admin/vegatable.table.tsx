"use client";
import {
  Card,
  Col,
  List,
  Row,
  Tabs,
  DatePicker,
  Select,
  TabsProps,
} from "antd";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllvegetale } from "@/reduce/vegatable/apiRequest";
import { getUtcDateRange2 } from "@/library/dateJs";
import { Dayjs } from "dayjs";
import { Column } from "@ant-design/plots";

type chart = {
  type: string;
  sales: number;
};
type labels = {
  _id: string;
  author: string;
  time: string;
  content: string;
  like: number;
  comment: number;
  labels: string;
  labels_1: string;
};
type RawItem = {
  _id: string;
  count: number;
  articles: labels[];
};
const UserTable = () => {
  // 🔥 Sửa kiểu của dataSource thành TabsProps['items']
  const [dataSource, setDataSource] = useState<TabsProps["items"]>([]);
  const [dataChart, setDataChart] = useState<chart[]>([]);

  const [dataDate, setdataDate] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: null,
    end: null,
  });
  const { RangePicker } = DatePicker;
  const [lang, setLang] = useState("en");

  const dispatch = useDispatch();

  // 🔥 Không cần sửa gì ở useMemo, vẫn giữ như của bạn
  const config2 = useMemo(
    () => ({
      appendPadding: 10,
      data: dataChart,
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
    [dataChart]
  ); // 🔥 Sửa từ [dataSource] -> [dataChart] để đúng dependency

  const fetchData = async () => {
    try {
      const params = [
        dataDate.start && `dateFrom=${dataDate.start.toISOString()}`,
        dataDate.end && `dateTo=${dataDate.end.toISOString()}`,
        lang && `lang=${lang}`,
      ].filter(Boolean);
      const url = params.length > 0 ? `?${params.join("&")}` : "";
      const res = await getAllvegetale(dispatch, url);
      const rawData: RawItem[] = res?.data.data || [];

      // 🔥 Xử lý dataChart
      const chartData: chart[] = rawData.map((item) => ({
        type: item._id,
        sales: item.count,
      }));

      // 🔥 Xử lý dataSource cho Tabs
      const articles: TabsProps["items"] = rawData.map(
        (item, index: number) => ({
          key: index.toString(),
          label: `bài viết nổi bật ${item._id}`,
          children: (
            <List
              grid={{ gutter: 16, column: 2 }}
              dataSource={item.articles}
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
        })
      );

      setDataChart(chartData);
      setDataSource(articles);
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
  }, [dataDate, lang]);

  const handleDateChange = (dates: [Dayjs | null, Dayjs | null] | null) => {
    if (!dates || !dates[0] || !dates[1]) {
      setdataDate(getUtcDateRange2(new Date(), new Date()));
    } else {
      setdataDate(getUtcDateRange2(dates[0].toDate(), dates[1].toDate()));
    }
  };

  const handleChange = (value: string) => {
    setLang(value);
  };

  return (
    <div style={{}}>
      <Row gutter={24}>
        <Col span={12}>
          <Card bordered={false}>
            <Select
              defaultValue="en"
              style={{ width: 180, height: "42px" }}
              onChange={handleChange}
              options={[
                { value: "vi", label: "Bài viết trong nước" },
                { value: "en", label: "Bài viết ngoài nước" },
              ]}
            />
            <RangePicker
              style={{ padding: "10px" }}
              onChange={handleDateChange}
            />
            <Column {...config2} />
          </Card>
        </Col>
        <Col span={12}>
          <Card bordered={false}>
            <Tabs defaultActiveKey="0" items={dataSource} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserTable;
