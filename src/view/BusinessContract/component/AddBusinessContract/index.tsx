import { routerBusinessContract } from "@config/path";
import { useTranslate } from "@view/shared/hook/useTranslate";
import {
  businessContractTranslateKey,
  common,
} from "@view/shared/translateKey";
import { Button, Checkbox, Col, Form, Input, Row, Steps } from "antd";
import React, { useEffect, useMemo, useRef, useState } from "react";
import ContractInfo from "./ContractInfo";
import CustomerInfo from "./CustomerInfo";
import "./../../styles.scss";
import businessContractPresenter from "@modules/businessContract/presenter";
import { useAsync } from "@view/shared/hook/useAsync";
import { useHistory, useLocation, useParams } from "react-router";
import { useDispatch } from "react-redux";
import BusinessContractEntity from "@modules/businessContract/entity";
import CheckPermission from "@hoc/CheckPermission";
import moment from "moment";
import { FormatNumber, formatNumberDec, useRouter, validateMessages } from "@helper/functions";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import {
  draftData,
  IFormBusinessContract,
} from "@view/BusinessContract/interface";
import { updateBusinessContractDay, updateBusinessContractType, updateBusinessContractValue } from "@modules/businessContract/businessContractStore";

const AddBusinessContract = () => {
  const [form] = Form.useForm();
  const [disable, setDisable] = useState(false)
  const [addBusinessContract, getDetail] = useAsync(
    businessContractPresenter.addBusinessContract,
    businessContractPresenter.getDetailBusinessContract
  );

  const [businessContractItem, setBusinessContractItem] = useState<any>(null);
  
  const history = useHistory();
  const param: { businessContractId: string } = useParams();
  const location = useLocation();

  const typeToCallApi = () => {
    if (
      location.pathname.split("/")[1] ==
      routerBusinessContract.COPY_BUSINESS_CONTRACT.split("/")[1]
    ) {
      return "copy";
    } else if (
      location.pathname.split("/")[1] ==
      routerBusinessContract.EDIT_BUSINESS_CONTRACT.split("/")[1]
    ) {
      return "edit";
    } else {
      return "add";
    }
  };
  const typeToCallApiBS: "add" | "edit" | "copy" = typeToCallApi();
  const dispatch = useDispatch();
  const paramUseMemo = useMemo(() => {
    if (typeToCallApiBS == "edit" || typeToCallApiBS == "copy") {
      getDetail
        .execute(param.businessContractId)
        .then((res: BusinessContractEntity) => {
          let myBS: IFormBusinessContract =
            BusinessContractEntity.createBusinessContractForEdit(res);
          if (typeToCallApiBS == "copy") {
            myBS.businessContractCode = "";
          }
          console.log(myBS, "myBS");
          
          form.setFieldsValue(myBS);
          setBusinessContractItem(myBS);
          setDisable(true);
          // all dispatch to count the Business Customer value  
          dispatch(updateBusinessContractDay([myBS.businessContractStart, myBS.businessContractEnd]))
          dispatch(updateBusinessContractType(myBS.businessContractType));
          dispatch(updateBusinessContractValue(myBS.businessContractValue))
        });
    } if (typeToCallApiBS == "add") {
      dispatch(updateBusinessContractValue(0))
    }
  }, [param]);
  useEffect(() => {
    // form.setFieldsValue({ ...draftData });
  }, []);
  const { ADD, DETAIL, CONTRACT_MINIER, EDIT, COPY_CONTRACT } = useTranslate(
    "businessContractTranslateKey",
    "common"
  );
  const breadcrumbs = () => {
    const breadcrumbsOrigin = [
      {
        name: CONTRACT_MINIER,
        href: routerBusinessContract.BUSINESS_CONTRACT,
      },
      {
        name: DETAIL + " " + CONTRACT_MINIER,
        href:
          routerBusinessContract.DETAIL_BUSINESS_CONTRACT +
          "/" +
          param.businessContractId,
      },
      { name: `${ADD} ${CONTRACT_MINIER}` },
      { name: `${EDIT} ${CONTRACT_MINIER}` },
      { name: `${COPY_CONTRACT}` },
    ];
    const returnArr = [breadcrumbsOrigin[0]];
    switch (typeToCallApiBS) {
      case "add": {
        returnArr.push(breadcrumbsOrigin[2]);
        break;
      }
      case "edit": {
        const editArr = [breadcrumbsOrigin[1], breadcrumbsOrigin[3]];
        returnArr.push(...editArr);
        break;
      }
      default:
        returnArr.push(breadcrumbsOrigin[breadcrumbsOrigin.length - 1]);
        break;
    }
    return returnArr;
  };

  const onFinish = (value) => {
    Object.assign(value, {...businessContractItem});
    console.log(value, "businessContractItem");
    if (typeToCallApiBS == "add" || typeToCallApiBS == "copy") {
      addBusinessContract.execute(value).then((res) => {
        history.push(routerBusinessContract.BUSINESS_CONTRACT);
      });
    } else if (typeToCallApiBS == "edit") {
      addBusinessContract.execute(value, param.businessContractId).then((res) => {
        history.push(routerBusinessContract.BUSINESS_CONTRACT);
      });
    }
  };

  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  };

  return (
    <>
      {/* <CheckPermission permissionCode={"BN_CONTRACT"}> */}
      <div className="add-business-contract">
        <MainTitleComponent
          breadcrumbs={breadcrumbs()}
          detailName={businessContractItem?.businessContractName}
        />
        <div className="form-contract mt-5" id="form-contract">
          <Form
            {...layout}
            labelAlign={"left"}
            className="business-add-form"
            form={form}
            onFinish={onFinish}
            validateMessages={validateMessages()}
          // onValuesChange={onValuesChange}
          >
            <section className="info-contract findByScroll" id="one">
              <ContractInfo form={form} />
            </section>
            <section className="info-contract findByScroll" id="two">
              <CustomerInfo form={form} disable={disable} setDisable={setDisable} setBusinessContractItem={setBusinessContractItem} businessContractItem={businessContractItem}/>
            </section>
          </Form>
        </div>
      </div>
      {/* </CheckPermission> */}
    </>
  );
};

export default AddBusinessContract;
