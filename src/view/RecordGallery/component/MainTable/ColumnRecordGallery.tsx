import { routerRecordGallery } from "@config/path";
//import MediaEntity from "@modules/media/entity";
import { MediaRecordGalleryEntities } from "@modules/recordGallery/entity";
import CircleLabel from "@view/shared/components/CircleLabel";
import { Space, Typography } from "antd";
import moment from "moment";
import React from "react";
import { useHistory } from "react-router";
import _ from "lodash";
import { translate, useTranslate } from "@view/shared/hook/useTranslate";

const { Title, Text } = Typography;
const now = moment();
const ColumnRecordGallery = (clickToPreview, approval) => {
  const history = useHistory();
  const {UPDATE, LISTEN} = useTranslate("recordGalleryTranslateKey");
  const allColumn = [
    {
      title: "RECORD_NAME",
      dataIndex: "mediaName",
      width: "217",
      className: "record-name-width",
    },
    {
      title: "ISRC",
      dataIndex: "isrcCode",
      ellipsis: true,
      className: "text-isrc",
    },

    {
      title: "DURATION",
      dataIndex: "mediaDuration",
      className: "text-right pr-3"
    },

    {
      title: "SINGER",
      dataIndex: "mediaPerformer",
      className: "singer-width",
      ellipsis: true,
      
    },
    {
      title: "WRITERS",
      dataIndex: "mediaAuthor",
      
    },
    {
      title: "TYPE",
      dataIndex: "mediaCategoryName",
      
    },

    {
      title: "FORMAT",
      dataIndex: "mediaFormatName",
    },

    {
      title: "EX_DATE",
      dataIndex: "mediaExpirationTime",
      render: (text, record: MediaRecordGalleryEntities) => (
        <>
          {record.mediaShelfLifeStatus == 1 ? (
            <CircleLabel text={"Còn thời hạn"} colorCode={"green"} />
          ) : (
            <CircleLabel text={"Đã hết hạn"} colorCode={"grey"} />
          )}
          <p className="expire-text mb-0">
            {moment(record.mediaExpirationTime).format("DD/MM/YYYY")}
          </p>
        </>
      ),
    },
    {
      dataIndex: "action",
      render: (text, record: MediaRecordGalleryEntities) => {
        return (
          <a
            className="link-table mr-5"
            onClick={() =>
              history.push(
                routerRecordGallery.EDIT_RECORD_GALLERY + "/" + record.mediaId
              )
            }
          >
            {UPDATE}
          </a>
        );
      },
    },

    {
      dataIndex: "action",
      render: (text, record: MediaRecordGalleryEntities) => {
        return (
          <a
            className="link-table mr-5"
            onClick={() => {
              clickToPreview(record);
            }}
          >
            {LISTEN}
          </a>
        );
      },
    },
    {
      title: "DOWNLOAD_DATE",
      dataIndex: "mediaCreateAt",
    },
  ];

  let returnArray = allColumn.map(item => {
    item.title = translate("recordGalleryTranslateKey", item.title)
    return item;
  });

  if (approval == true) {
    let returnArr = _.remove(returnArray, (item) => {
      return (
        item == returnArray[allColumn.length - 1]
       );
    });
  } else {
    returnArray = new Array(
      allColumn[0],
      allColumn[3],
      allColumn[4],
      allColumn[1],
      allColumn[allColumn.length - 1],
      allColumn[allColumn.length - 2],
    );
  }

  return returnArray;
};
export default ColumnRecordGallery;
