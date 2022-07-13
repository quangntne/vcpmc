import React, { useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
// import Cropper from "react-cropper";
import "./UploadMediaComponent.scss";
import LazyLoadImage from "../LazyLoadImage/LazyLoadImage";
const iconPhoto = require("@assets/icon/fa-Photo.svg");
// import "cropperjs/dist/cropper.css";
import Modal from "antd/lib/modal/Modal";

// import { CommonTranslateKey } from "@shared/TranslateKey/ImportTranslateKey";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { common } from "@view/shared/translateKey";
import { Button } from "antd";

interface IProps {
  media: string;
  onChange: (media) => void;
  height?: any;
}

const UploadMediaComponent = (props: IProps) => {
  const [modal, setModal] = useState({
    visible: false,
    data: null,
    image: null,
  });

  const { DROP, CLICK, CANCEL, SAVE } = useTranslate("common");
  const refInput = useRef(null);

  const [cropData, setCropData] = useState("#");
  const [cropper, setCropper] = useState<any>();
  const [fileDetail, setFileDetail] = useState();
  const [fileUpload, setFileUpload] = useState();
  const reader = new FileReader();

  // console.log(fileUpload);

  function urltoFile(url, filename, mimeType) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  console.log(cropData);

  // const getCropData = () => {
  //   refInput.current.value = "";

  //   const url = cropper.getCroppedCanvas().toDataURL();
  //   if (typeof cropper !== "undefined") {
  //     setCropData(url);
  //     // props.onChange(cropper.imageData)
  //     setModal({ visible: false });
  //   }

  //   urltoFile(url, fileDetail.name, fileDetail.type).then(function (file) {
  //     // console.log(file);
  //     setFileUpload(file);
  //     props.onChange(file);
  //   });
  // };

  const handleChangeCropImage = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setModal((prev) => ({
        ...prev,
        visible: true,
        image: reader.result as any,
      }));
    };
    reader.readAsDataURL(files[0]);

    setFileDetail(files[0]);

    // return props.onChange(e.target.files[0]);
  };
  const handleCancel = () => {
    refInput.current.value = "";
    setModal({
      visible: false,
      data: null,
      image: null,
    });
  };

  return (
    <div className="upload-component w-100">
      <label htmlFor="input-media" className="w-100">
        <div className="wrap-open-modal w-100 h-100">
          <div
            className="wrap-image d-flex"
            style={{
              height: props.height || "300px",
              justifyContent: "center",
            }}
          >
            {props.media && (
              <LazyLoadImage
                src={typeof props.media == "string" ? props.media : cropData}
                alt={"media"}
              />
            )}
            {props.media ? "" : <img src={iconPhoto} alt="Photo" />}
            <div className="open-modal" style={{ textAlign: "center" }}>
              <PlusOutlined />
              <p>{CLICK}</p>
            </div>
          </div>
        </div>
      </label>
      <input
        onChange={handleChangeCropImage}
        type="file"
        id="input-media"
        ref={refInput}
        name="input-media"
        accept="image/png, image/jpeg"
      />
      <Modal
        visible={modal.visible}
        // onOk={getCropData}
        maskClosable={false}
        onCancel={handleCancel}
        okText={DROP}
        cancelText={CANCEL}
        footer={null}
      // title={CROP}
      >
        <div style={{ marginTop: "40px" }}>
          <div>
            {/* <Cropper
              // style={{ height: "297px",}}
              aspectRatio={3 / 1}
              // preview=".img-preview"
              src={modal.image}
              viewMode={1}
              guides={true}
              // minCropBoxHeight={10}
              // minCropBoxWidth={10}
              background={false}
              responsive={true}
              autoCropArea={1}
              checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
              onInitialized={(instance) => {
                // console.log(instance);
                setCropper(instance);
              }}
            /> */}
          </div>
          <div style={{ width: "100%", textAlign: "right", marginTop: "10px" }}>
            <Button className="cancel-button mr-2" onClick={handleCancel}>
              {CANCEL}
            </Button>
            <Button
              className="normal-button"
            // onClick={getCropData}
            // loading={checkloading()}
            >
              {DROP}
            </Button>
          </div>
          {/* <div>
            <div className="box" style={{ width: "100%", float: "right", overflow: "hidden" }}>
              <h1>Preview</h1>
              <div
                className="img-preview"
                style={{ width: "100%", height: "200px" }}
              />
            </div>

          </div>
          <br style={{ clear: "both" }} /> */}
        </div>
      </Modal>
    </div>
  );
};

export default UploadMediaComponent;
