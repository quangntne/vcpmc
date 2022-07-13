import { MediaRecordGalleryEntities } from "@modules/recordGallery/entity";

export interface IModal {
  isVisible: boolean;
  dataEdit: any;
}

export interface IStateRecord {
  records: MediaRecordGalleryEntities[];
  recordsSelected: MediaRecordGalleryEntities[];
}

export interface ITime {
  timeStart: string;
  timeEnd: string;
  duration: string;
}

export const fakeDataAddPlaylist = {
  playlistName: "FE_Test-" + Math.floor(Math.random() * 1000),
  playlistDescription: Math.floor(Math.random() * 10000000000000000000000000),
  playlistStatus: Math.random() < 0.5,
}
export interface ITagPlaylist {
  label: string;
  id: number;
}
export interface IFormTemplate {
  templateId: string;
  timeBegin: string;
  timeEnd: string;
  templateDuration: string;
  playlistId: string;
  orderMedia: number;
}

export interface IPropsListTemplateEdit {
  callApiSuccess: () => void;
}

export interface IFormCopyPlaylist {
  playListIdCopy: string;
  playListIdPaste: string;
}
