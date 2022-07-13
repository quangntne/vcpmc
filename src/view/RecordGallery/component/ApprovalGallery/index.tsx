import React, { useEffect, useState } from "react";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import RightMenu, {
  IArrayAction,
} from "@view/shared/components/layout/RightMenu";
import SearchComponent from "@view/shared/components/SearchComponent/SearchComponent";
import { Checkbox } from "antd";
import ChangeLayoutButton from "../ChangeLayout";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@modules/core/store/redux";
import TableApprovalGallery from "./TableApprovalGallery";
import ListApprovalGallery from "./ListApprovalGallery";
import { routerRecordGallery } from "@config/path";
import "./../../styles.scss";
import { useAsync } from "@view/shared/hook/useAsync";
import RecordGalleryPresenter from "@modules/recordGallery/presenter";
import { clearItemSelect, selectAll, setListItemMediaId } from "@modules/recordGallery/recordGalleryStore";
import { useTranslate } from "@view/shared/hook/useTranslate";
import useTimeLineListMedia from "@view/RecordGallery/useTimeLineListMedia";
import FilterGallery from "../MainTable/FilterGallery";
import useTable from "@view/shared/components/TableComponent/hook";
import ModalCancelBusinessContract from "@view/BusinessContract/component/ModalCancelBusinessContract";
import { IpaginationListMedia } from "@view/RecordGallery/interface";

const ApprovalGallery = () => {
  const [pagi, setPagi] = useState<IpaginationListMedia>({ pageSize: 8, total: 0, current: 1, MediaStatus: 0 });
  const dispatch = useDispatch();
  const layoutType = useSelector(
    (state: RootState) => state.playlistStore.layoutType
  );
  const [keyRow, setKeyRow] = useState([]);
  const [getList] = useAsync(RecordGalleryPresenter.getListNewMedia);
  const loading = getList.status == "loading";
  const [listRecordGallery, setListRecordGallery] = useState([]);
  const [reRenderList, setReRenderList] = useState(1);

  useEffect(() => {
    getList.execute(pagi).then((res) => {
      setPagi(prev => ({ ...prev, total: res.info.total }));
      setListRecordGallery(res.data);
      dispatch(setListItemMediaId(res.data))
    });
  }, [pagi.current, pagi.MediaCategoryId, pagi.MediaFormatId, reRenderList, pagi?.search]);
  const [apiApproveMedia, apiRefuseMedia] = useAsync(RecordGalleryPresenter.approveManyMedia, RecordGalleryPresenter.refuseApproveManyMedia);
  const [visibleReject, setVisibleReject] = useState<boolean>(false);
  const { clickToPreview } = useTimeLineListMedia();
  const { itemSelected, indeterminate, checkAll } = useSelector((state: RootState) => state.recordGalleryStore);

  const { APPROVAL, DENIED, RECORD_GALLERY, RECORD, SELECT_ALL, REASON_REJECT } = useTranslate("recordGalleryTranslateKey")
  const disableApprovelButton = layoutType ? keyRow.length < 1 : itemSelected.length < 1;
  const arrayAction: IArrayAction[] = [
    {
      iconType: "check",
      name: APPROVAL,
      handleAction: () => {
        const param = layoutType ? keyRow : itemSelected;
        apiApproveMedia.execute(param).then(res => {
          afterCallApiApproveSuccess()
        })
      },
      disable: disableApprovelButton
    },
    {
      iconType: "cancel",
      name: DENIED,
      handleAction: () => {
        setVisibleReject(true);
      },
      disable: disableApprovelButton

    },
  ];
  const afterCallApiApproveSuccess = () => {
    if (layoutType) {
      // for table 
      table.fetchData();
    } else {
      // for list 
      setReRenderList(reRenderList + 1);
      dispatch(clearItemSelect());
    }
  }

  const table = useTable();
  const onChangeSelect = (value: string | number | null, param: string) => {
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

  const onSearch = (value = "") => {
    if (layoutType) {
      table.fetchData({ option: { search: value } })
    } else {
      setPagi(prev => ({ ...prev, search: value }))
    }
  }
  const onFinishReason = (value) => {
    const param = {
      mediaReasonsRefusalApproval: value?.reason,
      mediaIds: layoutType ? keyRow : itemSelected
    }
    apiRefuseMedia.execute(param).then(res => {
      afterCallApiApproveSuccess
    })
  }
  return (
    <div>
      <MainTitleComponent
        breadcrumbs={[
          { href: routerRecordGallery.RECORD_GALLERY, name: RECORD_GALLERY },
          { name: APPROVAL + " " + RECORD },
        ]}
      />
      <RightMenu arrayAction={arrayAction} />

      <SearchComponent onSearch={onSearch} />
      <div className="list-gallery-approval-filter">
        <div className="  gallery-approval-filter">
          <FilterGallery onChangeSelect={onChangeSelect} isApprove={false} />
          {!layoutType ? (
            <div className="checkbox-all">
              <Checkbox checked={checkAll} onChange={(e) => dispatch(selectAll(e))} indeterminate={indeterminate} className="checked mr-2 text-color">{SELECT_ALL}</Checkbox>
            </div>
          ) : (
            ""
          )}
        </div>
        <ChangeLayoutButton />
      </div>
      {layoutType ? (
        <TableApprovalGallery keyRow={keyRow} setKeyRow={setKeyRow} table={table} isApprove={false} clickToPreview={clickToPreview} />
      ) : (
        <ListApprovalGallery
          isApprove={false}
          pagi={pagi}
          loading={loading}
          setPagi={setPagi}
          listRecordGallery={listRecordGallery}
          register={reRenderList}
        />
      )}
      <ModalCancelBusinessContract onFinishReason={onFinishReason} setVisible={setVisibleReject} visible={visibleReject}
        mainTitle={REASON_REJECT}
        placeholderTitle={RECORD_GALLERY}
        required={true}
      />

    </div>
  );
};

export default ApprovalGallery;
