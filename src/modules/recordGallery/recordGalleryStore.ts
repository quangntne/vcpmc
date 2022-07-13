import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPagination } from "@view/shared/components/TableComponent/interface";
import RecordGalleryEntity, { MediaRecordGalleryEntities } from "./entity";

interface IrecordGalleryStore {
  listGallery: {
    data: MediaRecordGalleryEntities[],
    info: IPagination
  };
  indeterminate: boolean;
  checkAll: boolean;
  itemSelected: Array<string>;
  listItemMediaId: Array<string>;
}


const recordGalleryStore = createSlice({
  name: "recordGalleryStore",
  initialState: {
    itemSelected: [],
    indeterminate: false,
    checkAll: false,
    listItemMediaId: [],
  } as IrecordGalleryStore,
  reducers: {
    clearItemSelect: (state) => {
      state.itemSelected = [];
      state.indeterminate = false;
      state.checkAll = false;
    },
    selectItem: (state: any, action: PayloadAction<any>) => {
      const arrayItemSelected = [...state.itemSelected];
      if (arrayItemSelected.indexOf(action.payload) >= 0) {
        arrayItemSelected.splice(arrayItemSelected.indexOf(action.payload), 1);
      } else {
        arrayItemSelected.push(action.payload);
      }
      state.indeterminate = arrayItemSelected.length != 0 && arrayItemSelected.length < state.listItemMediaId.length;
      state.checkAll = arrayItemSelected.length == state.listItemMediaId.length;
      state.itemSelected = arrayItemSelected;
    },
    selectAll: (state: IrecordGalleryStore, action: PayloadAction<any>) => {
      const checked = action.payload.target.checked;
      console.debug(checked, ".target.checked");
      state.itemSelected= checked? state.listItemMediaId : [];
      state.indeterminate = false;
      state.checkAll = checked;
    },
    setListItemMediaId: (state, action: PayloadAction<Array<any>>) => {
      state.listItemMediaId = action.payload.map((item: MediaRecordGalleryEntities) => {
        return item.mediaId;
      })
    }
  }
})

export const {
  selectItem, clearItemSelect, selectAll, setListItemMediaId,
} = recordGalleryStore.actions

export default recordGalleryStore