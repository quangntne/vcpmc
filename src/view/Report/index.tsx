import { MONTH } from "@config/index";
import ChartLineComponent from "@view/shared/components/ChartLineComponent";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import { Form, Select } from "antd";
import moment from "moment";
import React, { useCallback, useState } from "react";
import FilterRevenue from "./components/FilterRevenue";
import InformationRevenue from "./components/InformationRevenue/index";
import "./styles.scss";
import { dataTest, IDataTest } from "./test";
import RightMenu, { IArrayAction } from "@view/shared/components/layout/RightMenu";
import { useHistory } from "react-router";
import { useTranslate } from "@view/shared/hook/useTranslate";
import FilterReport from "./components/FilterReport";
interface IProps { }
const ReportRevenue = ({ }: IProps) => {
  const [dataReportRevenue, setDataReportRevenue] = useState<any>(dataTest[0]);
  const report = useTranslate("reportRevenueTranslateKey");
  const history = useHistory();
  const data = [
    {
      name: report.REVENUE_REPORT,
    },
  ];

  const arrayViewAction: IArrayAction[] = [
    {
      iconType: 'report',
      name: report.REPORT_DETAIL,
      handleAction: () => {
        history.push("/report/revenue-by-contract")
      },
    }
  ];


  const handleFilter = useCallback((value: string | number) => {
    const dataMonthFind: any = dataTest.find((x) => x.month == value);
    setDataReportRevenue(dataMonthFind);
  }, []);

  const handleFiltertest = (value: string | number) => {
    const dataMonthFind: any = dataTest.find((x) => x.month == value);
    setDataReportRevenue(dataMonthFind);
  };

  return (
    <div className="w-100">
      <MainTitleComponent
        breadcrumbs={data}
        title={report.REVENUE_REPORT}
        classBreadcumb={null}
        classTitle={null}
      />
      <FilterRevenue filterFunction={handleFilter} />
      <InformationRevenue data={dataReportRevenue} />
      <div className="title-container">
        <span className="text-chart-revenue">
          {report.CHART_TRACK} - <FilterReport />
        </span>

      </div>
      <ChartLineComponent
        data={dataReportRevenue ? dataReportRevenue.data : null}
      />
      <RightMenu arrayAction={arrayViewAction} />
    </div>
  );
};
export default React.memo(ReportRevenue);
