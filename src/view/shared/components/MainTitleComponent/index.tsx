import React from "react";
import { useLocation, useParams } from "react-router";
import listNav from "../layout/Sidebar/_nav";
import BreadcumbComponent from "./BreadcumbComponent";
import { memo } from 'react';
import TitleComponent from "./TitleComponent/index";
export interface Breadcrumbs {
  name: string;
  href?: string;
}
interface props {
  classTitle?: string;
  classBreadcumb?: string;
  title?: any;
  detailName?:string;
  breadcrumbs?: Array<Breadcrumbs>;
}
const MainTitleComponent = ({
  classTitle,
  classBreadcumb,
  title,
  detailName = "",
  breadcrumbs,
}: props) => {
  const titleIn = title ? title : breadcrumbs[breadcrumbs.length - 1].name + " " + detailName;

  return (
    <div className="main-title-breadcrum">
      {breadcrumbs ? (
        <BreadcumbComponent
          breadcrumbs={breadcrumbs}
          className={classBreadcumb}
        />
      ) : (
        ""
      )}
      <TitleComponent title={titleIn} className={classTitle} />
    </div>
  );
};

export default memo(MainTitleComponent);
