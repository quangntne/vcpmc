import React, { useEffect, useState } from 'react';
import Search from 'antd/lib/input/Search';
import './Styles.scss';
import { Button, Col, Row } from 'antd';
import { useTranslate } from '@view/shared/hook/useTranslate';
import TableComponent from '@view/shared/components/TableComponent';
import RightMenu from '@view/shared/components/layout/RightMenu';

import ReportContractFilter from '../ReportContractFilterRevenue';
import getReportDataContractPresenter from '@modules/report/presenter';
import moment from 'moment';
import ReportContractFilterHistory from '../ReportContractFilterHistory';
import { useHistory } from 'react-router-dom';
import { routerRptRevByExploiting } from '@view/routers';
import { CSVLink } from 'react-csv';
import { useAsync } from '@view/shared/hook/useAsync';
import { formatMoneyVND } from '@view/shared/helper/functions';
import { useSelector } from 'react-redux';
import { RootState } from '@modules/core/store/redux';
import useTable from '@view/shared/components/TableComponent/hook';

const ListContract = ({ withSelect }) => {
  const history = useHistory();
  const [dataTable, setDataTable] = useState(null);
  const [getList] = useAsync(
    getReportDataContractPresenter.getReportDataContract,
  );
  const [filter, setFilter] = useState('');
  const [keyRow, setKeyRow] = useState([]);
  const rowSelection = {
    selectedRowKeys: keyRow,
    onChange: (selectedRowKeys) => {
      setKeyRow(selectedRowKeys);
    },
  };
  const headers = [
    { label: 'businessContractCode', key: 'businessContractCode' },
    { label: 'authorityName', key: 'authorityName' },
    {
      label: 'businessContractEnd',
      key: 'businessContractEnd',
      // (text, record) => {
      //     return moment
      //       .duration(
      //         moment(record.businessContractEnd).diff(
      //           moment(record.businessContractStart)
      //         )
      //       )
      //       .as("day");
      //   },
    },
    { label: 'businessContractType', key: 'businessContractType' },
    { label: 'countDevice', key: 'countDevice' },
    { label: 'countPlaysMedia', key: 'countPlaysMedia' },
    { label: 'totalRevenue', key: 'totalRevenue' },
  ];
  useEffect(() => {
    // getList.execute().then((res) => {
    //   setDataTable(res.data);
    // });
  }, []);
  const csvReport = {
    filename: 'report.csv',
    headers: headers,
    data: dataTable ? dataTable : [],
  };
  const [dataAction, setDataAction] = useState({
    selectedRowKeys: [],
    selectedRows: [],
  });

  const { EXPORT_CSV, PLACEHOLDER } = useTranslate("common");
  const {
    TYPE_LATCH,
    DATE_LATCH,
    DATE_CONFIRM_LATCH,
    LATCH_DATA,
    CONTRACT_NAME_LATCH,
  } = useTranslate("latchTranslateKey");
  const {
    CONTRACT_REVENUE,
    UNIT_REVENUE,
    DAY_LEFT_OF_CONTRACT,
    TYPE_OF_CONTRACT,
    NUMBER_OF_DEVICE,
    SUM_OF_VIEWS,
    TOTAL_REVENUE,
  } = useTranslate("revenueByExploitingContractTranslateKey");
  const tableRef = useTable();
  const historyColumns = [
    {
      title: CONTRACT_NAME_LATCH,
      dataIndex: 'businessContractName',
      key: 'businessContractName',
    },
    {
      title: TYPE_LATCH,
      dataIndex: 'typeLatch',
      key: 'typeLatch',
    },
    {
      title: DATE_LATCH,
      dataIndex: 'dateLatch',
      key: 'dateLatch',
    },
    {
      title: DATE_CONFIRM_LATCH,
      dataIndex: 'dateConfirmLatch',
      key: 'dateConfirmLatch',
    },
  ];
  const columns = [
    {
      title: CONTRACT_REVENUE,

      dataIndex: 'businessContractCode',
      key: 'businessContractCode',
    },
    {
      title: UNIT_REVENUE,
      dataIndex: 'authorityName',
      key: 'authorityName',
    },
    {
      title: DAY_LEFT_OF_CONTRACT,
      dataIndex: 'businessContractEnd',
      key: 'businessContractEnd',
      render: (text, record) => {
        return moment
          .duration(
            moment(record.businessContractEnd).diff(
              moment(record.businessContractStart),
            ),
          )
          .as('day');
      },
    },
    {
      title: TYPE_OF_CONTRACT,
      dataIndex: 'businessContractType',
      key: 'businessContractType',
      // render: (text) => (
      //   <span>{text === 1 ? "Trọn Gói" : "Giá trị bài hát / Lượt phát"}</span>
      // ),
    },
    {
      title: NUMBER_OF_DEVICE,
      dataIndex: 'countDevice',
      key: 'countDevice',
    },

    {
      title: SUM_OF_VIEWS,
      dataIndex: 'countPlaysMedia',
      key: 'countPlaysMedia',
    },

    {
      title: TOTAL_REVENUE,
      dataIndex: 'totalRevenue',
      key: 'totalRevenue',
      render: (text) => formatMoneyVND(text),
    },
  ];

  const path = useSelector(
    (state: RootState) => state.reportContractStore.path,
  );
  const arrayAction = [
    {
      icon: 'fas fa-info-circle',
      name: 'detail',
      handleAction: () => {
        history.push(
          routerRptRevByExploiting.DETAIL_RP_REV_BY_EXPLOITING +
            `/${keyRow[0]}` +
            `?from=${path.from}&to=${path.to}`,
        );
      },

      disable: keyRow.length != 1,
    },
  ];

  const onClickCheckbox = (record) => {
    const selectedRowKeys = [...keyRow];
    if (selectedRowKeys.indexOf(record.businessContractId) >= 0) {
      selectedRowKeys.splice(
        selectedRowKeys.indexOf(record.businessContractId),
        1,
      );
    } else {
      selectedRowKeys.push(record.businessContractId);
    }
    setKeyRow(selectedRowKeys);
  };
  const handleSearchChange = (value) => {
    tableRef.fetchData &&
      tableRef.fetchData({
        option: { searchContent: value, dateFrom: path.from, dateTo: path.to },
      });
  };
  return (
    <div>
      {withSelect === 1 ? <ReportContractFilter tableRef={tableRef} /> : ''}
      {withSelect == 2 ? <ReportContractFilterHistory /> : ''}

      <Row
        className="main-form mt-3 "
        justify={'space-between'}
        align={'middle'}
      >
        <Col>
          <Search
            placeholder={PLACEHOLDER}
            className="ant-form-search "
            onSearch={handleSearchChange}
          />
        </Col>

        <Col>
          <Button className="normal-button">
            <CSVLink {...csvReport}>{EXPORT_CSV}</CSVLink>
          </Button>
        </Col>
      </Row>

      <RightMenu arrayAction={arrayAction} />

      <TableComponent
        register={tableRef}
        //just CHECKBOX, ko co cung duoc
        rowKey={(record: any) => record.businessContractId}
        rowSelection={{ type: 'checkbox', ...rowSelection }}
        onRow={(record, rowIndex) => ({
          onClick: () => onClickCheckbox(record),
        })}
        className="table-revenue"
        style={{ marginTop: '20px' }}
        defaultOption={{
          dateFrom: moment().format('YYYY-MM-DD'),
          dateTo: moment().format('YYYY-MM-DD'),
        }}
        //PHUC TABLE
        apiServices={
          withSelect === 1
            ? getReportDataContractPresenter.getReportDataContract
            : getReportDataContractPresenter.getReportHistoryDataContract
        }
        columns={withSelect === 1 ? columns : historyColumns}
      />
    </div>
  );
};

export default ListContract;
