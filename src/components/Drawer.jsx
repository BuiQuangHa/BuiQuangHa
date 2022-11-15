import { PlusCircleFilled } from "@ant-design/icons";
import { Drawer as AntdDrawer, Button, Col, Row, Space } from "antd";

export const Drawer = ({
  children,
  open = false,
  onClose = () => {},
  header = { title: "Title", showPlusIcon: false, customHeader: undefined, actions: undefined },
  width = 500,
  className,
  footer = {
    visible: true,
    leading: undefined,
    onOk: () => {},
    okText: "",
    cancelText: "",
    loading: false,
  },
  css,
  ...props
}) => {
  const renderTitle = () => {
    if (!!header.customHeader) return header.customHeader;

    return (
      <Row align="middle" justify="space-between">
        <Col>
          <Space size={0}>
            {!!header.showPlusIcon && <PlusCircleFilled />}

            <h3>{header.title}</h3>
          </Space>
        </Col>

        <Col>{header?.actions}</Col>
      </Row>
    );
  };

  return (
    <AntdDrawer
      open={open}
      onClose={onClose}
      title={renderTitle()}
      width={width}
      closable={false}
      className={className}
      footer={
        footer?.visible && (
          <Row justify="space-between" align="middle">
            <Col>{footer?.leading}</Col>

            <Col>
              <Space>
                <Button type="primary" ghost onClick={onClose}>
                  {footer?.okText || "Cancel"}
                </Button>

                <Button type="primary" onClick={footer?.onOk} loading={footer.loading}>
                  {footer?.cancelText || "Save"}
                </Button>
              </Space>
            </Col>
          </Row>
        )
      }
      {...props}
    >
      {children}
    </AntdDrawer>
  );
};
