import RecordGalleryEntity, { MediaRecordGalleryEntities } from "@modules/recordGallery/entity";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagination } from "@view/shared/components/TableComponent/interface";
import moment from "moment";
import PlayListEntities from "./entity";
import _ from "lodash";

export interface IPlaylist {
  layoutType: boolean;
  listPlaylist: {
    data?: PlayListEntities[];
    info?: IPagination;
  };
  listRecordGallery: MediaRecordGalleryEntities[];
  totalRecordDuration: string;
}

const playlistStore = createSlice({
  name: "playlistStore",
  initialState: {
    listPlaylist: {
      data: [],
      info: {
        pageSize: 8,
        total: 0,
        current: 1
      }
    },
    layoutType: false,
    listRecordGallery: [],
    totalRecordDuration: "--:--:--"
  } as IPlaylist,
  reducers: {
    // NEW VCPMC
    updatePlaylistList: (
      state,
      action: PayloadAction<{
        data?: PlayListEntities[];
        info?: IPagination;
      }>
    ) => {
      state.listPlaylist = { data: [...action.payload.data], info: {...state.listPlaylist.info,...action.payload.info} };
    },
    updateLayoutType: (state, action: PayloadAction<boolean>) => {
      state.layoutType = action.payload;
    },
    updateListRecordGallery: (state, action: PayloadAction<MediaRecordGalleryEntities[]>) => {
      state.listRecordGallery = action.payload;
      let totalRecordDuration: number = _.sumBy(action.payload, (item: MediaRecordGalleryEntities) => {
        return item.mediaNumberDuration
      });
      state.totalRecordDuration = moment.utc((totalRecordDuration) * 1000).format("HH:mm:ss");
    }
  },
});

export const {
  updateLayoutType,
  updatePlaylistList,
  updateListRecordGallery
} = playlistStore.actions;


export default playlistStore;
