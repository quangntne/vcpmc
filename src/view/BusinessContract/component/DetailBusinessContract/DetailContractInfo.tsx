import BusinessContractEntity from "@modules/businessContract/entity";
import { RootState } from "@modules/core/store/redux";
import ContentComponent from "@view/shared/components/ContentComponent";
import LabelComponent from "@view/shared/components/ContentComponent/LabelComponent";
import TextComponent from "@view/shared/components/ContentComponent/TextComponent";
import DownloadMedia from "@view/shared/components/DowloadComponent";
import TitleComponent from "@view/shared/components/MainTitleComponent/TitleComponent";
import { formatMoneyVND } from "@view/shared/helper/functions";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { Col, Row } from "antd";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import StatusCircle from "./StatusCircle";

const DetailContractInfo = ({ businessContractItem }) => {
  const renderDowload = () => {
    if (
      businessContractItem?.businessContractAttachments &&
      businessContractItem?.businessContractAttachments.length > 0
    ) {
      return businessContractItem?.businessContractAttachments.map((item) => {
        return (
          <DownloadMedia
            data={{ link: item.FilePath, name: item.FilePath.split("/")?.pop() }}
            icon={<i className="far fa-file-word" />}
          />
        );
      });
    } else {
      return "-";
    }
  };

  const {
    THIS_CONTRACT_TYPE,
    CONTRACT_NAME,
    EXPIRATION_DATE,
    VALUE_PER_SONG,
    EFFECT_DATE,
    ALL_ONE,
    ATTACHMENT,
    CONTRACT_ID,
    CONTRACT_VALUE,
    Status,
  } = useTranslate("businessContractTranslateKey", "aucontractTranslateKey", "recordGalleryTranslateKey");
  return (
    <>
      <section className="detail-business-contract mt-5">
        <Row gutter={24}>
          <Col span={8}>
            <ContentComponent
              label={CONTRACT_NAME}
              text={businessContractItem?.businessContractName}
            />
            <ContentComponent
              label={CONTRACT_ID}
              text={businessContractItem?.businessContractCode}
            />
            <ContentComponent
              label={EFFECT_DATE}
              text={moment(businessContractItem?.businessContractStart).format("DD/MM/YYYY")}
            />
            <ContentComponent
              label={EXPIRATION_DATE}
              text={moment(businessContractItem?.businessContractEnd).format("DD/MM/YYYY")}
            />
          </Col>
          <Col span={8}>
            <Row>
              <Col span={11}>
                <LabelComponent text={ATTACHMENT} />
              </Col>
              <Col span={13}>
                {renderDowload()}
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <ContentComponent
              label={THIS_CONTRACT_TYPE}
              text={
                businessContractItem?.businessContractType == 2
                  ? VALUE_PER_SONG
                  : ALL_ONE
              }
            />

            <ContentComponent
              label={`${CONTRACT_VALUE} (VNĐ)`}
              text={formatMoneyVND(businessContractItem?.businessContractValue)}
            />

            <Row>
              <Col span={11}>
                <LabelComponent text={Status} />
              </Col>
              <Col span={13}>
                <StatusCircle data={businessContractItem} />
              </Col>
            </Row>

          </Col>
        </Row>
      </section>
    </>
  );
};

export default DetailContractInfo;
