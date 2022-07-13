import {
  updateBusinessContractType,
  updateBusinessContractValue,
} from "@modules/businessContract/businessContractStore";
import { RootState } from "@modules/core/store/redux";
import {
  formatMoneyVND,
  formatNumberInput,
} from "@view/shared/helper/functions";
import { useTranslate } from "@view/shared/hook/useTranslate";
import {
  businessContractTranslateKey,
  common,
} from "@view/shared/translateKey";
import {
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { draftData } from "@view/BusinessContract/interface";

const TypeContract = ({ form }) => {
  const [typeRadio, setTypeRadio] = useState<number>(null);
  const {
    CONTRACT_TYPE,
    VALUE_PER_DAY,
    VALUE_PER_SONG,
    ALL_ONE,
    CONTRACT_VALUE,
    TURN_VALUE,
    DAY,
    TURN,
  } = useTranslate("businessContractTranslateKey");
  const { VALIDATE_REQUIRE } = useTranslate("common");
  const store = useSelector((state: RootState) => state.businessContractStore);
  const { totalMoney, businessContractValue, day } = store;
  const dispatch = useDispatch();
  const [disTypeContract, setDisTypeContract] = useState(false);
  const onChangeRadio = (e) => {
    setTypeRadio(e.target.value);
    if (e.target.value == 2) {
      setDisTypeContract(true);
    } else {
      setDisTypeContract(false);
    }
    dispatch(updateBusinessContractType(e.target.value));
    console.log(disTypeContract, "disTypeContract");
    
  };

  const getValueFromEvent = (e) => {
    const days = moment(form.getFieldValue("BusinessContractEnd")).diff(
      form.getFieldsValue("BusinessContractStart"),
      "days"
    );
  };

  useEffect(() => {
    setTypeRadio(draftData.BusinessContractType);
    dispatch(updateBusinessContractType(draftData.BusinessContractType));
    dispatch(updateBusinessContractValue(draftData.BusinessContractValue));
  }, []);

  const valueDistribution = useSelector(
    (state: RootState) => state.businessContractStore.totalMoney
  );
  
  const onChangeMoney = (e) => {
    dispatch(updateBusinessContractValue(e));
  };

  return (
    <>
      <Form.Item label={CONTRACT_TYPE} />
      <Row>
        <Col span={6}>
          <Form.Item name="businessContractType" wrapperCol={{ span: 24 }}>
            <Radio.Group onChange={onChangeRadio}>
              <Radio value={1}>{ALL_ONE}</Radio>
              <Radio value={2} style={{ marginTop: "4.7rem" }}>
                {VALUE_PER_SONG}
              </Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Divider type="vertical" />
        <Col span={17} push={2}>
          <div>
            <Form.Item
              className={"label-normal"}
              dependencies={["BusinessContractStart", "BusinessContractEnd"]}
              label={
                <>
                  {CONTRACT_VALUE} <div>(VNĐ)</div>
                </>
              }
              name="businessContractValue"
            >
              <InputNumber
                formatter={(value) => formatNumberInput(value)}
                onChange={onChangeMoney}
                style={{ width: "150px" }}
                disabled={disTypeContract}
              />
            </Form.Item>
            <Form.Item
              dependencies={[
                "BusinessContractValue",
                "BusinessContractStart",
                "BusinessContractEnd",
              ]}
              className={"label-normal"}
              label={
                <>
                  {VALUE_PER_DAY} <div>(VNĐ)/{DAY}</div>
                </>
              }
              name="valueDistribution"
            >
              <p style={{display: "none"}}>{valueDistribution}</p>
              <InputNumber
                value={formatNumberInput(valueDistribution)}
                style={{ width: "150px" }}
                disabled={true}
              />
            </Form.Item>
          </div>
          <div className="type-contract-turn">
            <Form.Item
              className={"label-normal"}
              label={
                <>
                  {TURN_VALUE} <div>(VNĐ)/{TURN}</div>
                </>
              }
              name="businessContractValue"
            >
              <InputNumber
                style={{ width: "150px" }}
                formatter={(value) => formatNumberInput(value)}
                onChange={onChangeMoney}
                disabled={!disTypeContract}
              />
            </Form.Item>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default TypeContract;
