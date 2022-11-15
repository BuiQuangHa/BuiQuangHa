import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space } from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";

const searchType = {
  ENTER: "enter",
  LIVE: "live",
};

let Search = (
  {
    placeholder = "Search",
    style = {},
    onSearch = () => {},
    type = searchType.ENTER,
    addBtn = {
      showBtn: false,
      onClick: () => {},
    },
    ...props
  },
  ref,
) => {
  const [searchValue, setSearchValue] = useState();

  useImperativeHandle(ref, () => ({
    searchValue,
    setSearchValue,
  }));

  const handleChangeSearchValue = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handlePressEnterSearch = () => {
    onSearch(searchValue);
  };

  return (
    <Space size={0}>
      <Input
        placeholder={placeholder}
        prefix={<SearchOutlined />}
        style={style}
        value={searchValue}
        onChange={handleChangeSearchValue}
        onPressEnter={handlePressEnterSearch}
        {...props}
      />

      {!!addBtn?.showBtn && <Button icon={<PlusOutlined />} type="primary" onClick={addBtn?.onClick}></Button>}
    </Space>
  );
};

Search.type = searchType;

Search = forwardRef(Search);

export { Search };
