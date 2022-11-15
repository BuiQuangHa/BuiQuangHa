import Icon, { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { css } from "@emotion/react";
import { Button, Space, Tooltip } from "antd";
import React, { useRef } from "react";

import { Modal } from "./Modal";
import { notification } from "./Notification";

export const TableActions = ({
  record,
  visibleEdit = true,
  visibleDelete = true,
  disableEdit = false,
  disableDelete = false,
  prefixActions,
  suffixActions,
  onDeleteRecords = async () => {},
  onClickEditButton = () => {},
  swapEditDelete = false,
}) => {
  const deleteRef = useRef();

  const handleClickDeleteButton = () => {
    deleteRef.current?.openModal(record);
  };

  const handleDelete = async (record) => {
    try {
      deleteRef.current?.setLoading(true);

      await onDeleteRecords(record);

      notification.success_delete();
      deleteRef.current?.closeModal();
    } catch (error) {
      notification.error_delete();
    } finally {
      deleteRef.current?.setLoading(false);
    }
  };

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Space size={0}>
        {prefixActions}

        {visibleEdit && !swapEditDelete && (
          <Tooltip title="Chỉnh sửa">
            <Button
              type="link"
              disabled={disableEdit}
              icon={<EditOutlined />}
              onClick={() => onClickEditButton(record)}
            />
          </Tooltip>
        )}

        {visibleDelete && (
          <Tooltip title="Xoá">
            <Button type="link" disabled={disableDelete} icon={<DeleteOutlined />} onClick={handleClickDeleteButton} />
          </Tooltip>
        )}

        {visibleEdit && !!swapEditDelete && (
          <Tooltip title="Chỉnh sửa">
            <Button
              type="link"
              disabled={disableEdit}
              icon={<EditOutlined />}
              onClick={() => onClickEditButton(record)}
            />
          </Tooltip>
        )}

        {suffixActions}
      </Space>

      <Modal ref={deleteRef} danger title="Confirm delete" onOk={handleDelete}>
        Are you sure to delete this record?
      </Modal>
    </div>
  );
};
