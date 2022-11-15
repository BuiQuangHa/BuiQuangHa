import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Space, Tooltip } from "antd";

import { Search } from "./Search";

export const TopbarActions = ({
  selectedRecords = [],
  onClickAddNew = () => {},
  onSearch = () => {},
  onClickDelete = () => {},
  showSelect = true,
  showDelete = true,
  searchWidth = 350,
  actionsBetweenSearchAndAddNew,
  searchRef,
}) => {
  return (
    <Space>
      {showSelect && (
        <div>
          <span className="primary-txt">{selectedRecords?.length || 0}</span> selected
        </div>
      )}

      {showDelete && (
        <Tooltip title="Delete multiple records">
          <Button
            icon={<DeleteOutlined />}
            danger
            type="primary"
            disabled={!selectedRecords?.length}
            onClick={onClickDelete}
          />
        </Tooltip>
      )}

      <Search onSearch={onSearch} style={{ width: searchWidth }} ref={searchRef} />

      {actionsBetweenSearchAndAddNew}

      <Button icon={<PlusOutlined />} type="primary" onClick={onClickAddNew}>
        Add new
      </Button>
    </Space>
  );
};
