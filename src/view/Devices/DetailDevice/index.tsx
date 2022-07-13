import React, { useState } from "react";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import CheckPermission from "@hoc/CheckPermission";
import { useTranslate } from "@hook/useTranslate";
import { Col, Row, Select } from "antd";
import TitleComponent from "@view/shared/components/MainTitleComponent/TitleComponent";
import ContentComponent from "@view/shared/components/ContentComponent";
import "./styles.scss";
import RightMenu from "@view/shared/components/layout/RightMenu";
import UilSync from "@iconscout/react-unicons/icons/uil-sync";
import UilLock from "@iconscout/react-unicons/icons/uil-lock";
import ModalEditDevice from "@view/Devices/Device_List/Component/ModalEditDevice";
import { fakeData } from "./interface";

const imgTemp = require("../../shared/assets/images/background.jpg");

const DetailDevice = (props) => {
  const {
    Memory,
    MEMORY_STORAGE,
    EMPTY,
    INFO,
    VERSION,
    Device_Detail,
    Device,
    Device_Info,
    OLD_VERSION,
    ACTIVE,
    Note,
    EDIT,
    RESET_MEMORY,
    FORGOT_PASS_TITLE,
  } = useTranslate(
    "common",
    "groupList",
    "deviceTranslateKey",
    "recordGalleryTranslateKey"
  );
  const [modalEdit, setModalEdit] = useState({ modal: false, data: {} });
  const layout = {
    labelCol: { span: 7 },
    wrapperCol: { span: 16 },
  };

  const arrayActionRight = [
    {
      iconType: "edit",
      name: EDIT,
      handleAction: () => {
        setModalEdit({ modal: true, data: {} });
      },
    },
    {
      icon: <UilLock size="33" />,
      name: FORGOT_PASS_TITLE,
      handleAction: () => {
        props.openExt();
      },
    },
    {
      icon: <UilSync size="33" />,
      name: RESET_MEMORY,
      handleAction: () => {
        props.openCancel();
      },
    },
  ];

  const handleCloseModal = () => {
    setModalEdit({ modal: false, data: {} });
  };
  const langsText = useTranslate(
    "groupList",
    "deviceTranslateKey",
    "recordGalleryTranslateKey"
  );

  return (
    <>
      {/* <CheckPermission permissionCode={"VIEW_DEVICE"}> */}
        <MainTitleComponent
          breadcrumbs={[
            { name: Device, href: "/device" },
            { name: Device_Detail },
          ]}
          title={Device_Info}
        />
        <section className="info-device">
          <div className="row info-device-div ">
            <div className="col info-device-col-one">
              <div className="">
                <h3 className="label-detail-title">
                  {INFO} {Device}
                </h3>
                <div className="img-device-wrapper">
                  <img src={imgTemp} alt="" />
                </div>
              </div>
              <div className="">
                <div className="d-flex  align-items-center mt-4 mb-4">
                  <div className="circle-status circle-new" />
                  {ACTIVE}
                </div>
                <ContentComponent
                  layout={layout}
                  text={`Văn bản này không những đã tồn tại năm thế kỉ, mà khi được áp dụng vào tin học`}
                  label={Note}
                />
              </div>
            </div>
            <div  className="col info-device-col-two">
              <div>
                <h3 className="label-detail-title">DEVICE12233444h</h3>
              </div>
              {fakeData.map((item, index) => {
                return (
                  <ContentComponent
                    text={item.text}
                    label={langsText[item.label] || item.label}
                    key={index}
                  />
                );
              })}
            </div>
            <div className="col info-device-col-three">
              <div className="h-50">
                <h3 className="label-detail-title">
                  {INFO} {VERSION}
                </h3>
                <ContentComponent
                  text={`12.3 (20/02/2020)`}
                  label={OLD_VERSION}
                />
              </div>

              <div className="h-50 storage-device">
                <h3 className="label-detail-title">{MEMORY_STORAGE}</h3>

                <ContentComponent text={`512GB`} label={Memory} />
                <ContentComponent text={`123GB`} label={EMPTY} />
              </div>
            </div>
          </div>
        </section>

        <RightMenu arrayAction={arrayActionRight} />
        <ModalEditDevice
          visible={modalEdit.modal}
          onCancel={handleCloseModal}
        />
      {/* </CheckPermission> */}
    </>
  );
};

export default DetailDevice;
