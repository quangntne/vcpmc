import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { businessContractTranslateKey } from "@view/shared/translateKey";
import React from "react";
import TableBusinessContract from "./component/TableBusinessContract";
import CheckPermission from "@hoc/CheckPermission";

const BusinessContract = () => {
  const { CONTRACT_MINIER } = useTranslate("businessContractTranslateKey");
  return (
      // <CheckPermission permissionCode={"SP_EXPLOITATION_CONTRACT_SHOW"}>
          <TableBusinessContract />
      // </CheckPermission>
  );
};

export default BusinessContract;
