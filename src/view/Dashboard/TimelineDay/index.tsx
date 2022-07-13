import React, {useEffect, useMemo, useRef, useState} from "react";
import MonthPicker from "../Component/MonthPicker";
import DeviceStatus from "./Component/DeviceStatus";

const devide = require("@assets/images/tablet-and-cellphone.png");
import {Checkbox, Dropdown} from "antd";

import Search from "antd/lib/input/Search";
import moment, {Moment} from "moment";

import "./style.scss";
import Calendar from "./Component/Calendar";
import ListDevice from "./Component/ListDevice";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import schedulePresenter from "@modules/schedule/presenter";
import store, {RootState} from "@modules/core/store/redux";
import {useSelector} from "react-redux";
import {useAsync} from "@view/shared/hook/useAsync";
import Pagination from "@modules/pagination/entitiy";
import {LoadingChild} from "@view/shared/components/Loading";
import scheduleViewModel from "@modules/schedule/viewModel";
import deviceCalendarStore from "@modules/schedule/deviceCalendarStore";
import CheckPermission from "@view/shared/hoc/CheckPermission";
const TimelineDay=()=>{
    return null;
}
// const TimelineDay = (props) => {
//     const listDeviceCalendarRef: any = useRef();
//     const {listDevice, currentMonth, pagination, filter} = useSelector(
//         (state: RootState) => state.deviceCalendar
//     );
//     const {listDeviceStatus, getDeviceStatusByValue} = scheduleViewModel();
//     const [getCalendarOfDeviceByMonth] = useAsync(
//         schedulePresenter.getCalendarOfDeviceByMonth
//     );
//     const [listDataDashboard, setDataDashboard] = useState([]);


//     useEffect(() => {
//         setTimeout(function (){
//             getCalendarOfDeviceByMonth.execute({
//                 monthMoment: currentMonth,
//                 pagination: new Pagination({currentPage: pagination.currentPage}),
//             }).then(res => {
//                 const data = res.data;

//                 setDataDashboard(data)
//             });

//             return () => {
//                 store.dispatch(deviceCalendarStore.actions.reset());
//             };
//         },700)
//     }, []);

//     useEffect(() => {
//         if (!listDeviceCalendarRef.current) return;
//         listDeviceCalendarRef.current.scrollTo(0, 0);
//     }, [currentMonth, filter.search, filter.deviceStatus]);

//     const onChange = (month: Moment) => {
//         getCalendarOfDeviceByMonth.execute({
//             monthMoment: month,
//             pagination: new Pagination({}),
//         });
//     };

//     const getTotalDayInMonth = (_moment: Moment) => {
//         let __moment =_moment;
//         if(typeof _moment=="string"){
//             __moment = moment(_moment)
//         }
//         if(__moment==null){
//             return 0;
//         }
//         const year = __moment.year();
//         const month = __moment.month() + 1;
//         return new Date(year, month, 0).getDate();
//     };

//     const listDayInMonth = (() => {
//         return Array.from(
//             {length: getTotalDayInMonth(currentMonth)},
//             (x, i) => i + 1
//         );
//     })();

//     const onScroll = (e) => {

//         const bottom =
//             e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;

//         if (!bottom) return;

//         getCalendarOfDeviceByMonth.execute({
//             loadMore: true,
//             pagination: {
//                 ...pagination,
//                 currentPage: pagination.currentPage + 1,
//             },
//         });
//     };

//     return (
//         <CheckPermission permissionCode="DASHBOARD_KEY">
//             <div className="dashboard">
//                 <MainTitleComponent
//                     title="Dashboard"
//                     breadcrumbs={[{name: "Devices"}]}
//                 />

//                 <DeviceStatus/>

//                 <div className="device-schedule">
//                     <div className="header-filter-data">
//                         <div className="device-filter">
//                             <div style={{height: "114px", paddingRight: "10px"}}>
//                                 <div className="header">
//                                     <div className="title">
//                                         <img className="mr-2" src={devide} alt="device"/>
//                                         <span>Devices</span>
//                                     </div>
//                                     <Dropdown
//                                         trigger={["click"]}
//                                         overlay={
//                                             <div className="dropdown-menu">
//                                                 {listDeviceStatus.map((status) => {
//                                                     return (
//                                                         <div
//                                                             className="status"
//                                                             onClick={() => {
//                                                                 getCalendarOfDeviceByMonth.execute({
//                                                                     filter: {
//                                                                         ...filter,
//                                                                         deviceStatus: status.value,
//                                                                     },
//                                                                     pagination: {
//                                                                         ...pagination,
//                                                                         currentPage: 1,
//                                                                     },
//                                                                 });
//                                                             }}
//                                                         >
//                                                             {status.name}
//                                                         </div>
//                                                     );
//                                                 })}
//                                             </div>
//                                         }
//                                     >
//                                         <a
//                                             className="ant-dropdown-link"
//                                             onClick={(e) => e.preventDefault()}
//                                         >
//                                             {getDeviceStatusByValue(filter.deviceStatus)}
//                                             <i className="fas fa-sort-down ml-2"></i>
//                                         </a>
//                                     </Dropdown>
//                                 </div>
//                                 <Search
//                                     className="ant-form-search mt-4"
//                                     onSearch={(value) => {
//                                         getCalendarOfDeviceByMonth.execute({
//                                             pagination: {...new Pagination({})},
//                                             filter: {
//                                                 ...filter,
//                                                 search: value,
//                                             },
//                                         });
//                                     }}
//                                 />
//                             </div>
//                         </div>
//                         <div className="wrap-calendar">
//                             <MonthPicker value={currentMonth} onChange={onChange}/>
//                             <div className="list-day-in-monh">
//                                 {listDayInMonth.map((day, index) => {
//                                     return (
//                                         <div key={index} className="day">
//                                             {day}
//                                         </div>
//                                     );
//                                 })}
//                             </div>
//                         </div>
//                     </div>

//                     <div
//                         onScroll={onScroll}
//                         ref={listDeviceCalendarRef}
//                         className="list-device-by-calendar"
//                         style={{
//                             opacity:
//                                 getCalendarOfDeviceByMonth.status == "loading" ? ".5" : 1,
//                         }}
//                     >
//                         <ListDevice/>
//                         <Calendar dataDash={listDataDashboard}/>
//                         {listDevice.length == 0 && <div className="nodata">nodata</div>}
//                         {getCalendarOfDeviceByMonth.status == "loading" && (
//                             <div className="calendar-loading">
//                                 <LoadingChild/>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </CheckPermission>
//     );
// };

export default TimelineDay;
