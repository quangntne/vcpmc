import ListGroupEntity from "@modules/listGroup/entity";
import listGroupPresenter from "@modules/listGroup/presenter";
import TitleComponent from "@view/shared/components/MainTitleComponent/TitleComponent";
import { useAsync } from "@view/shared/hook/useAsync";
import { useTranslate } from "@view/shared/hook/useTranslate";
import {
  aucontractTranslateKey,
  businessContractTranslateKey,
  common,
} from "@view/shared/translateKey";
import {
  AutoComplete,
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
} from "antd";
import React, { useEffect, useState } from "react";
import { groupList } from "@view/shared/translateKey";
import { routerBusinessContract } from "@config/path";
import { useHistory } from "react-router";
import moment from "moment";
import UilCalendarAlt from "@iconscout/react-unicons/icons/uil-calendar-alt";
import UilEye from "@iconscout/react-unicons/icons/uil-eye";
import UilEyeSlash from "@iconscout/react-unicons/icons/uil-eye-slash";
import businessContractPresenter from "@modules/businessContract/presenter";
import { businessCustomerEntity, BusinessOrganizationEntity } from "@modules/businessContract/entity";
import { emptyBusinessCustomer, emptyBusinessOrganization } from "@view/BusinessContract/interface";

const CustomerInfo = ({ form, disable, setDisable, setBusinessContractItem, businessContractItem }) => {
  const {
    AUTHORITY_NAME,
    BC_NAME,
    BC_POSITION,
    Gender,
    BC_PHONE,
    BIRTHDAY,
    Nationality,
    Male,
    Female,
    Date_issued,
    Place_issuance,
    Tax_Code,
  } = useTranslate("businessContractTranslateKey");
  const { GROUP_NAME } = useTranslate("groupList");
  const { SAVE, CANCEL, SELECT } = useTranslate("common");
  const {
    Address,
    Account_number,
    Bank_name,
    User_name,
    Pass_word,
    Required_field,
    ID,
  } = useTranslate("aucontractTranslateKey");
  const [arraySuggest, setArraySuggest] = useState([]);
  const [arraySuggestOrganization, setArraySuggestOrganization] = useState([])
  const history = useHistory();
  const [getList, getOranization] = useAsync(businessContractPresenter.getListBusinessCustomer, businessContractPresenter.getListBusinessOrganization);
  const onSelect = (value, businessCustomer) => {
    setTimeout(function () {
      
      form.setFieldsValue(businessCustomer);
      setBusinessContractItem(businessCustomer);
      setBusinessContractItem(prev => ({ ...prev, businessCustomer }))
      if (businessCustomer?.businessCustomerId) {
        setDisable(true)
      }
    }, 300)
  };

  const onSearch = (value) => {
    getList.execute(value).then((res: businessCustomerEntity[]) => {
      let listCustomer = res.map((item: businessCustomerEntity, index) => {
        return { ...item, value: item.businessCustomerName, key: index,  }
      })
      setArraySuggest(listCustomer);
      if (businessContractItem?.businessCustomerId) {
        setDisable(false);
        setBusinessContractItem(prev => ({ ...prev, emptyBusinessCustomer }))
        form.setFieldsValue(emptyBusinessCustomer);
      } else {
        // setBusinessContractItem(prev => ({ ...prev, emptyBusinessCustomer }))

      }
    })
  };

  const onSearchOrganization = (value) => {
    getOranization.execute(value).then((res: BusinessOrganizationEntity[]) => {
      let listCustomer = res.map((item: BusinessOrganizationEntity, index) => {
        return { ...item, value: item.businessCustomerOrganizationName, key: index }
      })
      setArraySuggestOrganization(listCustomer)

      if(businessContractItem?.businessOrganizationId){
        setBusinessContractItem(prev => ({ ...prev, emptyBusinessOrganization }))
      }
    })
  };
  useEffect(() => {
    onSearch("");
    onSearchOrganization("");
  }, [form])
  const disableCurrentDate = (current) => {
    return current && current > moment().endOf("date")
  }
  return (
    <>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item
            rules={[{ required: true, whitespace: true }]}
            label={BC_NAME}
            name={`businessCustomerName`}
          >
            <AutoComplete
              options={arraySuggest}
              onSelect={onSelect}
              onSearch={onSearch}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, whitespace: true }]}
            label={AUTHORITY_NAME}
            name={`businessCustomerOrganizationName`}
          >
            <AutoComplete
              options={arraySuggestOrganization}
              onSelect={onSelect}
              onSearch={onSearchOrganization}
              disabled={disable}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, whitespace: true }]}
            label={BC_POSITION}
            name={`businessCustomerPosition`}
          >
            <Input disabled={disable} />
          </Form.Item>
          <Form.Item
            label={BIRTHDAY}
            name={`businessCustomerBirthday`}
            rules={[
              { required: true },
              () => ({
                validator(_, value) {

                  const year = moment(moment(new Date())).diff(value, "year");
                  if (year >= 18) {
                    return Promise.resolve();
                  } else if (value && year < 18) {
                    return Promise.reject(new Error("Bạn chưa đủ tuổi!!!"));
                  }
                  return Promise.reject();
                },
              }),
            ]}
          >
            <DatePicker
              disabled={disable}
              disabledDate={disableCurrentDate}
              placeholder={"dd/mm/yyyy"}
              format={"DD/MM/YYYY"}
              suffixIcon={[
                <>
                  <UilCalendarAlt size={18} color={"#FF7506"} />
                </>,
              ]}
            />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, whitespace: true }]}
            label={Nationality}
            name={`businessCustomerNationality`}
          >
            <Input disabled={disable} />
          </Form.Item>
          <Form.Item label={BC_PHONE} name={`businessCustomerPhone`}>
            <Input disabled={disable} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, whitespace: true }, { type: "email" }]}
            label={`Email`}
            name={`businessCustomerEmail`}
          >
            <Input disabled={disable} />
          </Form.Item>
        </Col>
        <Col span={8} push={1}>
          <Form.Item
            label={Gender}
            name={`businessCustomerGender`}
            rules={[{ required: true }]}
          >
            <Radio.Group disabled={disable}>
              <Radio value={0}>{Male}</Radio>
              <Radio value={1}>{Female}</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label={ID} rules={[{ required: true }]} name={`businessCustomerIdentity`}>
            <Input disabled={disable} />
          </Form.Item>
          <Form.Item
            label={Date_issued}
            name={`businessCustomerIdentityIssuanceDate`}
            rules={[{ required: true }]}
          >
            <DatePicker
              disabled={disable}
              placeholder={"dd/mm/yyyy"}
              format={"DD/MM/YYYY"}
              disabledDate={disableCurrentDate}
              suffixIcon={[
                <>
                  <UilCalendarAlt size={18} color={"#FF7506"} />
                </>,
              ]}
            />
          </Form.Item>
          <Form.Item
            label={Place_issuance}
            name={`businessCustomerIdentityIssuancePlace`}
            rules={[{ required: true }]}
          >
            <Input disabled={disable} />
          </Form.Item>
          <Form.Item label={Tax_Code} name={`businessCustomerTaxNumber`}>
            <Input disabled={disable} />
          </Form.Item>
          <Form.Item label={Address} name={`businessCustomerAddress`}>
            <Input.TextArea disabled={disable}
              autoComplete={"off"}
              autoSize={{ minRows: 4, maxRows: 4 }}
            />
          </Form.Item>
        </Col>
        <Col span={8} push={2}>
          <Form.Item
            label={User_name}
            name={`businessCustomerLoginEmail`}
            rules={[{ required: true }, { type: "email" }]}
          >
            <Input disabled={disable} style={{ width: "250px" }} />
          </Form.Item>
          <Form.Item
            label={Pass_word}
            name={`businessCustomerPassword`}
            rules={[
              {
                required: true,
              },
              {
                message: "Mật khẩu phải có số, chữ hoa, thường và kí tự đặc biệt",
                pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
              }
            ]}
          >
            <Input.Password disabled={disable}
              style={{ width: "250px" }}
              iconRender={(visible) =>
                visible ? (
                  <UilEyeSlash size={18} color={"#FF7506"} />
                ) : (
                  <UilEye size={18} color={"#FF7506"} />
                )
              }
            />
          </Form.Item>
          <Form.Item
            label={Account_number}
            name={`businessCustomerBankAccountNumber`}
          >
            <Input disabled={disable} style={{ width: "250px" }} />
          </Form.Item>
          <Form.Item label={Bank_name} name={`businessCustomerBankName`}>
            <Input disabled={disable} style={{ width: "250px" }} />
          </Form.Item>
        </Col>
      </Row>
      <div className="mt-2">
        <span className="text-danger">*</span>{" "}
        <span style={{ color: "#F5F5FF", opacity: "0.5" }}>
          {Required_field}
        </span>
      </div>
      <div className="bc-search justify-content-center  mb-5 mt-4">
        <Button
          className="mr-5 cancel-button"
          onClick={() => history.goBack()}
        >
          {CANCEL}
        </Button>
        <Button className="normal-button" htmlType="submit">
          {SAVE}
        </Button>
      </div>
    </>
  );
};

export default CustomerInfo;
