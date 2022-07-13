import store from "@modules/core/store/redux";
import Device from "@modules/devices/entity";
import Pagination from "@modules/pagination/entitiy";
import User from "@modules/user/entity";
import moment, { Moment } from "moment";
import deviceCalendarStore from "./deviceCalendarStore";
import Schedule from "./Entity";
import { getHourInDay, getTotalDayInMonth, getListHourInRange } from "./helper";
import scheduleRepository from "./repository";
import timeCalendarStore from "./timeCalendarStore";

let schedulePresenter = { ...scheduleRepository };

interface IGetCalendarOfDeviceByMonth {
  monthMoment: Moment;
  pagination: Pagination;
  filter: {
    search?: string;
    deviceStatus?: 0 | 1 | 2;
  };
  loadMore?: boolean;
}

schedulePresenter.getCalendarOfDeviceByMonth = async (
  params: IGetCalendarOfDeviceByMonth
) => {
  const prevDeviceCalendarStore = store.getState().deviceCalendar;

  let {
    monthMoment = prevDeviceCalendarStore.currentMonth,
    pagination = prevDeviceCalendarStore.pagination,
    filter = prevDeviceCalendarStore.filter,
    loadMore = false,
  } = params;

  if (loadMore && prevDeviceCalendarStore.outOfData) return;
  if(typeof monthMoment=="string"){
    monthMoment=moment(monthMoment)
  }

  const year: number = monthMoment.year();
  const month: number = monthMoment.month() + 1;
  let { listDayInMonth, totalDay } = getTotalDayInMonth(monthMoment);

  const payload = {
    DateFrom: monthMoment.format("YYYY-MM-01"),
    DateTo: monthMoment.format(`YYYY-MM-${totalDay}`),
    PageSize: 10,
    PageNumber: pagination.currentPage,
    SearchContent: filter.search || "",
    DeviceStatus: filter.deviceStatus,
  };

  return await scheduleRepository
    .getCalendarOfDeviceByMonth(payload)
    .then((res) => {
      let deviceCalendar = {
        filter: { ...filter },
        pagination: new Pagination({
          ...pagination,
          total: res.info.total,
        }),
        outOfData: false,
        currentMonth: monthMoment,
        listDevice: [],
      };

      res.data.forEach(
        (item: { device: Device; listSchedule: Array<Schedule> }) => {
          // calendarOfDevice là biến phụ thuộc deviceCalendarStore
          let calendarOfDevice: Array<{
            day: Moment;
            listSchedule: Array<Schedule>;
          }> = listDayInMonth.map((day: number) => {
            return {
              day: moment(`${year}-${month}-${day}`),
              listSchedule: [],
            };
          });

          const pushScheduleToCalendarOfDevice = ({ day, schedule }) => {
            calendarOfDevice[day - 1] = {
              day: moment(`${year}-${month}-${day}`),
              listSchedule: [
                ...calendarOfDevice[day - 1].listSchedule,
                schedule,
              ],
            };
          };

          item.listSchedule.forEach((schedule: Schedule) => {
            if (schedule.scheduleRepeat == 0 || schedule.scheduleRepeat == 1) {
              // Nếu là kiểu day hoặc norepeat phải push vào calendarOfDevice những ngày trong khoảng đó
              let startMonth =
                moment(schedule.scheduleDateTimeBegin).month() + 1;
              let endMonth = moment(schedule.scheduleDateTimeEnd).month() + 1;

              let startDay = moment(schedule.scheduleDateTimeBegin).date();
              let endDay = moment(schedule.scheduleDateTimeEnd).date();

              if (startMonth < month) {
                startDay = 1;
              }

              if (endMonth > month) {
                endDay = totalDay;
              }

              listDayInMonth.forEach((day) => {
                if (day >= startDay && day <= endDay) {
                  pushScheduleToCalendarOfDevice({ day, schedule });
                }
              });
            } else {
              schedule.scheduleRepeatValueDetails.forEach((item) => {
                const day = moment(item, "YYYY-MM-DD").date();
                if (month == moment(item, "YYYY-MM-DD").month() + 1) {
                  pushScheduleToCalendarOfDevice({ day, schedule });
                }
              });
            }
          });

          deviceCalendar.listDevice.push({
            device: item.device,
            calendar: calendarOfDevice,
          });
        }
      );

      deviceCalendar.outOfData =
        deviceCalendar.pagination.pageSize > res.data.length;

      //update store
      if (loadMore) {
        store.dispatch(
          deviceCalendarStore.actions.updateDeviceCalendar(deviceCalendar)
        );
      } else {
        store.dispatch(
          deviceCalendarStore.actions.fetchDeviceCalendar(deviceCalendar)
        );
      }

      return res;
    });
};

