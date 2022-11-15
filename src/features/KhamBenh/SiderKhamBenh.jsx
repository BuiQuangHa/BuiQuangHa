import { SearchOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Col, Divider, Empty, Input, Layout, Row, Segmented, Spin, Typography } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

import { apiGetAllExams } from "./../../services/exam";

let SiderKhamBenh = (
  { selectedExam = {}, setSelectedExam = () => {}, selectedSegment = "Waiting", setSelectedSegment = () => {} },
  ref,
) => {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState();

  useImperativeHandle(ref, () => ({
    getAllExams,
  }));

  useEffect(() => {
    getAllExams();
  }, []);

  const getAllExams = async (search_string = searchValue) => {
    try {
      setLoading(true);

      const res = await apiGetAllExams({ search_string });

      setDataSource(res);

      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Spin spinning={loading}>
      <Layout.Sider width={300} theme="light" style={{ height: "calc(100vh - 150px)", padding: 10 }}>
        <Row gutter={[0, 10]}>
          <Col span={24}>
            <Input
              prefix={<SearchOutlined />}
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onPressEnter={() => getAllExams(searchValue)}
            />
          </Col>

          <Col span={24}>
            <Segmented options={["Waiting", "Completed"]} block value={selectedSegment} onChange={setSelectedSegment} />
          </Col>

          <div style={{ overflow: "auto", height: "calc(100vh - 215px)", width: "100%" }}>
            <Row gutter={[0, 10]}>
              {dataSource.length > 0 ? (
                dataSource
                  .filter((item) =>
                    selectedSegment === "Completed" ? item.Exam_Status === "COMPLETED" : item.Exam_Status === "WAITING",
                  )
                  .map((item) => (
                    <ExamCard
                      key={item.ID}
                      item={item}
                      onSelect={setSelectedExam}
                      className={selectedExam.ID === item.ID ? "active" : ""}
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
      </Layout.Sider>
    </Spin>
  );
};

SiderKhamBenh = forwardRef(SiderKhamBenh);

export { SiderKhamBenh };

const ExamCard = ({ item, onSelect = () => {}, ...props }) => (
  <Col css={cssCard} span={24} onClick={() => onSelect(item)} {...props}>
    <h4>{item.Name}</h4>

    <Divider style={{ marginBlock: 5 }} className="divider" />

    <div>
      <b>Patient code:</b> {item.Code}
    </div>

    <Typography.Paragraph ellipsis={{ tooltip: item.ID }} style={{ marginBottom: 0 }}>
      <b>Exam code:</b> {item.ID}
    </Typography.Paragraph>
  </Col>
);

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
