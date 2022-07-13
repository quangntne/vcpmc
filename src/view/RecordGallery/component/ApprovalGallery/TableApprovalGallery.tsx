import RecordGalleryEntity, { MediaRecordGalleryEntities } from "@modules/recordGallery/entity";
import RecordGalleryPresenter from "@modules/recordGallery/presenter";
import TableComponent from "@view/shared/components/TableComponent";
import { useTranslate } from "@view/shared/hook/useTranslate";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import ColumnRecordGallery from "../MainTable/ColumnRecordGallery";
import { useAsync } from "@view/shared/hook/useAsync";

const TableApprovalGallery = ({ table, clickToPreview, isApprove, keyRow, setKeyRow }) => {
  const { NO_RECORD } = useTranslate("recordGalleryTranslateKey");

  // Checkbox selection
  const rowSelection = {
    selectedRowKeys: keyRow,
    onChange: (selectedRowKeys, selectedRows) => {
      setKeyRow(selectedRowKeys);
    },
  };
  const onClickCheckbox = (record: RecordGalleryEntity) => {
    const selectedRowKeys = [...keyRow];
    if (selectedRowKeys.indexOf(record.mediaId) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.mediaId), 1);
    } else {
      selectedRowKeys.push(record.mediaId);
    }
    setKeyRow(selectedRowKeys);
  }

  const column = ColumnRecordGallery(clickToPreview, isApprove);
  const returnTable = {
    className: "main-table",
    register: table,
    columns: column,
    apiServices: RecordGalleryPresenter.getListNewMedia,
    locale: {
      emptyText: (
        <>
          <div className="no-data">
            {NO_RECORD}
          </div>
        </>
      ),
    }
  }

  return (
    <>
      <TableComponent
        //just CHECKBOX, ko co cung duoc
        defaultOption={!isApprove ? { MediaStatus: 0 } : { MediaStatus: 1 }}
        rowKey={(record: MediaRecordGalleryEntities) => record.mediaId}
        rowSelection={isApprove ? undefined : { type: "checkbox", ...rowSelection }}
        onRow={(record, rowIndex) => ({
          onClick: () => onClickCheckbox(record),
        })}
        {...returnTable}
      />

    </>
  );
};

export default TableApprovalGallery;
