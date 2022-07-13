import { dataTest } from '@view/Report/test';
import MainTitleComponent from '@view/shared/components/MainTitleComponent';
import React, { useCallback, useState } from 'react';
import ListContract from './ListContract';
import ReportContractFilter from './ReportContractFilterRevenue';
import { Tabs } from 'antd';
import './Styles.scss';
import { useDispatch } from 'react-redux';
import { updateReportQuy } from '@modules/report/reportContractStore';
import moment from 'moment';
import CheckPermission from '@view/shared/hoc/CheckPermission';
import { useTranslate } from '@view/shared/hook/useTranslate';
import { revenueByExploitingContractTranslateKey } from '@view/shared/translateKey';

const ReportRevanueByContract = () => {
  const [dataReportRevenue, setDataReportRevenue] = useState(null);
  const {
    RP_REVENUE_BY_EXPLOITING_CONTRACT,
    LIST_EXPLOITING_CONTRACT,
    HISTORY_EXPLOITING_CONTRACT,
  } = useTranslate("revenueByExploitingContractTranslateKey");
  const dispatch = useDispatch();
  // const handleFilter = useCallback((value: string | number) => {
  //     const dataMonthFind = dataTest.find((x) => x.month == value);
  //     setDataReportRevenue(dataMonthFind);
  // }, []);
  const callback = (key) => {
    dispatch(
      updateReportQuy({
        from: moment().format('YYYY-MM-DD'),
        to: moment().format('YYYY-MM-DD'),
      }),
    );
  };

  const { TabPane } = Tabs;
  return (
    <div>
      <div className="w-100">
        <MainTitleComponent
          breadcrumbs={[
            {
              name: RP_REVENUE_BY_EXPLOITING_CONTRACT,
              href: '/report-revenue-by-contract',
            },
          ]}
          title={RP_REVENUE_BY_EXPLOITING_CONTRACT}
          classBreadcumb={null}
          classTitle={null}
        />
        {/* <h3 style={{ color: "white", margin: "20px 0" }}>
          DANH SÁCH HỢP ĐỒNG KHAI THÁC - KỲ THÁNG {}
        </h3> */}
        {/* <ReportContractFilter filterFunction={handleFilter} /> */}

        <div className="w-20 detail-revenue-contract">
          <Tabs
            defaultActiveKey="1"
            onChange={callback}
            destroyInactiveTabPane
            className="tab-custom tab-custom-50"
          >
            <TabPane
              tab={LIST_EXPLOITING_CONTRACT}
              style={{ color: 'white' }}
              key="1"
            >
              <ListContract withSelect={1} />
            </TabPane>
            <TabPane tab={HISTORY_EXPLOITING_CONTRACT} key="2">
              <ListContract withSelect={2} />
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ReportRevanueByContract;
