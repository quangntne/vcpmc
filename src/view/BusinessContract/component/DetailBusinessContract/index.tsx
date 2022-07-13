import { routerBusinessContract } from "@config/path";
import BusinessContractEntity from "@modules/businessContract/entity";
import businessContractPresenter from "@modules/businessContract/presenter";
import RightMenu, { IArrayAction } from "@view/shared/components/layout/RightMenu";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import { useAsync } from "@view/shared/hook/useAsync";
import React, { useEffect, useMemo, useState } from "react";
import { useHistory, useParams } from "react-router";
import DetailContractInfo from "./DetailContractInfo";
import DetailCustomerInfo from "./DetailCustomerInfo";
import { DeleteConfirm } from "@view/shared/components/ConfirmDelete";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { businessContractTranslateKey, common } from "@view/shared/translateKey";
import { useDispatch } from "react-redux";
import { updateBusinessContractDay, updateBusinessContractForEdit, updateBusinessContractType, updateBusinessContractValue } from "@modules/businessContract/businessContractStore";
import moment from "moment";
import "./styles.scss";
import ModalCancelBusinessContract from "@view/BusinessContract/component/ModalCancelBusinessContract";

const DetailBusinessContract = () => {
  const [getDetail] = useAsync(
    businessContractPresenter.getDetailBusinessContract
  );
  const [deleteBusinessContract] = useAsync(
    businessContractPresenter.deleteBusinessContract
  );
  const [
    businessContractItem,
    setBusinessContractItem,
  ] = useState<BusinessContractEntity>(null);

  const { CONTRACT_MINIER, CONTRACT, CANCEL, DELETE, SURE_DELETE, DETAIL, ADD, EDIT } = useTranslate("businessContractTranslateKey", "common");
  const history = useHistory();
  const breadcrumbs = [
    {
      name: CONTRACT_MINIER,
      href: routerBusinessContract.BUSINESS_CONTRACT,
    },
    {
      name: `${DETAIL} ${CONTRACT_MINIER}`,
    },
  ];
  const param: { businessId: string } = useParams();
  const [visible, setVisible] = useState(false)
  const paramUseMemo = useMemo(
    () => {
      getDetail.execute(param.businessId).then((res: BusinessContractEntity) => {
        setBusinessContractItem(res);
      })

    },
    [param]
  );
  const now = moment().endOf("day");
  const timeStart = moment(businessContractItem?.businessContractStart);
  const timeEnd = moment(businessContractItem?.businessContractEnd);
  const ve1 = timeStart > now;
  const ve2 = timeEnd < now;
  const ve3 = (ve1 && ve2) || businessContractItem?.businessContractStatus == 0 || (timeStart < now && timeEnd < now) || (timeStart > now && timeEnd > now);

  const arrayActionRight: IArrayAction[] = [
    {
      iconType: "edit",
      name: `${EDIT} ${CONTRACT}`,
      handleAction: () => {
        history.push(routerBusinessContract.EDIT_BUSINESS_CONTRACT + "/" + param.businessId);
      },
      disable: timeStart < now
      // permissionCode: "SP_EXPLOITATION_CONTRACT_CREATE",
    },
    {
      iconType: "cancel",
      name: `${CANCEL} ${CONTRACT}`,
      handleAction: () => {
        setVisible(true);
      },
      disable: ve3
    },
    {
      iconType: "delete",
      name: `${DELETE} ${CONTRACT}`,
      handleAction: () => {
        DeleteConfirm({
          title: `${DELETE}?`,
          content: `${SURE_DELETE} ${businessContractItem.businessContractName} ?`,
          handleOk: () =>
            deleteBusinessContract.execute(
              businessContractItem.businessContractId
            ).then(res => {
              history.push(routerBusinessContract.BUSINESS_CONTRACT)
            })
          ,
          handleCancel: () => { },
        });
      },
      disable: timeStart < now
    },
  ];
const onFinishReason = (values) => {
  if (businessContractItem?.businessContractId) {
    deleteBusinessContract.execute(
      businessContractItem?.businessContractId, values
    ).then(res => {
      history.push(routerBusinessContract.BUSINESS_CONTRACT)
    })
  }
};
  return (
    <div className="info-contract-detail">
      <MainTitleComponent
        breadcrumbs={breadcrumbs}
        title={`${DETAIL} ${CONTRACT_MINIER} ${businessContractItem?.businessContractName}`}
      />
      <RightMenu arrayAction={arrayActionRight} />
      <section className="info-contract-detail-form pb-5">
        <div className="form-contract">
          <section className="info-contract" id="one">
            <DetailContractInfo businessContractItem={businessContractItem} />
          </section>
          <section className="info-contract-author" id="two">
            <DetailCustomerInfo businessContractItem={businessContractItem} />
          </section>
        </div>
      </section>
      <ModalCancelBusinessContract visible={visible} setVisible={setVisible} onFinishReason={onFinishReason} mainTitle={`Huỷ hợp đồng khai thác ${businessContractItem?.businessContractName}`}
      placeholderTitle={`${CONTRACT} ${businessContractItem?.businessContractName}`}
      />
    </div>
  );
};

export default DetailBusinessContract;
