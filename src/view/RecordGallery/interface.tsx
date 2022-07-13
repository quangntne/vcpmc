import RecordGalleryEntity, { MediaRecordGalleryEntities } from "@modules/recordGallery/entity";
import { ReactNode } from "react";
import CircleLabel from "@view/shared/components/CircleLabel/index";
import React from "react";
import { Form, Row, Col, Input, Select, Button } from "antd";
import moment from "moment";
import RecordGalleryPresenter from "@modules/recordGallery/presenter";
import { RootState } from "@modules/core/store/redux";
import { useSelector } from "react-redux";
import { ISelectData } from "@view/shared/components/SelectAndLabelConponent";

export interface listInfo {
  label: any;
  text: React.ReactNode;
}

export const listInfoRecordGalleryContract = (info: MediaRecordGalleryEntities) => {
  return [
    {
      label: "AU_DATE",
      text: info?.mediaCreateAt,
    },
    {
      label: "EXPIRATION_DATE",
      text: info?.mediaExpirationTime,
    },
    {
      label: "STATUS",
      text: (
        <CircleLabel
          className="justify-content-end"
          colorCode={info?.mediaShelfLifeStatus == 1 ? "green" : "grey"}
          // Expired = 0, Unexpired = 1, Undue = 2
          text={info?.mediaShelfLifeStatus == 1 ? "Đang hoạt động" : "Hết hạn"}
        />
      ),
    },
  ];
};

export interface IformInfo {
  require: boolean;
  label: string;
  name: string;
  render?: React.ReactNode;
}
export const formInfo: IformInfo[] = [
  {
    require: true,
    label: "RECORD_NAME",
    name: "mediaName",
  },
  {
    require: true,
    label: "ISRC",
    name: "isrcCode",
  },
  {
    require: true,
    label: "SINGER",
    name: "mediaPerformer",
  },
  {
    require: true,
    label: "WRITERS",
    name: "mediaAuthor",
  },
  {
    require: false,
    label: "PRODUCER",
    name: "mediaProducer",
  },
  {
    require: true,
    label: "TYPE",
    name: "mediaCategoryId",
    render: "ở đây có ô select"
  },
];

export const listInfoRecordGallery = (info: MediaRecordGalleryEntities) => {

  return [
    {
      label: "ADD_DAY",
      text: info?.mediaCreateAt,
    },
    {
      label: "UPLOADER",
      text: info?.mediaCreator?.userName,
    },
    {
      label: "APPROVE_BY",
      text: info?.mediaTypeApproval == 0 ? "Duyệt bởi người dùng" : "Hệ thống tự động phê duyệt",
    },
    {
      label: "DATE_APP",
      text: info?.mediaApproverTime
    },
  ];
};
export interface IFilterGallerySelect {
  defaultValue: string,
  label: string,
  store?: string,
  paramToCallApi?: string,
  option: Array<ISelectData>
}
export interface IpaginationListMedia {
  pageSize: number,
  total: number,
  current: number,
  MediaStatus: number,
  MediaCategoryId?: string,
  MediaFormatId?: string,
  MediaShelfLifeStatus?: string,
  MediaTypeApproval?: string,
  search?: string
}
export const listFilterGallerySelect: IFilterGallerySelect[] = [
  {
    defaultValue: "Tất cả",
    label: "TYPE",
    store: "mediaCategories",
    paramToCallApi: "MediaCategoryId",
    option: [{
      value: null,
      name: "Tất cả",
    },]
  },
  {
    defaultValue: "Tất cả",
    label: "FORMAT",
    store: "mediaFormat",
    paramToCallApi: "MediaFormatId",
    option: [{
      value: null,
      name: "Tất cả",
    },],
  },
  {
    //Expired = 0, Unexpired = 1, Undue = 2
    defaultValue: "Tất cả",
    label: "EX_DATE",
    paramToCallApi: "MediaShelfLifeStatus",
    option: [
      {
        value: null,
        name: "Tất cả",
      },
      {
        value: 1,
        name: "Còn thời hạn",
      },
      {
        value: 0,
        name: "Hết hạn",
      },
    ],
  },

  {
    //1 :user 2:system
    defaultValue: "Tất cả",
    paramToCallApi: "MediaTypeApproval",
    label: "STATUS",
    option: [
      {
        value: null,
        name: "Tất cả",
      },
      {
        value: 1,
        name: "Duyệt bởi người dùng",
      },
      {
        value: 2,
        name: "Duyệt tự động",
      },
    ],
  },
];

