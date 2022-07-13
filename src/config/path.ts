interface IrouterPlaylist {
  PLAYLIST: string;
  ADD_PLAYLIST: string;
  EDIT_PLAYLIST: string;
  ADD_RECORD_TO_PLAYLIST: string;
}
interface IrouterBusinessContract {
  BUSINESS_CONTRACT: string;
  ADD_BUSINESS_CONTRACT: string;
  EDIT_BUSINESS_CONTRACT: string;
  DETAIL_BUSINESS_CONTRACT: string;
  COPY_BUSINESS_CONTRACT: string;
}
interface IrouterRecordGallery {
  RECORD_GALLERY: string;
  EDIT_RECORD_GALLERY: string;
  APPROVAL_RECORD_GALLERY: string;
}
export const routerPlaylist: IrouterPlaylist = {
  PLAYLIST: "/playlist",
  ADD_PLAYLIST: "/add-playlist",
  EDIT_PLAYLIST: "/edit-playlist",
  ADD_RECORD_TO_PLAYLIST: "/add-record-to-playlist",
};
export const routerBusinessContract: IrouterBusinessContract = {
  BUSINESS_CONTRACT: "/contract?actK=2",
  COPY_BUSINESS_CONTRACT: "/copy-business-contract",
  ADD_BUSINESS_CONTRACT: "/add-business-contract",
  EDIT_BUSINESS_CONTRACT: "/edit-business-contract",
  DETAIL_BUSINESS_CONTRACT: "/detail-business-contract",
};

export const routerRecordGallery: IrouterRecordGallery = {
  RECORD_GALLERY: "/record-gallery",
  EDIT_RECORD_GALLERY: "/edit-record-gallery",
  APPROVAL_RECORD_GALLERY: "/approval-record-gallery",
};

interface IrouterContract {
  CONTRACT: string;
  ADD_CONTRACT: string;
  DETAIL_CONTRACT: string;
  ADD_CONTRACT_SUCCESS: string;
  EDIT_CONTRACT: string;
}

interface IrouterMedia {
  DETAIL_MEDIA: string;
  ADD_MEDIA: string;
  MEDIA_LIBRARY: string;
}
interface IrouterRptRevByExploiting {
  DETAIL_RP_REV_BY_EXPLOITING: string;
  VIEW_DATA_BY_ID: string;
}
export const routerMedia: IrouterMedia = {
  DETAIL_MEDIA: "/detail-media",
  ADD_MEDIA: "/add-media",
  MEDIA_LIBRARY: "/media-library",
};

export const routerContract: IrouterContract = {
  CONTRACT: "/contract",
  ADD_CONTRACT: "/contract-add",
  ADD_CONTRACT_SUCCESS: "/contract-success",
  DETAIL_CONTRACT: "/contract-detail/:id",
  EDIT_CONTRACT: "/contract-edit/:id"
};
export const routerRole: {
  EDIT_USER: string;
  ADD_USER: string;
  ADD_ROLES: string;
  EDIT_ROLES: string;
  USER_AND_ROLE: string;
  ROLES: string;
} = {
  ROLES: "/roles",
  ADD_ROLES: "/add-roles",
  EDIT_ROLES: "/edit-roles",
  EDIT_USER: "/edit-user",
  ADD_USER: "/add-user",
  USER_AND_ROLE: "/user-and-role",
};
//routerReportRevenueByExploitingContract
export const routerRptRevByExploiting: IrouterRptRevByExploiting = {
  DETAIL_RP_REV_BY_EXPLOITING: "/detail-report-reveue-exploiting-contract",
  VIEW_DATA_BY_ID: "/view-data-by-id",
};
