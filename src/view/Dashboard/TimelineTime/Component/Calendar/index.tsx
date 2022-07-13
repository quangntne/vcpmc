import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import "./style.scss";
import { useSelector } from "react-redux";
import { RootState } from "@modules/core/store/redux";
import Schedule from "@modules/schedule/Entity";

const Calendar = (props) => {
  const { listDayInMonth } = useSelector(
    (state: RootState) => state.timeCalendar
  );

  return (
    <div className="calendar">
      {listDayInMonth.map((dayInMonth, dayIndex) => {
        return (
          <div className="day-col">
            {dayInMonth.listTimeInDay.map((timeInDay, timeIndex) => {
              const activeColor = (() => {
                const currentDay = moment();
                if (currentDay.isSame(dayInMonth.day, "day")) return "#00B2CA";
                if (currentDay.isAfter(dayInMonth.day)) return "#E15554";
                if (currentDay.isBefore(dayInMonth.day)) return "#707070";
              })();

              const hasSchedule = (timeInDay) => {
                if (timeInDay?.scheduleInfo) return true;
                return false;
              };

              const isTimeStartSchedule = (_timeInDay) => {
                if (!hasSchedule(_timeInDay)) return false;
                const hourBegin = moment(
                  _timeInDay.scheduleInfo.schedule.scheduleTimeBegin,
                  "HH:mm:ss"
                ).hour();
                if (_timeInDay.hour == hourBegin) return true;
              };

              const isTimeEndSchedule = (_timeInDay) => {
                if (!hasSchedule(_timeInDay)) return false;
                const hourEnd = moment(
                  _timeInDay.scheduleInfo.schedule.scheduleTimeEnd,
                  "HH:mm:ss"
                ).hour();
                if (_timeInDay.hour == hourEnd) return true;
              };

              const getHeightOfActiveDay = (_timeInDay) => {
                let height = 10;
                if (isTimeStartSchedule(_timeInDay)) {
                  const minuteBegin = moment(
                    _timeInDay.scheduleInfo.schedule.scheduleTimeBegin,
                    "HH:mm:ss"
                  ).minute();
                  height = ((60 - minuteBegin) * 100) / 60;
                } else if (isTimeEndSchedule(_timeInDay)) {
                  const minuteEnd = moment(
                    _timeInDay.scheduleInfo.schedule.scheduleTimeEnd,
                    "HH:mm:ss"
                  ).minute();
                  height = (minuteEnd * 100) / 60;
                } else {
                  height = 100;
                }

                if (height < 10) return "10%";
                return height + "%";
              };

              const sameSchedule = (schedule: Schedule) => {
                const scheduleId = schedule?.scheduleId;
                const currentScheduleId =
                  timeInDay?.scheduleInfo?.schedule?.scheduleId;

                if (scheduleId === currentScheduleId) return true;
                return false;
              };

              const preTime = dayInMonth.listTimeInDay[timeIndex - 1];
              const nextTime = dayInMonth.listTimeInDay[timeIndex + 1];
              const timeOfPrevDay =
                listDayInMonth[dayIndex - 1]?.listTimeInDay[timeIndex];
              const timeOfNextDay =
                listDayInMonth[dayIndex + 1]?.listTimeInDay[timeIndex];

              return (
                <div
                  className="time-in-day"
                  style={{
                    border: "1px solid rgb(92, 92, 92)",
                    display: hasSchedule(timeInDay) && "flex",
                    alignItems: (() => {
                      if (!hasSchedule(timeInDay)) return "";
                      if (isTimeStartSchedule(timeInDay)) return "flex-end";
                      if (isTimeEndSchedule(timeInDay)) return "flex-start";
                      return "";
                    })(),
                  }}
                >
                  <div
                    className={`${hasSchedule(timeInDay) && "active-time"}`}
                    style={{
                      bottom: isTimeStartSchedule(timeInDay) && "-2px",
                      top: isTimeEndSchedule(timeInDay) && "-2px",
                      backgroundColor: activeColor,
                      borderTopLeftRadius:
                        !sameSchedule(preTime?.scheduleInfo?.schedule) &&
                        !sameSchedule(timeOfPrevDay?.scheduleInfo?.schedule)
                          ? "8px"
                          : 0,
                      borderTopRightRadius:
                        !sameSchedule(preTime?.scheduleInfo?.schedule) &&
                        !sameSchedule(timeOfNextDay?.scheduleInfo?.schedule)
                          ? "8px"
                          : 0,
                      borderBottomRightRadius:
                        !sameSchedule(nextTime?.scheduleInfo?.schedule) &&
                        !sameSchedule(timeOfNextDay?.scheduleInfo?.schedule)
                          ? "8px"
                          : 0,
                      borderBottomLeftRadius:
                        !sameSchedule(nextTime?.scheduleInfo?.schedule) &&
                        !sameSchedule(timeOfPrevDay?.scheduleInfo?.schedule)
                          ? "8px"
                          : 0,
                      height:
                        hasSchedule(timeInDay) &&
                        `calc(${getHeightOfActiveDay(timeInDay)} + 4px)`,
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Calendar;
