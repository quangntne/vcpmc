import RecordGalleryEntity, { MediaRecordGalleryEntities } from "@modules/recordGallery/entity";
import React from "react";
import { SortableHandle } from "react-sortable-hoc";
import { MenuOutlined } from "@ant-design/icons";
import * as Icon from "react-feather";
import { useSelector } from "react-redux";

import { translate, useTranslate } from "@view/shared/hook/useTranslate";
const DragHandle = SortableHandle(() => (
  <MenuOutlined style={{ cursor: "grab", color: "#999" }} />
));
interface Iprops {
  handleDeleteRecord: any;
  recordType: "addNew" | "selected" | "list" | "edit" | "detail";
  clickToPreview: any;
  recordsSelected: RecordGalleryEntity[];
}
const columnRecord = (
  handleDeleteRecord,
  recordType,
  clickToPreview,
  recordsSelected
): Iprops => {
  // const recordsSelected = useSelector(
  //   (state: RootState) => state.playlistStore.listRecordGallery
  // );
  const { LISTEN, REMOVE } = useTranslate("recordGalleryTranslateKey");
  const { ADD } = useTranslate("common");
  const renderAction = (record) => {
    let disable = false;

    if (recordType == "list" && recordsSelected) {
      disable =
        recordsSelected.findIndex(
          (item: RecordGalleryEntity) => item.mediaId == record.mediaId
        ) == -1
          ? false
          : true;
    }

    if (
      recordType == "selected" ||
      recordType == "addNew" ||
      recordType == "edit" || recordType == "detail"
    ) {
      return (
        <a
          className="link-table"
          onClick={() => handleDeleteRecord(record.mediaId, true)}
        >
          {REMOVE}
        </a>
      );
    } else {
      if (disable) {
        return <a className={`link-table disable`}>{ADD}</a>;
      } else {
        return (
          <a
            className={`link-table `}
            onClick={() => {
              handleDeleteRecord(record.mediaId, false);
            }}
          >
            {ADD}
          </a>
        );
      }
    }
  };
  const column = [
    {
      dataIndex: "sort",
      width: 30,
      className: "drag-visible",
      render: () => <DragHandle />,
    },
    {
      title: "RECORD_NAME",
      dataIndex: "mediaName",
      render: (text, record: MediaRecordGalleryEntities) => {
        return (
          <div>
            <div>{record?.mediaName}</div>
            <div className="more-note-media">
              {record?.mediaCategoryName || "--"}
              <span className="icon table-icon">
                <Icon.Circle size="10" className="icon-feather" />
              </span>
              {record?.mediaFormatName || "--"}
              <span className="icon table-icon">
                <Icon.Circle size="10" className="icon-feather" />
              </span>
              {record?.mediaDuration}
            </div>
          </div>
        );
      },
    },
    {
      title: "SINGER",
      dataIndex: "mediaPerformer"
    },
    {
      title: "WRITERS",
      dataIndex: "mediaProducer",
    },
    {
      title: "",
      key: "action",
      width: 200,
      render: (text, record, index) => {
        return (
          <>
            <a
              className="mr-5 link-table"
              onClick={() => clickToPreview(record)}
            >
              {LISTEN}
            </a>
            {renderAction(record)}
          </>
        );
      },
    },
  ];
  if (
    recordType == "detail" ||
    recordType == "addNew" ||
    recordType == "edit"
  ) {
    const returnCol = column.splice(0, 1);
  } else if (recordType == "selected") {
    // const returnCol = column.splice(1, 1);
  } else if (recordType == "list") {
    const returnCol = column.splice(0, 1);
  }
  // @ts-ignore
  return column;
};

export default columnRecord;
