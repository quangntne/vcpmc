import DefaultLayout from "src/view/shared/components/layout/index";
import React, { useEffect } from "react";
import { privateRouter } from "../index";
import ShowRouter from "./ShowRouter";
import authenticationPresenter from "@modules/authentication/presenter";
import { useHistory } from "react-router";
import { beKeyToFeKey } from "../../shared/permissionCode/beKeyToFeKey";
import store, { RootState } from "@modules/core/store/redux";
import profileStore, { removeProfile } from "@modules/authentication/profileStore";
import { Selector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "@view/shared/helper/functions";
import mediaCategoriesPresenter from "@modules/mediaCategories/presenter";
import { useAsync } from "@view/shared/hook/useAsync";
import settingStore from "@modules/setting/settingStore";
import RecordGalleryPresenter from "@modules/recordGallery/presenter";
const perMissionCode = require("../../shared/permissionCode/code.json");

interface Props {
  privateLogin?: boolean;
}

interface IPrivatePageSelector {
  token?: string;
  statusLogin?: boolean;
  remember?: boolean
}

const PrivatePageSelector: Selector<RootState, IPrivatePageSelector> = (state: RootState) => {
  return {
    token: state.profile.token,
    statusLogin: state.profile.statusLogin,
    remember: state.profile.remember
  }
}
const { getInfoFromToken, getUserNameFromUserId } = authenticationPresenter;

const PrivatePage: React.FC<Props> = () => {
  const { getListMediaCategories } = mediaCategoriesPresenter;
  const { getListMediaFormat } = RecordGalleryPresenter;
  const [{ execute: getList }] = useAsync(getListMediaCategories);
  const dispatch = useDispatch();
  const history = useHistory();
  const { token, remember } = useSelector(PrivatePageSelector);

  useEffect(() => {
    if (token) {
      getList().then(res => {
        //store.dispatch(settingStore.actions.fetchMediaCategories({ mediaCategories: res?.data }))
      })
      getListMediaFormat().then(res => {
        store.dispatch(settingStore.actions.fetchMediaFormat({ mediaFormat: res }))
      })
      store.dispatch(profileStore.actions.updateProfile({ statusLogin: true }));
      if (getCookie("remember_me") != "true" && !remember) {
        dispatch(removeProfile())
        return;
      }
      getUserNameFromUserId().then(user => {
        dispatch(profileStore.actions.fetchProfile(user))
        const accountInfo = getInfoFromToken(token)
        if (accountInfo != null) {
          const feKey = beKeyToFeKey(perMissionCode.data, accountInfo.Permissions);
          dispatch(profileStore.actions.updateProfile({ listPermissionCode: feKey }));
        }
      })
    } else {
      history.push('/login');
    }
  }, [token]);

  return (
    <DefaultLayout>
      <ShowRouter routers={privateRouter} />
    </DefaultLayout>
  );
};
export default PrivatePage;
