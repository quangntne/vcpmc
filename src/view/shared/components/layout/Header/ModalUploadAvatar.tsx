import authenticationPresenter from '@modules/authentication/presenter';
import { useAsync } from '@view/shared/hook/useAsync';
import { useTranslate } from '@view/shared/hook/useTranslate';
import { common } from '@view/shared/translateKey';
import { Button, Modal } from 'antd'
import React, { useState } from 'react'
import UploadMediaComponent from '../../UpLoadComponent/UploadMediaComponent';

const ModalUploadAvatar = ({ visible, setVisible, callApi }) => {
  const { CANCEL, SAVE, UPLOAD_IMG } = useTranslate("common");
  const [imgUrl, setImgUrl] = useState(null);
  const [upload] = useAsync(authenticationPresenter.uploadAvatar);
  const handleCancel = () => {
    setVisible(false);
    setImgUrl(null);
  }
  const handleOk = () => {
    const formData = new FormData();
    formData.append("Image", imgUrl);
    upload.execute(formData).then(res => {
      setVisible(false);
      setImgUrl(null);
      callApi(true)
    })
  }
  
  return (
    <Modal
      visible={visible}
      title={UPLOAD_IMG}
      onOk={handleOk}
      onCancel={handleCancel}
      className="main-modal"
      footer={[
        <Button
          className="cancel-button"
          key="back"
          onClick={(handleCancel)}
        >
          {CANCEL}
        </Button>,
        <Button
          className="normal-button"
          key="submit"
          type="primary"
          loading={upload.status == "loading"}
          onClick={handleOk}
        >
          {SAVE}
        </Button>,
      ]}
    >
      <div className="modal-body-upload">
        <UploadMediaComponent onChange={(media) => setImgUrl(media)}
          media={imgUrl} />
      </div>
    </Modal>
  )
}

export default ModalUploadAvatar
