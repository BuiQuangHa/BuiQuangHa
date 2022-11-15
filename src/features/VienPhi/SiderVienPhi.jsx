import { SearchOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Col, Divider, Empty, Layout, Row, Segmented, Spin, Typography } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { Input } from "../../components";
import { apiGetAllAppointments } from "../../services/appointment";

let SiderVienPhi = (
  {
    selectedAppointment = {},
    setSelectedAppointment = () => {},
    selectedSegment = "Unpaid",
    setSelectedSegment = () => {},
  },
  ref,
) => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState();

  useImperativeHandle(ref, () => ({
    getAllAppointment,
  }));

  const getAllAppointment = async (search_string = searchValue) => {
    try {
      setLoading(true);

      const res = await apiGetAllAppointments({ search_string });

      setDataSource(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAppointment();
  }, []);

  return (
    <Layout.Sider width={260} theme="light" style={{ height: "calc(100vh - 150px)", padding: 10 }}>
      <Spin spinning={loading}>
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search"
              onChange={(e) => setSearchValue(e.target.value)}
              onPressEnter={() => getAllAppointment(searchValue)}
            />
          </Col>

          <Divider style={{ marginBlock: 0 }} />

          <Col span={24}>
            <Segmented options={["Unpaid", "Paid"]} block value={selectedSegment} onChange={setSelectedSegment} />
          </Col>

          <div style={{ overflow: "auto", width: "100%", height: "calc(100vh - 280px)" }}>
            <Row gutter={[0, 10]}>
              {dataSource.length > 0 ? (
                dataSource
                  .filter((item) => (selectedSegment === "Unpaid" ? !item.isPayment : !!item.isPayment))
                  .map((item) => (
                    <ExamCard
                      key={item.Welcome_ID}
                      item={item}
                      onSelect={setSelectedAppointment}
                      className={selectedAppointment.Welcome_ID === item.Welcome_ID ? "active" : ""}
                    />
                  ))
              ) : (
                <Col span={24}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </Col>
              )}
            </Row>
          </div>
        </Row>
      </Spin>
    </Layout.Sider>
  );
};

const ExamCard = ({ item, onSelect = () => {}, ...props }) => (
  <Col css={cssCard} span={24} onClick={() => onSelect(item)} {...props}>
    <h4>{item.Name}</h4>

    <Divider style={{ marginBlock: 5 }} className="divider" />

    <div>
      <b>Patient code:</b> {item.Code}
    </div>

    <Typography.Paragraph ellipsis={{ tooltip: item.Welcome_ID }} style={{ marginBottom: 0 }}>
      <b>Exam code:</b> {item.Welcome_ID}
    </Typography.Paragraph>
  </Col>
);

SiderVienPhi = forwardRef(SiderVienPhi);

export { SiderVienPhi };

const cssCard = css({
  width: "100%",
  borderRadius: 10,
  border: "1px solid #4a5fc1",
  padding: 10,
  height: "fit-content",
  cursor: "pointer",

  "&.active": {
    backgroundColor: "#4a5fc1",
    "*": {
      color: "#fff",
    },
    ".divider": {
      backgroundColor: "#fff",
    },
  },
});
