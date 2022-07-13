import BusinessContractEntity from "@modules/businessContract/entity";
import listGroupPresenter from "@modules/listGroup/presenter";
import {
  detailCustomerInfo,
  renderGender,
} from "@view/BusinessContract/interface";
import ContentComponent from "@view/shared/components/ContentComponent";
import LabelComponent from "@view/shared/components/ContentComponent/LabelComponent";
import TitleComponent from "@view/shared/components/MainTitleComponent/TitleComponent";
import { useAsync } from "@view/shared/hook/useAsync";
import { useTranslate } from "@view/shared/hook/useTranslate";

import { Col, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";

const DetailCustomerInfo = ({ businessContractItem }) => {

  const langText = useTranslate(
    "aucontractTranslateKey",
    "businessContractTranslateKey"
  );

  const renderDetailBusiness = () => {
    return detailCustomerInfo.map((item, index) => {
      if (businessContractItem && businessContractItem?.businessCustomer) {
        const renderItem = () => {
          let textRender = businessContractItem?.businessCustomer[item?.text];
          switch (item.text) {
            case "businessCustomerGender": {
              textRender = langText[renderGender[textRender]];
              break;
            }
            case "businessCustomerBirthday":
            case "businessCustomerIdentityIssuanceDate": {
              textRender = moment(textRender).format("DD/MM/YYYY");
              break;
            }
            case "***********": {
              textRender = item.text;
              break;
            }
            default: {
              if (businessContractItem?.businessCustomer?.businessOrganization[item.text]) {
                textRender = businessContractItem?.businessCustomer?.businessOrganization[item.text]
              }
              else if (!businessContractItem?.businessCustomer[item.text]) {

                textRender = "--";
              }
              break;
            }
          }
          // if (businessContractItem[item.text]) {
          //   textRender = businessContractItem[item?.text];
          // } else if (businessContractItem?.businessCustomer[item.text]) {

          // } else  else if (item.text == "businessCustomerGender"){
          //   textRender = langText[renderGender[textRender]];
          // }
          // else if (item.label== `Pass_word`){
          //   textRender = item.text;
          // }
          // else {

          // }
          return <ContentComponent label={langText[item.label]} text={textRender} />;
        };
        return (
          <>
            <Col span={8}>{renderItem()}</Col>
            {item?.col == 16 && <Col span={8}></Col>}
          </>
        );
      }
    });
  };
  return (
    <>
      <Row gutter={8}>{renderDetailBusiness()}</Row>
    </>
  );
};

export default DetailCustomerInfo;
