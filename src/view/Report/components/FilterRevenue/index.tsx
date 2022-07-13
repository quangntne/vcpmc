import React from "react";
import "./styles.scss";
import SelectAndLabelComponent from "@view/shared/components/SelectAndLabelConponent";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@modules/core/store/redux";
import { updateDetailSort, updateSortBy } from "@modules/report/reportContractStore";

interface IProps {
  filterFunction?: (value: string | number) => void;
}

const FilterRevenue = ({ filterFunction }: IProps) => {
  const dispatch = useDispatch();
  const report = useTranslate("reportRevenueTranslateKey");
  //selector
  const sortBy = useSelector((state: RootState) => state.reportContractStore.sortBy);
  const detailSort = useSelector((state: RootState) => state.reportContractStore.detailSort);

  console.log('sortBy', sortBy);
  console.log('detailSort', detailSort);

  const NEWMONTH = [
    {
      value: 1,
      name: report.January
    },
    {
      value: 2,
      name: report.February
    },
    {
      value: 3,
      name: report.March
    },
    {
      value: 4,
      name: report.April
    },
    {
      value: 5,
      name: report.May
    },
    {
      value: 6,
      name: report.June
    },
    {
      value: 7,
      name: report.July
    },
    {
      value: 8,
      name: report.August
    },
    {
      value: 9,
      name: report.September
    },
    {
      value: 10,
      name: report.October
    },
    {
      value: 11,
      name: report.November
    },
    {
      value: 12,
      name: report.December
    },
  ];

  const PRECIOUS = [
    {
      value: 1,
      name: report.Quarter1
    },
    {
      value: 2,
      name: report.Quarter2
    },
    {
      value: 3,
      name: report.Quarter3
    },
    {
      value: 4,
      name: report.Quarter4
    }
  ];

  const arrMonthPrecious = [
    {
      value: 1,
      name: report.MONTHLY
    },
    {
      value: 2,
      name: report.PRECIOUS
    }
  ];

  const onChangeSortBy = (value) => {
    dispatch(updateSortBy(value));
    dispatch(updateDetailSort(1));
  }

  const onChangeDetailSort = (value) => {
    dispatch(updateDetailSort(value));
  }

  return (
    <>
      <div className="d-flex div-search justify-content-between mb-3">
        <div className="d-flex mt-2">
          <div className="right-author">
            <SelectAndLabelComponent textLabel={sortBy === 1 ? report.MONTHLY : report.PRECIOUS}
              dataString={arrMonthPrecious}
               value={sortBy}
               onChange={onChangeSortBy} />
          </div>
          <div className="effect-contract ml-5">
            <SelectAndLabelComponent dataString={sortBy === 1 ? NEWMONTH : PRECIOUS}
              onChange={onChangeDetailSort} value={detailSort} />
          </div>
        </div>
      </div>
    </>
  );
};
export default React.memo(FilterRevenue);











