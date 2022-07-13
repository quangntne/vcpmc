import React, { useState } from "react";
import TableData from "./component/TablePlaylist";

import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import "./styles.scss";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { playlistTranslateKey } from "@view/shared/translateKey";
import CheckPermission from "@hoc/CheckPermission";

const Playlist = () => {
  const { PLAYLIST_MANAGEMENT } = useTranslate("playlistTranslateKey");

  return (
    // <CheckPermission permissionCode={"PLAYLIST_MENU"}>
      <div>
        <MainTitleComponent title={PLAYLIST_MANAGEMENT} />
        <TableData />
      </div>
    // </CheckPermission>
  );
};

export default Playlist;
