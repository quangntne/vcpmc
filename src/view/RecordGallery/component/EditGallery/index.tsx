import * as Icon from "react-feather";
import { Form, Row, Col, Input, Select, Button } from "antd";
import { routerRecordGallery } from "@config/path";
import RecordGalleryEntity, { MediaRecordGalleryEntities } from "@modules/recordGallery/entity";
import RecordGalleryPresenter from "@modules/recordGallery/presenter";
import RightMenu, {
  IArrayAction,
} from "@view/shared/components/layout/RightMenu";
import { CameraOutlined } from '@ant-design/icons'

import MainTitleComponent, {
  Breadcrumbs,
} from "@view/shared/components/MainTitleComponent";
import { useAsync } from "@view/shared/hook/useAsync";
import React, { useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import TitleComponent from "@view/shared/components/MainTitleComponent/TitleComponent";
import CircleLabel from "@view/shared/components/CircleLabel/index";
import { validateMessages } from "@view/shared/helper/functions";
import "./../../styles.scss";
import { FolderOutlined } from "@ant-design/icons";

import {
  formInfo,
  IformInfo,
  listInfo,
  listInfoRecordGallery,
  listInfoRecordGalleryContract,
} from "@view/RecordGallery/interface";
import { translate, useTranslate } from "@view/shared/hook/useTranslate";
import { debounce } from "lodash";
import MediaCategoriesEntity from "@modules/mediaCategories/entity";
import { RootState } from "@modules/core/store/redux";
import { useSelector } from "react-redux";
const imgNoImg = require("@view/shared/assets/images/media/image 12.png");
const EditGallery = () => {
  const [form] = Form.useForm();
  const history = useHistory();
  const [imgUrl, setImgUrl] = useState<any>("");

  const params: { idRecordGallery: string } = useParams();
  const [getGalleryDetail, editMedia] = useAsync(
    RecordGalleryPresenter.getDetailMedia, RecordGalleryPresenter.editMedia
  );
  const [recordInfo, setRecordInfo] = useState<MediaRecordGalleryEntities>(null);
  useMemo(
    () =>
      getGalleryDetail
        .execute(params.idRecordGallery)
        .then((res: MediaRecordGalleryEntities) => {
          form.setFieldsValue(res)
          setRecordInfo(res)
          setImgUrl(res?.mediaThumbnail)
        })
    ,
    []
  );

  const { CANCEL, SAVE, RECORD, INFO, EDIT_INFO, RECORD_GALLERY, UPDATE, AUTHORITY_INFO } = useTranslate("recordGalleryTranslateKey");
  const breadcrumbs: Breadcrumbs[] = [
    { href: routerRecordGallery.RECORD_GALLERY, name: RECORD_GALLERY },
    { name: UPDATE + " " + INFO },
  ];
  const _lang = useTranslate("recordGalleryTranslateKey");
  const renderListInfo = (listInfo) => {
    if (recordInfo) {
      const list = listInfo(recordInfo);
      return list.map((item: listInfo, index) => {
        return (
          <Row className="row-info">
            <Col span={8} className="font-weight-bold">
              {_lang[item?.label]}:
            </Col>
            <Col span={16} className="text-right">
              {item?.text ? item?.text : "--"}
            </Col>
          </Row>
        );
      });
    }
  };

  const mediaCategories: MediaCategoriesEntity[] = useSelector((state: RootState) => state.settingStore.mediaCategories)
  const renderListForm = () => {
    return formInfo.map((item: IformInfo) => {
      const renderSelect = () => {
        return (
          <Select>
            {mediaCategories && mediaCategories.map((item: MediaCategoriesEntity) => {
              return <Select.Option value={item?.mediaCategoryId}>{item?.mediaCategoryName}</Select.Option>
            })}
          </Select>
        );
      }
      return (
        <Form.Item
          rules={[{ required: item?.require }]}
          label={translate("recordGalleryTranslateKey", item?.label)}
          name={item?.name}
        >
          {item?.render ? renderSelect() : <Input />}
        </Form.Item>
      );
    });
  };
  const handleFinish = () => {
    form.submit();
  }
  const onFinishForm = (value) => {
    const param: MediaRecordGalleryEntities = {
      ...value,
      mediaId: params.idRecordGallery,
      mediaThumbnail: imgUrl,
      mediaComment: recordInfo?.mediaComment,
      mediaExtend: recordInfo?.mediaExtend
    };
    editMedia.execute(param).then(res => {
      history.push(routerRecordGallery.RECORD_GALLERY)
    })
  }
  
  const imgSrc = (imgUrl == null || typeof imgUrl == "string")? imgUrl : URL.createObjectURL(imgUrl);
  return (
    <>
      <MainTitleComponent
        title={`Bản ghi - ${recordInfo?.mediaName}`}
        breadcrumbs={breadcrumbs}
      />

      <Row className="record-info ">
        <Col span={10}>
          <div className="record-info-card">
            <TitleComponent
              className="text-center"
              index={2}
              title={`${INFO} ${RECORD}`}
            />
            <div className="main-info">
              <div className="avatar">
                {/* <img src={imgNoImg} alt="" /> */}
                <img alt="" className="" src={imgUrl ? imgSrc : imgNoImg} />
                <div className="icon">
                  <label htmlFor="mediaThumbnail">
                    <Icon.Camera />
                  </label>
                  <input
                    hidden
                    onChange={(e) => {
                      const media: any = e.target.files[0]
                      setImgUrl(media)
                    }}
                    type="file"
                    id="mediaThumbnail"
                    readOnly
                    name="mediaThumbnail"
                    accept="image/png, image/jpeg, image/jpg"
                  />

                </div>
              </div>
              <div className="file-record text-center mt-3">
                <FolderOutlined />
                <span>{recordInfo?.mediaName}</span>
              </div>
            </div>
            {renderListInfo(listInfoRecordGallery)}
          </div>

          <div className="record-info-card">
            <TitleComponent
              className="text-center"
              index={2}
              title={AUTHORITY_INFO}
            />
            {renderListInfo(listInfoRecordGalleryContract)}
          </div>
        </Col>
        <Col span={14} className="record-info-card">
          <TitleComponent
            className="text-center"
            index={2}
            title={EDIT_INFO}
          />
          <Form
            className="quang-tran-form"
            validateMessages={validateMessages()}
            layout="vertical"
            form={form}
            onFinish={onFinishForm}
          >
            {renderListForm()}
          </Form>
        </Col>
      </Row>
      <div className="text-center mt-3">
        <div className="mx-auto">
          <Button type="default" className="cancel-button mr-5" onClick={() => history.push(routerRecordGallery.RECORD_GALLERY)}>
            {CANCEL}
          </Button>
          <Button type="default" className="normal-button" onClick={handleFinish} >
            {SAVE}
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditGallery;
