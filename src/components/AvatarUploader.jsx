import { CameraOutlined } from "@ant-design/icons";
import { Avatar, Upload, notification } from "antd";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";

let AvatarUploader = ({ onSetAvatar = () => {}, urlPreview, onSetUrlPreview = () => {}, reset }, ref) => {
  const [isChangeAvatar, setIsChangeAvatar] = useState(false);
  const [error, setError] = useState(false);

  useImperativeHandle(ref, () => ({
    doAfterSubmit: handleAfterSubmit,
  }));

  const handleAfterSubmit = () => {
    setIsChangeAvatar(false);
  };

  useEffect(() => {
    if (reset) {
      isChangeAvatar && setIsChangeAvatar(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reset]);

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  const getImageFromSever = (ID) => {
    if (ID && ID !== "") {
      return `/public/file?ID=${ID}`;
    }
    return "";
  };

  async function onChangeAvatar(data) {
    if (data.file.status !== "uploading" && !error) {
      let urlPreview = await getBase64(data.file.originFileObj);
      setIsChangeAvatar(true);
      onSetUrlPreview(urlPreview);
      let array = urlPreview.split(",");
      onSetAvatar(array[1]);
    }
  }

  const beforeUpload = (file) => {
    setError(false);
    const isImage = file.type.indexOf("image/") === 0;
    if (!isImage) {
      notification.error({
        message: "Chỉ được upload ảnh",
        placement: "bottomLeft",
      });
      setError(true);
      return;
    }

    const isLt5M = file.size / 1024 / 1024 < 1;
    if (!isLt5M) {
      setError(true);
      notification.error({
        message: "Kích thước ảnh nhỏ hơn 1MB",
        placement: "bottomLeft",
      });
    }
    return isImage && isLt5M;
  };

  return (
    <Upload
      css={styleAvatarUploader}
      name="avatar"
      showUploadList={false}
      onChange={onChangeAvatar}
      beforeUpload={beforeUpload}
    >
      <Avatar shape="square" src={isChangeAvatar ? urlPreview : !!urlPreview && getImageFromSever(urlPreview)}>
        <CameraOutlined />
      </Avatar>
    </Upload>
  );
};

AvatarUploader = forwardRef(AvatarUploader);

export { AvatarUploader };

const styleAvatarUploader = {
  ".ant-avatar-square": {
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};
