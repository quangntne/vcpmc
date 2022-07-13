import React, { useEffect, useMemo, useState } from "react";
import { Tabs } from "antd";
import { useRouter } from "@view/shared/helper/functions";
import UserManager from "./component/UserManager/UserManager";
import Roles from "@view/Roles";
import { routerRole } from "@config/path";
import MainTitleComponent from "@view/shared/components/MainTitleComponent";
import { useTranslate } from "@view/shared/hook/useTranslate";
import "./styles.scss";
const { TabPane } = Tabs;
const UserAndRole = () => {
  const router = useRouter();
  const [actKeyTab, setActKeyTab] = useState("1");
  const actK = useMemo(() => {router.query["action="]}, []);

  const { ROLE, ROLE_SYSTEM, USER, LIST_USER } = useTranslate(
    "roleTranslateKey",
    "sideBarTranslateKey"
  );

  useEffect(() => {

  }, [])

  return (
    <div>
      <MainTitleComponent
        breadcrumbs={[{ name: ROLE_SYSTEM }]}
        title={actKeyTab == "1" ? LIST_USER : ROLE_SYSTEM}
      />
      <div className="main-tabs user-tab">
        <Tabs
          defaultActiveKey={"1"}
          activeKey={actK != undefined ? actK : actKeyTab}
          onChange={(key) => {
            setActKeyTab(key);
            router.push({
              pathname: routerRole.USER_AND_ROLE,
              search: `?action=${key}`,
            });
          }}
        >
          <TabPane tab={LIST_USER} key="1">
            {/* danh sách người dùng  */}
            <UserManager />
          </TabPane>
          <TabPane tab={`${ROLE} ${USER}`} key="2">
            {/* phân quyền  */}
            <Roles />
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default UserAndRole;
