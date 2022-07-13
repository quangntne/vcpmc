import { RootState } from "@modules/core/store/redux";
import PlayListEntities from "@modules/playlist/entity";
import { updatePlaylistList } from "@modules/playlist/playlistStore";
import Pagination from "@view/shared/components/TableComponent/Component/Pagination";
import { Col, List, Row } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ListItemPlaylist from "../ListItem";

const ListPlaylist = () => {
  const listPlaylist = useSelector(
    (state: RootState) => state.playlistStore.listPlaylist
  );

  const dispatch = useDispatch();

  return (<>
    <List
      className="main-list"
      grid={{ gutter: 32, column: 4 }}
      pagination={{
        onChange: (page) => {
          // console.debug(page);
          // return dispatch(updatePlaylistList({
          //   info: {
          //     pageNumber: page
          //   }
          // }));
        },
        pageSize: listPlaylist.info?.pageSize,
        total: listPlaylist.info?.total,
        // hideOnSinglePage: true, //nhưng sau này mới cần 
      }}
      dataSource={listPlaylist?.data}
      renderItem={(item, index) => <ListItemPlaylist data={item} />}
    />
    <Pagination pagination={{ ...listPlaylist?.info, pageSize: listPlaylist?.info?.pageSize }} onChange={(pagina) => {
      // return dispatch(updatePlaylistList({
      //   info: {
      //     pageSize: pagina.pageSize
      //   }
      // }));
    }} />
  </>
  );
};

export default ListPlaylist;
