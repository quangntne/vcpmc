import { Row, Col } from "antd";
import React from "react";
import { IDataTest } from "../../test";
import "./styles.scss";
import { useTranslate } from "@view/shared/hook/useTranslate";
import CurrencyFormatComponent from '@view/shared/components/CurrencyFormatComponent'

interface IProps {
  data: IDataTest;
}

const InformationRevenue = ({ data }) => {
  const report = useTranslate("reportRevenueTranslateKey");
  return (
    <Row className='text-center label-row-revenue'>
      <Col style={{ display: 'grid' }} lg={6} sm={6} xs={6} className='label-col-revenue'>
        <label>{report.TOTAL_SONGS}</label>
        <strong>{data ?
          <CurrencyFormatComponent value={data.totalSong} />
          : 0}</strong>
      </Col>
      <Col style={{ display: 'grid' }} lg={6} sm={6} xs={6} className='label-col-revenue'>
        <label>{report.TOTAL_PLAYS}</label>
        <strong>{data ?
          <CurrencyFormatComponent value={data.totalPlays} />
          : 0}</strong>
      </Col>
      <Col style={{ display: 'grid' }} lg={6} sm={6} xs={6} className='label-col-revenue'>
        <label>{report.TOTAL_REVENUE}</label>
        <strong>{data ?
          <CurrencyFormatComponent value={data.totalRevenue} suffix={"đ"} />
          : 0}</strong>
      </Col>
      <Col style={{ display: 'grid' }} lg={6} sm={6} xs={6} className='label-col-revenue'>
        <label>{report.VCPMC}</label>
        <strong>{data ?
          <CurrencyFormatComponent value={data.vcpmc} suffix={"đ"} />
          : 0}</strong>
      </Col>
    </Row>
  );
};
export default React.memo(InformationRevenue);


