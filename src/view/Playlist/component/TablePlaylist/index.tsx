import { RootState } from "@modules/core/store/redux";
import {
  updateListRecordGallery,
  updatePlaylistList,
} from "@modules/playlist/playlistStore";
import playlistPresenter from "@modules/playlist/presenter";
import ChangeLayoutButton from "@view/RecordGallery/component/ChangeLayout";
import RightMenu, {
  IArrayAction,
} from "@view/shared/components/layout/RightMenu";
import SearchComponent from "@view/shared/components/SearchComponent/SearchComponent";
import useTable from "@view/shared/components/TableComponent/hook";
import { InitPagination } from "@view/shared/components/TableComponent/interface";
import { useAsync } from "@view/shared/hook/useAsync";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { common, playlistTranslateKey } from "@view/shared/translateKey";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import TablePlaylist from "./TablePlaylist";
import CheckPermission from "@view/shared/hoc/CheckPermission";
import ListPlaylist from "./ListPlaylist";
import { routerPlaylist } from "@config/path";
import { debuglog } from "util";

const TableData = () => {
  const register = useTable();
  const layoutType = useSelector(
    (state: RootState) => state.playlistStore.layoutType
  );
  const [getList] = useAsync(playlistPresenter.getListPlayList);
  const { ADD } = useTranslate("common");
  const { PLAYLIST } = useTranslate("playlistTranslateKey");
  const history = useHistory();
  const dispatch = useDispatch();
  const arrayAction: Array<IArrayAction> = [
    {
      name: `${ADD} ${PLAYLIST}`,
      handleAction: () => {
        history.push(routerPlaylist.ADD_PLAYLIST);
        dispatch(updateListRecordGallery([]));
      },
      permissionCode: "PLAYLIST_CREATE_FE",
      iconType: "add",
    },
  ];
  const info = useSelector((state: RootState) => state.playlistStore.listPlaylist.info)
  useEffect(() => {
    getList.execute(info).then((res) => {
      dispatch(updatePlaylistList(res));
    });
  }, []);

  const onSearch = (value) => {
    register.fetchData({
      pagination: { current: 1 },
      option: { search: value },
    })
    dispatch(updatePlaylistList({ info: { search: value } }))
  }
  return (
    <>
      <div className="float-right">
        <ChangeLayoutButton />
      </div>
      <SearchComponent
        placeholder={PLAYLIST}
        onSearch={onSearch}
        classNames="w-500px mb-3"
      />
      {layoutType ? <TablePlaylist table={register}/> : <ListPlaylist />}
      <RightMenu arrayAction={arrayAction} />
    </>
  );
};

export default TableData;
