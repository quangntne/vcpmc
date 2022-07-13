import { RootState } from "@modules/core/store/redux";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLayoutType } from "@modules/playlist/playlistStore";
import * as Icon from "react-feather";

const ChangeLayoutButton = () => {
  const layoutType = useSelector(
    (state: RootState) => state.playlistStore.layoutType
  );
  const dispatch = useDispatch();

  return (
    <div className="change-layout-gallery">
      <a
        className={layoutType ? "active" : ""}
        onClick={() => {
          dispatch(updateLayoutType(true));
        }}
      >
        <Icon.List />
      </a>
      <a
        className={layoutType ? "" : "active"}
        onClick={() => {
          dispatch(updateLayoutType(false));
        }}
      >
        <Icon.Grid />
      </a>
    </div>
  );
};

export default ChangeLayoutButton;
