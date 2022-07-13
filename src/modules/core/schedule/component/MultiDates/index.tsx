import React, { useEffect, useState } from "react";
import DayPicker, { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import "./styles.scss";
import store, { RootState } from "@store/redux";
import timeScheduleStore from "@modules/schedule/timeScheduleStore";
import { useSelector } from "react-redux";
import { useRouter } from "@helper/functions";

const MultiDates = (props) => {
  const router = useRouter();
  const { arrayYearly } = useSelector((state: RootState) => state.timeSchedule);
  const [selectedDays, setSelectedDays] = useState([]);
  const idSchedule = router.query["key"];

  useEffect(() => {
    // console.log(arrayValue.map(item => new Date(item)),"arrayValue.map(item => new Date(item))===");
    // console.log(arrDateResponse,'arrDateResponse===')
    if (idSchedule) return setSelectedDays(arrayYearly);
    else return setSelectedDays([]);
  }, [idSchedule]);

  const handleDayClick = (day, { selected }) => {
    // console.log(day, selected, 'day, selected========')
    let arrTemp = [...selectedDays];
    if (selected) {
      const selectedIndex = arrTemp.findIndex((selectedDay) =>
        DateUtils.isSameDay(selectedDay, day)
      );
      arrTemp.splice(selectedIndex, 1);
    } else {
      arrTemp.push(day);
    }
    // console.log(selectedDays,'selectedDays====');
    //  const arrConvert =   arrTemp.map(item=>moment(item).format("DD/MM"))
    store.dispatch(
      timeScheduleStore.actions.updateTimeSchedule({ arrayYearly: arrTemp })
    );
    setSelectedDays(arrTemp);
  };

  return (
    <>
      <div className="multi-dates">
        <DayPicker
          selectedDays={selectedDays}
          onDayClick={(day, { selected }) => handleDayClick(day, { selected })}
        />
      </div>
    </>
  );
};

export default MultiDates;
