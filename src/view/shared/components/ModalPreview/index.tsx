import store, { RootState } from "@modules/core/store/redux";
import recordGalleryStore from "@modules/recordGallery/recordGalleryStore";

import notificationByLanguage from "@view/shared/components/Notification";
import CheckPermission, {
  CheckPermissionFunc,
} from "@view/shared/hoc/CheckPermission";
import { useAsync } from "@view/shared/hook/useAsync";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { mediaTranslateKey } from "@view/shared/translateKey";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./styles.scss";

interface Props {
  // visible: boolean;
  // onCancel: () => void;
  // data: Media
}
const { Option } = Select;
const ModalPreview = (props: Props) => {
  const { listPermissionCode } = useSelector(
    (state: RootState) => state.profile
  );

  const [loading, setLoading] = useState(false);
  const { dataModal } = useSelector((state: RootState) => state.recordGalleryStore);

  const {
    GROUPS,
    MEDIA_NAME,
    MEDIA_DESCRIPTION,
    SAVE,
    CANCEL,
    FIED_IS_NOT_EMPTY,
  } = useTranslate("mediaTranslateKey");
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      ...dataModal.data,
      mediaComment: dataModal.data?.mediaDescription,
    });

    if (dataModal.visible && dataModal.data?.mediaId) {
      // getMediaGroupsById({ mediaId: dataModal.data.mediaId });
    }
  }, [dataModal.data]);
  useEffect(() => {
    if (!!dataModal.groupSelect && dataModal.visible) {
      form.setFieldsValue({
        mediaGroups: [...dataModal.groupSelect.map((i) => i.groupId)],
      });
    }
  }, [dataModal.groupSelect]);

  const handleCancel = () => {
    form.resetFields();
    store.dispatch(
      recordGalleryStore.actions.setModal({
        visible: false,
        data: null,
      })
    );
    store.dispatch(
      recordGalleryStore.actions.setDataModalWithGroups({
        groupAllId: [],
        groupsIdSelect: [],
      })
    );
  };
  

  return (
    <Modal
      // width={1024}
      visible={dataModal.visible}
      onCancel={handleCancel}
      confirmLoading={loading}
      destroyOnClose
      centered={true}
      footer={null}
    >
   
      {/* {props.data && renderMediaByType(props.data)} */}
    </Modal>
  );
};

export default ModalPreview;
