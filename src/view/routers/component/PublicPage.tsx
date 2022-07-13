import DefaultLayout from "src/view/shared/components/layout/index";
import React, { useEffect } from "react";
import { publicRouter } from "../index";
import ShowRouter from "./ShowRouter";
import authenticationPresenter from "@modules/authentication/presenter";
import { useHistory } from "react-router";

interface Props {
  privateLogin?: boolean;
}

const PublicPage: React.FC<Props> = () => {
  return <ShowRouter routers={publicRouter} />;
};
export default PublicPage;
