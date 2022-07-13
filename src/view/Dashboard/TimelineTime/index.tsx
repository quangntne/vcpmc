import React, { useEffect, useMemo, useState } from "react";
import MonthPicker from "../Component/MonthPicker";

import moment, { Moment } from "moment";

import "./style.scss";
import Calendar from "./Component/Calendar";
import DeviceInfo from "../Component/Device";
import ListTimeInDay from "./Component/ListTimeInDay";
import { useHistory } from "react-router";
import schedulePresenter from "@modules/schedule/presenter";
import { useAsync } from "@view/shared/hook/useAsync";
import { useSelector } from "react-redux";
import { RootState } from "@modules/core/store/redux";
import { useQueryParams } from "@view/shared/hook/useQueryParams";
import Loading, { LoadingChild } from "@view/shared/components/Loading";
import { getTotalDayInMonth } from "@modules/schedule/helper";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";

const TimelineTime = (props) => {
  const history = useHistory();
  const deviceId = useQueryParams().get("deviceId");
  const activeDay = useQueryParams().get("activeDay");

  const { currentMonth, device } = useSelector(
    (state: RootState) => state.timeCalendar
  );
  const [getCalendarOfTimeByDay] = useAsync(
    schedulePresenter.getCalendarOfTimeByDay
  );
  const { listDayInMonth } = getTotalDayInMonth(currentMonth);

  useEffect(() => {
    getCalendarOfTimeByDay.execute({
      monthMoment: moment(activeDay),
      deviceId,
    });
  }, [activeDay]);

  const onChange = (month: Moment) => {
    getCalendarOfTimeByDay.execute({ monthMoment: month, deviceId });
  };

  return (
    <div className="dashboard">
      <MainTitleComponent
        title="Dashboard"
        breadcrumbs={[{ name: "Devices" }]}
      />

      <div className="device-schedule">
        <div className="header-filter-data">
          <div className="device-header">
            <div className="router-back mb-3" onClick={() => history.goBack()}>
              <i className="fas fa-chevron-left"></i>
              <span>{device.deviceName}</span>
              <span></span>
            </div>
            <DeviceInfo device={device} action={false} />
          </div>
          <div className="wrap-calendar">
            <MonthPicker value={currentMonth} onChange={onChange} />
            <div className="list-day-in-monh">
              {listDayInMonth.map((day) => {
                const isActiveDay = (() => {
                  return moment(activeDay, "YYYY-MM-DD").isSame(
                    moment(
                      `${currentMonth.year()}-${
                        currentMonth.month() + 1
                      }-${day}`,
                      "YYYY-M-DD"
                    )
                  );
                })();

                return (
                  <div
                    className="day"
                    style={{ backgroundColor: isActiveDay && "#FF9911" }}
                  >
                    {day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div
          className="list-device-by-calendar"
          style={{
            opacity: getCalendarOfTimeByDay.status == "loading" ? ".5" : 1,
          }}
        >
          <ListTimeInDay />
          <Calendar />
          {getCalendarOfTimeByDay.status == "loading" && (
            <div className="calendar-loading">
              <LoadingChild />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineTime;
