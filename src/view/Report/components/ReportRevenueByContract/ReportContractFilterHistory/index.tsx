import React, { useState, useEffect } from 'react';
import { CaretDownOutlined } from '@ant-design/icons';
import { Select, Button, Form, DatePicker, Space } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import getReportDataContractPresenter from '@modules/report/presenter';
import { useAsync } from '@view/shared/hook/useAsync';
import { useTranslate } from '@view/shared/hook/useTranslate';
import { latchTranslateKey } from '@view/shared/translateKey';
import { useDispatch, useSelector } from 'react-redux';
import { updateReportQuy } from '@modules/report/reportContractStore';
import { RootState } from '@modules/core/store/redux';
// import CONFIG from '@config/index';
const ReportContractFilterHistory = () => {
  // const { RangePicker } = DatePicker;
  const { DATE_LATCH } = useTranslate("latchTranslateKey");
  const [form] = useForm();
  const { Option } = Select;
  const [listDate, setListDate] = useState<object | number | string>(null);
  const [getListDate] = useAsync(
    getReportDataContractPresenter.getReportListDate,
  );
  const dateFormat = 'YYYY/MM/DD';
  const dispatch = useDispatch();
  const path = useSelector(
    (state: RootState) => state.reportContractStore.path,
  );

  useEffect(() => {
    getListDate.execute().then();
  }, []);
  const handleChangeSelect = (value, option) => {
    console.log(value, option);
    // const dateFrom =
    dispatch(
      updateReportQuy({
        from: moment(option.dateFrom).format('YYYY-MM-DD'),
        to: moment(option.dateTo).format('YYYY-MM-DD'),
      }),
    );
  };

  return (
    <div className="d-flex mt-3">
      <span className="mr-3 mt-2">{DATE_LATCH}</span>
      <div className="d-flex" style={{ marginTop: '5px', marginBottom: '5px' }}>
        <Form
          name="basic"
          initialValues={{ remember: true }}
          className="main-form ml-3"
          // form={form}
        >
          <Form.Item name="month" className="big-buton">
            <Select
              suffixIcon={<CaretDownOutlined />}
              placeholder={'Select here...'}
              onChange={handleChangeSelect}
            >
              {getListDate?.value?.map((date) => (
                <Option value={date.dateTo} dateFrom={date.dateFrom}>
                  {moment(date.dateTo).format('DD/MM/YYYY')}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>

      {/* <Button
        className="normal-button"
        style={{ marginLeft: '32px', marginTop: '5px' }}
      >
        Xem báo cáo doanh thu
      </Button> */}
    </div>
  );
};

export default ReportContractFilterHistory;
