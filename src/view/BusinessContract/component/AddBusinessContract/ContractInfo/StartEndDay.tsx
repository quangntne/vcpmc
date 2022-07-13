import { updateBusinessContractDay } from "@modules/businessContract/businessContractStore";
import { useTranslate } from "@view/shared/hook/useTranslate";
import {
  businessContractTranslateKey,
  common,
} from "@view/shared/translateKey";
import { DatePicker, Form } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { draftData, IDay } from "./../../../interface";
import UilCalendarAlt from "@iconscout/react-unicons/icons/uil-calendar-alt";
import { RootState } from "@modules/core/store/redux";

const StartEndDay = ({ form }) => {
  const [day, setDay] = useState<IDay>({
    start: null,
    end: null,
    duration: null,
  });
  const { CONTRACT_NAME, CONTRACT_CODE, START_DAY, END_DAY } = useTranslate(
    "businessContractTranslateKey"
  );
  const { PLACEHOLDER } = useTranslate("common");
  const dispatch = useDispatch();
  const disabledDateEnd = (current) => {
    if (day.start) {
      return current && current < moment(day.start).endOf("day");
    }
  };
  const disabledDateStart = (current) => {
    return current && current < moment().endOf("day");
  };
  const businessContract = useSelector((state: RootState) => state.businessContractStore.day)
  useEffect(() => {
    // WITH ADD FORM
    if (day.start && day.end) {
      dispatch(updateBusinessContractDay([day?.start, day?.end]));
    } else if (businessContract.start && businessContract.end) {
      // with copy and edit form 
      setDay(prev => ({ ...prev, ...businessContract }))
    } else {
      // With fake form 
      dispatch(
        updateBusinessContractDay([
          draftData.businessContractStart,
          draftData.businessContractEnd,
        ])
      );
    }


  }, []);

  return (
    <>
      <Form.Item
        label={START_DAY}
        name={`businessContractStart`}
        rules={[{ required: true }]}
      >
        <DatePicker
          format="DD/MM/YYYY"
          // disabledDate={disabledDateStart}
          placeholder={"dd/mm/yyyy"}
          onChange={(time, timeString) => {
            return setDay((prev) => ({ ...prev, start: time ? time : null }));
          }}
          value={moment(day.start)}
          suffixIcon={[
            <>
              <UilCalendarAlt size={18} color={"#FF7506"} />
            </>,
          ]}
        />
      </Form.Item>
      <Form.Item
        label={END_DAY}
        name={`businessContractEnd`}
        dependencies={["businessContractStart"]}
        rules={[{ required: true }]}
      >
        <DatePicker
          disabledDate={disabledDateEnd}
          format="DD/MM/YYYY"
          placeholder={"dd/mm/yyyy"}
          suffixIcon={[
            <>
              <UilCalendarAlt size={18} color={"#FF7506"} />
            </>,
          ]}
          onChange={(time, timeString) => {
            return setDay((prev) => ({ ...prev, end: time ? time : null }));
          }}
          value={moment(day.end)}
        />
      </Form.Item>
    </>
  );
};

export default StartEndDay;
