import { routerRecordGallery } from "@config/path";
import RightMenu, {
  IArrayAction,
} from "@view/shared/components/layout/RightMenu";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import SearchComponent from "@view/shared/components/SearchComponent/SearchComponent";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import "./styles.scss"; import { useDispatch, useSelector } from "react-redux";
import ChangeLayoutButton from "./component/ChangeLayout";
import { RootState } from "@modules/core/store/redux";
import ListApprovalGallery from "./component/ApprovalGallery/ListApprovalGallery";
import { translate, useTranslate } from "@view/shared/hook/useTranslate";
import useTimeLineListMedia from "./useTimeLineListMedia";
import useTable from "@view/shared/components/TableComponent/hook";
import TableApprovalGallery from "./component/ApprovalGallery/TableApprovalGallery";
import FilterGallery from "./component/MainTable/FilterGallery";
import { useAsync } from "@view/shared/hook/useAsync";
import RecordGalleryPresenter from "@modules/recordGallery/presenter";
import { setListItemMediaId } from "@modules/recordGallery/recordGalleryStore";
import { IpaginationListMedia } from "./interface";
const RecordGallery = () => {
  const history = useHistory();
  const layoutType = useSelector(
    (state: RootState) => state.playlistStore.layoutType
  );
  const [getList] = useAsync(RecordGalleryPresenter.getListNewMedia);
  const { clickToPreview } = useTimeLineListMedia();
  const table = useTable();
  const { APPROVAL_MANAGERMENT } = useTranslate("recordGalleryTranslateKey");
  const arrayAction: IArrayAction[] = [
    {
      iconType: "edit",
      name: APPROVAL_MANAGERMENT,
      handleAction: () => {
        history.push(routerRecordGallery.APPROVAL_RECORD_GALLERY);
      },
    },
  ];
  const [keyRow, setKeyRow] = useState([]);
  const dispatch = useDispatch();

  const [pagi, setPagi] = useState<IpaginationListMedia>({ pageSize: 8, total: 0, current: 1, MediaStatus: 1 });
  // onChange select filter 
  const onChangeSelect = (value: string | number, param: string) => {
    if (value || param) {
      if (layoutType) {
        // for table 
        table.fetchData({
          option: { [param]: value }
        })
      } else {
        // for list 
        setPagi(prev => ({ ...prev, [param]: value }));
      }
    }
  };
  const onSearch = (value) => {
    if (layoutType) {
      table.fetchData({ option: { search: value } })
    } else {
      setPagi(prev => ({ ...prev, search: value }))
    }

  }
  const [listRecordGallery, setListRecordGallery] = useState([]);
  const loading = getList.status == "loading";

  useEffect(() => {
    getList.execute(pagi).then((res) => {
      setPagi(prev => ({ ...prev, total: res.info.total }));
      setListRecordGallery(res.data);
      dispatch(setListItemMediaId(res.data))
    });
  }, [pagi.current, pagi.MediaCategoryId, pagi.MediaFormatId, pagi?.MediaShelfLifeStatus, pagi?.MediaTypeApproval, pagi?.search]);

  const { RECORD_GALLERY } = useTranslate("recordGalleryTranslateKey");
  return (
    <div>
      <MainTitleComponent title={RECORD_GALLERY} />
      <RightMenu arrayAction={arrayAction} />
      <SearchComponent classNames="" onSearch={onSearch} />
      <div className="gallery-filter mt-3">
        <FilterGallery onChangeSelect={onChangeSelect} isApprove={true} />
        <ChangeLayoutButton />
      </div>
      {layoutType ? (
        <TableApprovalGallery setKeyRow={setKeyRow} keyRow={keyRow} table={table} isApprove={true} clickToPreview={clickToPreview} />
      ) : (
        <ListApprovalGallery
          pagi={pagi}
          isApprove={true}
          setPagi={setPagi}
          loading={loading}
          listRecordGallery={listRecordGallery}
        />
      )}
      {/* <ModalPreview /> */}
    </div>
  );
};

export default RecordGallery;
