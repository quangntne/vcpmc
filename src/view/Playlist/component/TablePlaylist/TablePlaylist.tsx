import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ColumnPlaylist from "./ColumnPlaylist";
import playlistPresenter from "@modules/playlist/presenter";
import { RootState } from "@modules/core/store/redux";
import { InitPagination } from "@view/shared/components/TableComponent/interface";
import TableComponent from "@view/shared/components/TableComponent";

const TablePlaylist = ({table}) => {
  const [pagi, setPagi] = useState(InitPagination);
  const listPlaylist = useSelector(
    (state: RootState) => state.playlistStore.listPlaylist
  );
  useEffect(() => {
    if (listPlaylist?.info) {
      setPagi(listPlaylist?.info);
    }
  }, []);

  return (
    <>
      <TableComponent
      register={table}
        apiServices={playlistPresenter.getListPlayList}
        columns={ColumnPlaylist()}
      />
    </>
  );
};

export default TablePlaylist;
