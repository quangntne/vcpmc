import React, { useState } from "react";
import { Tabs } from "antd";
import AuContractList from "@view/AuContract/AuContractList";
import BusinessContract from "@view/BusinessContract";
import { useTranslate } from "@hook/useTranslate";
import { aucontractTranslateKey } from "@translateKey/index";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import CheckPermission from "@hoc/CheckPermission";
import { useRouter } from "@helper/functions";
import TableBusinessContract from "@view/BusinessContract/component/TableBusinessContract";

const { TabPane } = Tabs;

const ContractPage = (props) => {
  const { List_contract, Aut_contract, Aut_mining } = useTranslate(
    "aucontractTranslateKey"
  );
  const router = useRouter();
  const [actKeyTab, setActKeyTab] = useState("1");
  const actK = router.query["actK"];
  return (
    <>
      <MainTitleComponent
        breadcrumbs={[
          {
            name: List_contract,
          },
        ]}
      />
      <div className="w-100 contract-page pb-4 pt-2">
        {/* <CheckPermission permissionCode={"SP_EXPLOITATION_CONTRACT_SHOW"}> */}
          <section className="main-tabs">
            <Tabs
              className="w-100 "
              defaultActiveKey={"1"}
              activeKey={actK != undefined ? actK : actKeyTab}
              onChange={(key) => {
                setActKeyTab(key);
                router.push({ pathname: "/contract", search: `?actK=${key}` });
              }}
            >
              <TabPane tab={Aut_contract} key="1">
                {/* <CheckPermission permissionCode={"AU_CONTRACT_SHOW"}> */}
                  <AuContractList />
                {/* </CheckPermission> */}
              </TabPane>

              <TabPane tab={Aut_mining} key="2">
                {/* <CheckPermission
                  permissionCode={"SP_EXPLOITATION_CONTRACT_SHOW"}
                > */}
                  <TableBusinessContract />
                {/* </CheckPermission> */}
              </TabPane>
            </Tabs>
          </section>
        {/* </CheckPermission> */}
      </div>
    </>
  );
};

export default ContractPage;