interface IGetCalendarOfTimeByDay {
  monthMoment: Moment;
  deviceId: string;
}

schedulePresenter.getCalendarOfTimeByDay = async ({
  monthMoment,
  deviceId,
}: IGetCalendarOfTimeByDay) => {
  const year: number = monthMoment.year();
  const month: number = monthMoment.month() + 1;
  let { listDayInMonth, totalDay } = getTotalDayInMonth(monthMoment);

  const params = {
    ScheduleDateBegin: monthMoment.format("YYYY-MM-01"),
    ScheduleDateEnd: monthMoment.format(`YYYY-MM-${totalDay}`),
    DeviceId: deviceId,
  };

  return await scheduleRepository.getCalendarOfTimeByDay(params).then((res) => {
    let listDayInMonthStore = listDayInMonth.map((day) => {
      return {
        day: moment(`${year}-${month}-${day}`),
        listTimeInDay: getHourInDay().map((hour, index) => {
          return {
            hour: index,
            scheduleInfo: null,
          };
        }),
      };
    });

    res.listSchedule.map((item: { schedule: Schedule; author: User }) => {
      const { schedule, author } = item;
      const listHourInRange = getListHourInRange({
        startTime: schedule.scheduleTimeBegin,
        endTime: schedule.scheduleTimeEnd,
      });
      if (schedule.scheduleRepeat == 0 || schedule.scheduleRepeat == 1) {
        // Nếu là kiểu day hoặc norepeat phải push vào calendarOfDevice những ngày trong khoảng đó
        let startMonth = moment(schedule.scheduleDateTimeBegin).month() + 1;
        let endMonth = moment(schedule.scheduleDateTimeEnd).month() + 1;

        let startDay = moment(schedule.scheduleDateTimeBegin).date();
        let endDay = moment(schedule.scheduleDateTimeEnd).date();

        if (startMonth < month) {
          startDay = 1;
        }

        if (endMonth > month) {
          endMonth = totalDay;
        }

        listDayInMonth.forEach((day) => {
          if (day >= startDay && day <= endDay) {
            const dayMoment = moment(`${year}-${month}-${day}`, "YYYY-MM-DD");
            let listTimeInDayStore = [
              ...listDayInMonthStore[dayMoment.date() - 1].listTimeInDay,
            ];

            listHourInRange.forEach((hour) => {
              listTimeInDayStore[hour] = {
                scheduleInfo: { schedule, author },
                hour,
              };
            });

            listDayInMonthStore[dayMoment.date() - 1] = {
              day: dayMoment,
              listTimeInDay: listTimeInDayStore,
            };
          }
        });
      } else {
        schedule.scheduleRepeatValueDetails.forEach((day) => {
          const dayMoment = moment(day, "YYYY-MM-DD");
          let listTimeInDayStore =
            listDayInMonthStore[dayMoment.date() - 1]?.listTimeInDay;
          if (!listTimeInDayStore) return;
          if (month != moment(dayMoment, "YYYY-MM-DD").month() + 1) return;

          listHourInRange.forEach((hour) => {
            listTimeInDayStore[hour] = {
              scheduleInfo: { schedule, author },
              hour,
            };
          });

          listDayInMonthStore[dayMoment.date() - 1] = {
            day: dayMoment,
            listTimeInDay: listTimeInDayStore,
          };
        });
      }
    });

    store.dispatch(
      timeCalendarStore.actions.fetchTimeCalendar({
        currentMonth: monthMoment,
        device: new Device(res.device),
        listDayInMonth: listDayInMonthStore,
      })
    );

    return res;
  });
};

export default schedulePresenter;
