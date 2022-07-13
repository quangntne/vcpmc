//import useTimeLineListMedia from "@view/MediaLibrary/Components/TimeLineListMedia/useTimeLineListMedia";
import { MediaRecordGalleryEntities } from "@modules/recordGallery/entity";
import Pagination from "@view/shared/components/TableComponent/Component/Pagination";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { List } from "antd";
import React, { useEffect, useState } from "react";
import ItemMediaTimeLine from "../ItemMedia";
interface IListApproval {
  pagi: any;
  setPagi: any;
  isApprove: any;
  loading: any;
  listRecordGallery: any;
  register?: any;
}
const ListApprovalGallery = (props: IListApproval) => {
  const { pagi, setPagi, isApprove, loading, listRecordGallery, register } = props;
  const { NO_RECORD } = useTranslate("recordGalleryTranslateKey");
  const [state, setState] = useState<number>(1);
  useEffect(() => {
    setState(state+1);
  }, [register])
  return (
    <>
      <List
        className="main-list"
        loading={loading}
        grid={{ gutter: 32, column: 4 }}
        pagination={{
          onChange: (page) => {
            setPagi(prev => ({ ...prev, current: page }))
          },
          pageSize: pagi?.pageSize,
          total: pagi?.total,
          hideOnSinglePage: true,
        }}
        dataSource={listRecordGallery}
        locale={{
          emptyText: (
            <>
              <div className="no-data-list">{NO_RECORD}</div>
            </>
          ),
        }}
        renderItem={(item: MediaRecordGalleryEntities, index) => {
          return <ItemMediaTimeLine
            data={item} isApprove={isApprove}
          />;
        }}
      />
      <Pagination
        pagination={{ ...pagi, pageSize: pagi?.pageSize }}
        onChange={(pagina) => {
          setPagi(pagina)
        }
        }
      />
    </>
  );
};

export default ListApprovalGallery;
