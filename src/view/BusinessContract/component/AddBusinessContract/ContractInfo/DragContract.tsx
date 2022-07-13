import React, { useState } from "react";
import Upload from "@view/shared/components/Upload";
import { Form } from "antd";
import { useTranslate } from "@view/shared/hook/useTranslate";

const DragContract = () => {
  const { UPLOAD_FILE, ATTACHMENT } = useTranslate(
    "businessContractTranslateKey"
  );
  return (
    <>
      <Form.Item label={UPLOAD_FILE} name="attachmentFiles">
        <Upload
          icon={<i className="far fa-file-alt fa-2x" />}
          title={ATTACHMENT}
          accept={".doc,.docx,.pdf"}
        />
      </Form.Item>
    </>
  );
};

export default DragContract;
