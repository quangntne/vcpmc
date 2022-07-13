import { Row, Col, DatePicker } from "antd";
import React, { useEffect, useMemo, useState } from "react";
import * as moment from "moment";
import { Moment } from "moment";

import { useAsync } from "@view/shared/hook/useAsync";
import settingRepository from "@modules/setting/repository";

interface Props {
    format?: string;
    onChange?: (value: {
        dateRange: any,
        dateString: any,
        datePicker: any,
        datePickerString: any,
        type: any
    }) => void;
    value?: Moment;
    registerRef?: any;
    disable?: boolean;
    debugValue?: boolean
}
//Example Value =
// xuanmaixminhbeo console.log(moment("march", "MMM")) // month type Moment  haha
// console.log(moment("Q3", "QQ")) //quarter type Moment

const FilterByPeriod = (props: Props) => {
  const [type, settype] = useState<1 | 0>(0); // 0:Quys, 1:thang

  const [valueDatePicker, setDatePicker] = useState<{
    date: Moment;
    dateRange: { dateFrom: Moment; dateTo: Moment };
  }>({
    date: moment(),
    dateRange: {
      dateFrom: undefined,
      dateTo: undefined,
    },
  });

  const { getSettingSystem } = settingRepository;
  const [{ execute: getSettingSystemAsync, value: dataSetting }] = useAsync(
    getSettingSystem
  );

  const handleConverDateFromTo = (date: Moment, _type, value?) => {
    const __value: any = value || dataSetting?.value;
    let dateFrom = date.clone();
    let dateTo = date.clone();
    if (_type === 1) {
      // month
      const maxDateFrom = date
        .clone()
        .subtract(1, "month")
        .endOf("month")
        .get("D");
      const maxDateTo = date.clone().endOf("month").get("D");
      let dateSetFrom = __value;
      let dateSetTo = __value;
      if (__value > maxDateFrom) {
        dateSetFrom = maxDateFrom;
      }
      if (__value > maxDateTo) {
        dateSetTo = maxDateTo;
      }
      dateFrom.subtract(1, "month").set("date", dateSetFrom).add(1, "day");
      dateTo.set("date", dateSetTo);
    }
    if (_type === 0) {
      const indexQuater = date.get("quarter");

      if (indexQuater > 0 && indexQuater < 5) {
        if (__value && __value.length > 0) {
          dateFrom = moment(__value[indexQuater - 1].dateFrom);
          dateTo = moment(__value[indexQuater - 1].dateTo);
        }
      }
    }

    return {
      dateFrom,
      dateTo,
    };
  };
  const handleChangeDatePicker = (date: Moment, dateString) => {
    const dateFrom = handleConverDateFromTo(date, type).dateFrom;
    const dateTo = handleConverDateFromTo(date, type).dateTo;
    setDatePicker({
      date,
      dateRange: {
        dateFrom,
        dateTo,
      },
    });
  };

  useEffect(() => {
    getSettingSystemAsync().then((res) => {
      if (res) {
        settype(res.type);
      }
    });
  }, []);

  useEffect(() => {
    if (moment.isMoment(props.value) && (type === 0 || type === 1)) {
      setDatePicker({
        date: props.value,
        dateRange: handleConverDateFromTo(props.value, type),
      });
    }
  }, [props.value, type]);

  useMemo(() => {
    let dateString = [];
    const __value = valueDatePicker.date;
    if (dataSetting) {
      const dateRange = handleConverDateFromTo(
        __value,
        dataSetting.type,
        dataSetting.value
      );

      if (
        moment.isMoment(dateRange.dateFrom) &&
        moment.isMoment(dateRange.dateTo)
      ) {
        dateString = [
          dateRange.dateFrom.clone().format("DD/MM/YYYY"),
          dateRange.dateTo.clone().format("DD/MM/YYYY"),
        ];
      }
      let datePickerString = "";
      if (type == 1 && moment.isMoment(__value)) {
        datePickerString = __value.format("MMM");
      }
      if (type == 0 && moment.isMoment(__value)) {
        datePickerString = __value.format("Q");
      }
      props.onChange &&
        props.onChange({
          dateRange,
          dateString,
          datePicker: __value,
          datePickerString,
          type,
        });
    }
  }, [valueDatePicker, dataSetting]);

  let format = "MM - YYYY";

  if (dataSetting?.type !== 0 && dataSetting?.type !== 1) {
    return null;
  }
  if (dataSetting?.type === 0) {
    format = "[Q]Q - YYYY";
  }

  if (props.registerRef) {
    props.registerRef.getRangeDate = (date) => {
      return handleConverDateFromTo(date, dataSetting.type);
    };
    props.registerRef.getDatePicker = (format?: string) => {
      let dateString = null;
      let __format = format;
      if (type === 0 && moment.isMoment(valueDatePicker.date)) {
        __format = "MMM";
        dateString = moment(valueDatePicker.date).format(format);
      }
      if (type === 1 && moment.isMoment(valueDatePicker.date)) {
        __format = "Q";
        dateString = moment(valueDatePicker.date).format(format);
      }
      return {
        dateMoment: valueDatePicker.date,
        dateString: dateString,
      };
    };
    props.registerRef.getDatePicker = (date) => {
      return valueDatePicker.date;
    };
    props.registerRef.status = "success";
  }

  return (
    <Row className={"main-form"} gutter={[15, 15]}>
      <Col className="d-flex align-items-center ">
        <div>
          Xem theo báo cáo kỳ theo {"  "}
          <h4 className="color-yellow font-weigth d-inline">
            {" "}
            {type == 1 ? "Tháng" : "Quý"}{" "}
            {props.disable &&
              valueDatePicker.date.format(type == 1 ? "MM - YYYY" : "Q - YYYY")}
          </h4>
        </div>
      </Col>
      <Col>
        {!props.disable && (
          <DatePicker
            value={valueDatePicker.date}
            format={format}
            onChange={handleChangeDatePicker}
            picker={type == 1 ? "month" : "quarter"}
          />
        )}
      </Col>
      {props.debugValue && (
        <>
          {" "}
          <Col span={24}>
            {" "}
            Range Date:{" "}
            {valueDatePicker.dateRange?.dateFrom?.format("DD/MM/YYYY")} -{" "}
            {valueDatePicker.dateRange?.dateTo?.format("DD/MM/YYYY")}{" "}
          </Col>
          <Col span={24}>
            {" "}
            Date picker: {valueDatePicker.date.format("DD/MM/YYYY")}{" "}
          </Col>{" "}
        </>
      )}
    </Row>
  );
};

export default FilterByPeriod;
