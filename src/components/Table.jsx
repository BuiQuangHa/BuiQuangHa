import { Table as AntdTable, Col, Row } from "antd";

export const Table = ({
  columns = [],
  dataSource = [],
  loading = false,
  className,
  size,
  bordered = true,
  totalResult = 0,
  currentPage = 1,
  header = {
    showHeader: false,
    title: undefined,
    actions: undefined,
    justify: undefined,
    suffixTitle: undefined,
  },
  rowKey,
  scroll = {},
  pagination = {
    showPagination: false,
    showSizeChanger: true,
    center: false,
    // total: 0,
    // pageSize: 10,
  },
  onClickRow,
  onSelectRows,
  selectedRows = [],
  rowPropsConfig = () => {},
  rowClassName = () => {},
  ...props
}) => {
  const onRow = (record) => ({
    onClick: () => {
      !!onClickRow && onClickRow(record);
    },
  });

  return (
    <AntdTable
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      className={className}
      size={size || "small"}
      bordered={bordered}
      rowKey={rowKey}
      title={
        header?.showHeader &&
        (() => (
          <Row justify={header?.justify || "space-between"} align="middle">
            <Col>
              <Row align="middle">
                <Col>
                  <h3>{header?.title || "Title"}</h3>
                </Col>

                {!!header?.suffixTitle && <Col>{header.suffixTitle}</Col>}
              </Row>
            </Col>

            <Col>{header?.actions}</Col>
          </Row>
        ))
      }
      // pagination={
      //   pagination.showPagination && {
      //     showSizeChanger: pagination?.showSizeChanger || true,
      //     current: currentPage,
      //     total: totalResult,
      //     position: ["bottomRight"],
      //     locale: { items_per_page: "" },
      //     pageSizeOptions: PAGE_SIZE_OPTIONS,
      //     defaultPageSize: PAGE_SIZE_OPTIONS[0],
      //     ...pagination,
      //   }
      // }
      pagination={false}
      scroll={scroll}
      rowSelection={
        !!onSelectRows && {
          onChange: (_, rows) => onSelectRows(rows),
          checkStrictly: false,
          selectedRowKeys: selectedRows.map((row) => row.key || row[rowKey]),
          getCheckboxProps: rowPropsConfig,
        }
      }
      onRow={onRow}
      rowClassName={rowClassName}
      {...props}
    />
  );
};
