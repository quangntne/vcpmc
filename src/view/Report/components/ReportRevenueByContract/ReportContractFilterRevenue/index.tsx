import React, { useState, useEffect } from 'react';

import { Select, Button, Form, DatePicker, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import moment, { Moment } from 'moment';
// import CONFIG from '@config/index';

import { useAsync } from '@view/shared/hook/useAsync';
import reportRepository from '@modules/report/repository';

import { useDispatch, useSelector } from 'react-redux';
import { updateReportQuy } from '@modules/report/reportContractStore';
import { useTranslate } from '@view/shared/hook/useTranslate';
import { common, latchTranslateKey } from '@view/shared/translateKey';
import { RootState } from '@modules/core/store/redux';
import CheckPermission from '@view/shared/hoc/CheckPermission';

const timeFormat = 'DD/MM/YYYY';

const ReportContractFilter = ({ tableRef }) => {
  const { LATCH_DATA } = useTranslate("latchTranslateKey");
  const { latchConstract, getLatchListDateByDate } = reportRepository;
  const [
    { execute: latchConstractAsync, value: dataLatch, status: statusLatch },
    { execute: getLatchListDateByDateAsync, value: dataLatchDate },
  ] = useAsync(latchConstract, getLatchListDateByDate);
  const [flagLatch, setflagLatch] = useState(true);

  const { PLACEHOLDER, REPORT_BY_DATE } = useTranslate("common");

  const dispatch = useDispatch();

  const handleChangeDatePicker = async (date: Moment, dateString) => {
    const dateFrom = date;
    const dateTo = date;
    if (date.isSameOrBefore(moment(date))) {
      setflagLatch(false);
    }
    dispatch(
      updateReportQuy({
        from: dateFrom.format('YYYY-MM-DD'),
        to: dateTo.format('YYYY-MM-DD'),
      }),
    );
    tableRef &&
      tableRef.fetchData &&
      tableRef.fetchData({
        option: {
          dateFrom: dateFrom.format('YYYY-MM-DD'),
          dateTo: dateFrom.format('YYYY-MM-DD'),
        },
      });
  };
  const path = useSelector(
    (state: RootState) => state.reportContractStore.path,
  );
  useEffect(() => {
    dispatch(
      updateReportQuy({
        from: moment().format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD'),
      }),
    );
    getLatchListDateByDateAsync().then((res) => {
      // console.log(object)
      if (moment().isSameOrBefore(res)) {
        setflagLatch(false);
      }
    });
  }, []);
  const handleLatchContract = () => {
    latchConstractAsync({ dateTo: path.to });
  };
  const handleDisabledDate = (current) => {
    if (current) {
      return current < moment(dataLatchDate);
    }
  };

  return (
    <div className="d-flex mt-3">
      <Space direction="vertical">
        <div className="d-flex">
          <span style={{ width: '255px', marginTop: '5px' }}>
            {REPORT_BY_DATE}:{' '}
          </span>
          {
            // flagLatch &&
            <DatePicker
              placeholder={PLACEHOLDER}
              disabledDate={handleDisabledDate}
              format={timeFormat}
              onChange={handleChangeDatePicker}
              defaultValue={moment()}
            />
          }
        </div>
      </Space>
      <CheckPermission permissionCode={'LATCH_DATA'}>
        <div className="main-form">
          {' '}
          <Button
            onClick={handleLatchContract}
            className="normal-button"
            loading={statusLatch === 'loading'}
            style={{ marginLeft: '15px' }}
          >
            {LATCH_DATA}
          </Button>
        </div>
      </CheckPermission>
    </div>
  );
};

export default ReportContractFilter;
