import {
  routerBusinessContract,
  routerContract,
  routerMedia,
  routerPlaylist,
  routerRecordGallery,
  routerRole,
  routerRptRevByExploiting,
} from "@config/path";
import Loading from "@view/shared/components/Loading";
import { StringifyOptions } from "querystring";
import LoadableRouter from "./loadableRouter";

export const privateRouter = new LoadableRouter({
  loading: Loading,
  routers: [
    {
      path: "/",
      exact: true,
      permisionCode: "DASHBOARD_KEY",
      loader: () => import("@view/Dashboard/TimelineDay"),
    },
    {
      path: "/timeline-day",
      exact: true,
      permisionCode: "DASHBOARD_KEY",
      loader: () => import("@view/Dashboard/TimelineDay"),
    },
    {
      path: "/update-pass",
      exact: true,
      loader: () => import("@view/Login/UpdatePass"),
    },
    {
      path: "/timeline-time",
      exact: true,
      permisionCode: "DASHBOARD_KEY",
      loader: () => import("@view/Dashboard/TimelineTime"),
    },
    {
      path: "/schedule-edit",
      exact: true,
      permisionCode: "SCH_UPDATE",
      loader: () => import("../Schedule/ScheduleEdit"),
    },
    {
      path: "/schedule-add",
      exact: true,
      permisionCode: "SCH_CREATE",
      loader: () => import("../Schedule/ScheduleAdd"),
    },
    {
      path: "/schedule",
      exact: true,
      permisionCode: "SCH_SHOW",
      loader: () => import("../Schedule/ScheduleList"),
    },
    {
      path: "/report",
      exact: true,
      loader: () => import("../Report/index"),
    },
    {
      path: "/report/trackList",
      exact: true,
      loader: () => import("../Report/TracksPlay/index"),
    },

    {
      path: "/revenue-distribution",
      exact: true,
      loader: () => import("@view/RevenueDistribution/index"),
    },
    {
      path: "/revenue-distribution/detail/:id/:dateFrom/:dateTo",
      exact: false,
      loader: () => import("@view/RevenueDistribution/Detail/index"),
    },
    {
      path: "/group-list",
      exact: true,
      permisionCode: "GROUP_MENU",
      loader: () => import("../GroupList/index"),
    },
    {
      path: "/group-list/:idGroup/userGroup",
      exact: true,
      permisionCode: "USER_SHOW_FE",
      loader: () => import("../GroupList/TableUser/index"),
    },
    {
      path: "/testHoa",
      exact: true,
      loader: () => import("@view/TestHoa"),
    },
    {
      path: routerPlaylist.PLAYLIST,
      exact: true,
      permisionCode: "PLAYLIST_MENU",
      loader: () => import("@view/Playlist"),
    },
    {
      path: `${routerPlaylist.PLAYLIST}/:id`,
      exact: true,
      // permisionCode: "PLAYLIST_MENU",
      loader: () => import("@view/Playlist/component/DetailPlaylist"),
    },
    {
      path: routerBusinessContract.ADD_BUSINESS_CONTRACT,
      exact: true,
      loader: () =>
        import("@view/BusinessContract/component/AddBusinessContract/index"),
    },
    {
      path: routerBusinessContract.EDIT_BUSINESS_CONTRACT + "/:businessContractId",
      exact: true,
      loader: () =>
        import("@view/BusinessContract/component/AddBusinessContract/index"),
    },
    {
      path: routerBusinessContract.COPY_BUSINESS_CONTRACT + "/:businessContractId",
      exact: true,
      loader: () =>
        import("@view/BusinessContract/component/AddBusinessContract/index"),
    },
    {
      path: `${routerBusinessContract.DETAIL_BUSINESS_CONTRACT}/:businessId`,
      exact: true,
      loader: () =>
        import("@view/BusinessContract/component/DetailBusinessContract/index"),
    },
    {
      path: routerPlaylist.ADD_PLAYLIST,
      exact: true,
      permisionCode: "PLAYLIST_CREATE_FE",
      loader: () => import("@view/Playlist/component/AddPlaylist"),
    },
    {
      path: `${routerPlaylist.EDIT_PLAYLIST}/:id`,
      exact: true,
      permisionCode: "PLAYLIST_UPDATE_FE",
      loader: () => import("@view/Playlist/component/DetailPlaylist"),
    },
    {
      path: `${routerPlaylist.ADD_RECORD_TO_PLAYLIST}`,
      exact: true,
      permisionCode: "PLAYLIST_CREATE_FE",
      loader: () => import("@view/Playlist/component/AddRecordToPlaylist"),
    },
    {
      path: `${routerPlaylist.ADD_RECORD_TO_PLAYLIST}/:playlistId`,
      exact: true,
      permisionCode: "PLAYLIST_CREATE_FE",
      loader: () => import("@view/Playlist/component/AddRecordToPlaylist"),
    },
    {
      path: "/device",
      exact: true,
      permisionCode: "VIEW_DEVICE",
      loader: () => import("../Devices/Device_List/index"),
    },
    {
      path: "/user",
      exact: true,
      permisionCode: "SP_USER_MENU",
      loader: () => import("@view/User"),
    },
    {
      path: "/device-add",
      exact: true,
      permisionCode: "CREAT_DEVICE",
      loader: () => import("../Devices/Device_Add"),
    },
    {
      path: "/device-detail",
      exact: true,
      permisionCode: "VIEW_DEVICE",
      loader: () => import("../Devices/DetailDevice"),
    },
    {
      path: routerContract.CONTRACT,
      exact: true,
      isPrivate: true,
      loader: () => import("../Contract/index"),
    },
    {
      path: `${routerContract.ADD_CONTRACT_SUCCESS}/:id`,
      exact: true,
      isPrivate: true,
      loader: () => import("../AuContract/AuContractAddSucess/index"),
    },
    {
      path: routerContract.ADD_CONTRACT,
      exact: true,
      isPrivate: true,
      loader: () => import("../AuContract/AuContractAdd/index"),
    },
    {
      path: routerContract.EDIT_CONTRACT,
      exact: true,
      isPrivate: true,
      loader: () => import("../AuContract/AuContractAdd/index"),
    },
    {
      path: routerContract.DETAIL_CONTRACT,
      exact: true,
      isPrivate: true,
      loader: () => import("../AuContract/AuContractDetail/index"),
    },
    {
      path: "/device-log",
      exact: true,
      isPrivate: true,
      permisionCode: "VIEW_DEVICE",
      loader: () => import("../Devices/Device_Log"),
    },
    {
      path: routerRole.ROLES,
      permisionCode: "SB_ROLE",
      exact: true,
      isPrivate: true,
      loader: () => import("../Roles"),
    },
    {
      path: routerRole.ADD_ROLES,
      exact: true,
      loader: () => import("./../Roles/components/AddRole"),
    },
    {
      path: routerRole.EDIT_ROLES + "/:roleId",
      exact: true,
      loader: () => import("./../Roles/components/AddRole"),
    },
    {
      path: routerRole.ADD_USER,
      exact: true,
      loader: () => import("../UserManager/component/UpdateUserInfo/UpdateUserInfo"),
    },
    {
      path: routerRole.EDIT_USER + "/:userId",
      exact: true,
      loader: () => import("../UserManager/component/UpdateUserInfo/UpdateUserInfo"),
    },
    {
      path: routerRole.USER_AND_ROLE,
      exact: true,
      isPrivate: true,
      // permisionCode: "MANAGER_USER",
      loader: () => import("../UserManager"),
    },
    {
      path: "/setting",
      exact: true,
      isPrivate: true,
      loader: () => import("@view/Setting"),
    },
    {
      path: "/manager-contract",
      exact: true,
      isPrivate: true,
      loader: () => import("@view/Setting/ManagerContract/index"),
    },
    {
      path: "/infor-work",
      exact: true,
      isPrivate: true,
      loader: () => import("@view/Setting/InforWork/index"),
    },
    {
      path: "/control-cycle",
      exact: true,
      isPrivate: true,
      loader: () => import("@view/Setting/ControlCycle/index"),
    },
    {
      path: "/report",
      exact: true,
      isPrivate: true,
      loader: () => import("@view/Report"),
    },
    {
      path: "/report/revenue-by-contract",
      exact: true,
      isPrivate: true,
      loader: () => import("@view/Report/RevenueByContract"),
    },
    {
      path: "/report/revenue-by-contract/detail-revenue/:contractId",
      exact: true,
      isPrivate: true,
      loader: () => import("@view/Report/DetailRevenue/index"),
    },
    {
      path: "/report/revenue-by-contract/history-device/:contractId",
      exact: true,
      isPrivate: true,
      loader: () => import("@view/Report/HistoryDevice/index"),
    },
    {
      path: "/revenue-distribute",
      exact: true,
      isPrivate: true,
      loader: () => import("@view/Report/RevenueDistribute"),
    },
    {
      path: "/revenue-distribute/:authContractId",
      exact: true,
      isPrivate: true,
      loader: () => import("@view/Report/RevenueDistribute/DetailRevenueDistribute/index"),
    },
    {
      path: "/history-comparison",
      exact: true,
      isPrivate: true,
      loader: () => import("@view/Report/HistoryComparison/index"),
    },
    {
      path: "/history-comparison/:contractId",
      exact: true,
      isPrivate: true,
      loader: () => import("@view/Report/HistoryComparison/DetailHistoryComparison"),
    },
    {
      // path: "/tracking-view",
      path: `${routerRptRevByExploiting.DETAIL_RP_REV_BY_EXPLOITING}/:contractId`,
      exact: true,
      isPrivate: true,
      loader: () => import("@view/ReportRevenueByExploitingContract/Detail"),
    },
    {
      path: `${routerRptRevByExploiting.VIEW_DATA_BY_ID}/:contractId`,
      exact: true,
      isPrivate: true,
      loader: () =>
        import("@view/ReportRevenueByExploitingContract/ViewDataById"),
    },
    {
      path: `/report-revenue-by-contract`,
      exact: true,
      isPrivate: true,
      loader: () =>
        import("@view/Report/components/ReportRevenueByContract/index"),
    },
    {
      path: "/report/revenue",
      exact: true,
      isPrivate: true,
      loader: () => import("@view/Report/Revenue"),
    },
    {
      path: "/report/tracksPlay",
      exact: true,
      isPrivate: true,
      loader: () => import("@view/Report/TracksPlay"),
    },
    {
      path: "/report/ShareOutTrackList",
      exact: true,
      isPrivate: true,
      loader: () => import("@view/Report/ShareOutTracklist"),
    },
    {
      path: "/basic-infor",
      exact: true,
      isPrivate: true,
      loader: () => import("@view/BasicInfor"),
    },
    {
      path: routerRecordGallery.RECORD_GALLERY,
      exact: true,
      isPrivate: true,
      loader: () => import("@view/RecordGallery"),
    },
    {
      path: routerRecordGallery.APPROVAL_RECORD_GALLERY,
      exact: true,
      isPrivate: true,
      loader: () => import("@view/RecordGallery/component/ApprovalGallery"),
    },
    {
      path: `${routerRecordGallery.EDIT_RECORD_GALLERY}/:idRecordGallery`,
      exact: true,
      loader: () => import("@view/RecordGallery/component/EditGallery/"),
    },
    {
      path: "/list-used-unit",
      exact: true,
      permisionCode: "GROUP_MENU",
      loader: () => import("../GroupList/index"),
    },
    {
      path: "/list-used-unit/:idGroup/used-unit",
      exact: true,
      loader: () => import("../GroupList/TableUser/index"),
    },
    {
      path: "/list-used-unit/:idGroup/used-unit/add-user",
      exact: true,
      loader: () => import("../GroupList/TableUser/AddUser/index"),
    },
    {
      path: "/list-used-unit/:idGroup/used-unit/:idUser/view-user",
      exact: true,
      loader: () => import("../GroupList/TableUser/ViewUser/index"),
    },
    {
      path: "/list-used-unit/:idGroup/used-unit/:idUser/edit-user",
      exact: true,
      loader: () => import("../GroupList/TableUser/EditUser/index"),
    },
    {
      path: "/au-unit",
      exact: true,
      loader: () => import("../Representative"),
    },
    {
      path: "/au-unit/:idUser",
      exact: true,
      loader: () => import("../Representative/UpdateRepresentati/index"),
    },
  ],
}).routers;

export const publicRouter = new LoadableRouter({
  loading: Loading,
  routers: [
    {
      path: "/",
      exact: true,
      loader: () => import("../Login"),
    },
    {
      path: "/login",
      exact: true,
      loader: () => import("../Login"),
    },
    {
      path: "/forgotPass",
      exact: true,
      loader: () => import("../Login/ForgotPass"),
    },
    {
      path: "/resetPass/:otp",
      exact: true,
      loader: () => import("../Login/ResetPass"),
    },
    {
      path: "*",
      exact: true,
      loader: () => import("../PageError"),
    },
  ],
}).routers;
