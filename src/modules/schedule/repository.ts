import httpRepository from "@modules/core/repository/http";
import Device from "@modules/devices/entity";
import Pagination from "@modules/pagination/entitiy";
import User from "@modules/user/entity";
import Schedule from "./entity";
import PaginationInfo from "@modules/pagination/entity";
import store from "@store/redux";
import listDevicesStore from "@modules/devices/listDevicesStore";
import moment from "moment";

type IGetCalendar = {
  data: Array<{
    device: Device;
    listSchedule: Array<Schedule>;
  }>;
  info: Pagination;
};

const getCalendarOfDeviceByMonth = async (params) => {
  return await httpRepository.execute({
    path: "/api/Schedule/calendar",
    params,
    showSuccess: false,
    showError: false,
    convert: (res) => {
      if (!res) return;
      const data = res.pagedData.map((item) => {
        return {
          device: new Device(item.device),
          listSchedule: item.scheduleItems.map((schedule) => {
            return new Schedule({
              ...schedule,
              scheduleDateTimeBegin: moment(
                schedule.scheduleDateTimeBegin,
                "YYYY-MM-DD HH:mm:ss"
              ),
              scheduleDateTimeEnd: moment(
                schedule.scheduleDateTimeEnd,
                "YYYY-MM-DD HH:mm:ss"
              ),
            });
          }),
        };
      });

      const info = new Pagination({
        pageSize: res.pageInfo.pageSize,
        currentPage: res.pageInfo.currentPage,
        total: res.pageInfo.totalCount,
      });

      return { data, info } as IGetCalendar;
    },
  });
};

const getCalendarOfTimeByDay = async (params) => {
  return await httpRepository.execute({
    path: "/api/Schedule/getScheduleByDevice",
    params,
    showSuccess: false,
    showError: false,
    convert: (res) => {
      if (!res) return;

      const listSchedule = res.schedules.map((item) => {
        return {
          schedule: new Schedule({
            ...item,
            scheduleRepeatValueDetails: item.scheduleRepeatValueDetailData,
          }),
          author: new User(item.user),
        };
      });

      return {
        device: new Device(res.device),
        listSchedule,
      };
    },
  });
};

const getPlayList = async (payload) => {
  return await httpRepository.execute({
    path: "/api/PlayList",
    method: "get",
    payload,
    showSuccess: false,
    convert: (res) => {
      const data = res.pagedData.map((item) => ({
        playListId: item.playListId,
        playListName: item.playListName,
        playlistStatus: item.playlistStatus
      }));

      return { data };
    },
  });
};

const addSchedule = async (data) => {
  return await httpRepository.execute({
    path: "/api/Schedule",
    method: "post",
    payload: data,
  });
};

const getInfoSchedule = async (idSchedule) => {
  return await httpRepository.execute({
    path: `/api/Schedule/${idSchedule}`,
    method: "get",
    showSuccess: false,
  });
};

const getDeviceOfSchedule = async (idSchedule) => {
  return await httpRepository.execute({
    path: `/api/Schedule/getDeviceBySchedule/${idSchedule}`,
    method: "get",
    showSuccess: false,
  });
};

const editSchedule = async (payload) => {
  return await httpRepository.execute({
    path: "/api/Schedule",
    method: "put",
    payload,
  });
};

const delSchedule = async (arrId) => {
  return await httpRepository.execute({
    path: "/api/Schedule",
    method: "delete",
    payload: {
      data: { scheduleIds: arrId },
    },
  });
};

const getListSchedule = async (payload, option) => {
  const tempData = await httpRepository.execute({
    path: "/api/Schedule",
    method: "get",
    params: {
      PageSize: payload.pageSize,
      PageNumber: payload.current,
      SearchContent: option.search,
    },
    config: { isPrivate: true },
    showSuccess: false,
  });
  return {
    data: tempData.pagedData,
    info: new PaginationInfo(tempData.pageInfo),
  };
};

export default {
  getCalendarOfDeviceByMonth,
  getCalendarOfTimeByDay,
  addSchedule,
  getPlayList,
  getListSchedule,
  delSchedule,
  editSchedule,
  getInfoSchedule,
  getDeviceOfSchedule,
};
