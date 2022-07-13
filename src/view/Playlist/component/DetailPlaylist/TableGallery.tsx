import React from "react";
import TableComponent from "@view/shared/components/TableComponent";
import playlistPresenter from "@modules/playlist/presenter";
import RecordGalleryPresenter from "@modules/recordGallery/presenter";
import * as Icon from "react-feather";
import RecordGalleryEntity from "@modules/recordGallery/entity";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "@modules/core/store/redux";
export const columnsRecordInPlaylist = [
  {
    title: "Tên bản ghi",
    dataIndex: "mediaName",
    render: (text, record: RecordGalleryEntity) => {
      return (
        <>
          <div>{record?.mediaName}</div>
          <div>
            {record?.mediaExtend?.category}
            <span className="icon table-icon">
              <Icon.Circle size="10" className="icon-feather" />
            </span>
            {record?.mediaTypeCode}
            <span className="icon table-icon">
              <Icon.Circle size="10" className="icon-feather" />
            </span>
            {record?.mediaDuration}
          </div>
        </>
      );
    },
  },
  {
    title: "Ca sĩ",
    dataIndex: "single",
    render: (text, record: RecordGalleryEntity) => record?.mediaExtend?.artist,
  },
  {
    title: "Tác giả",
    dataIndex: "author",
    render: (text, record: RecordGalleryEntity) => {
      record.mediaExtend.writers;
    },
  },
  {
    title: "",
    key: "action",
    render: (text, record) => (
      <>
        <a className="mr-5 link-table">Nghe</a>
        <a className="link-table">Gỡ</a>
      </>
    ),
  },
];
const TableGallery = () => {
  const listRecord = useSelector(
    (state: RootState) => state.playlistStore.listRecordGallery
  );

  const api = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res({
          data: listRecord,
          info: {
            total: listRecord.length,
          },
        });
      }, 100);
    });
  };
  return (
    <>
      <TableComponent columns={columnsRecordInPlaylist} apiServices={api}  />
    </>
  );
};

export default TableGallery;
