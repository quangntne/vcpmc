import store, { RootState } from "@modules/core/store/redux";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import authenticationPresenter from "@modules/authentication/presenter";
import profileStore, {
  removeProfile,
} from "@modules/authentication/profileStore";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { useTranslate } from "@view/shared/hook/useTranslate";
import { common } from "@view/shared/translateKey";
import User from "@modules/user/entity";
import ModalUploadAvatar from "./ModalUploadAvatar";
import listGroupPresenter from "@modules/listGroup/presenter";
import { useAsync } from "@view/shared/hook/useAsync";
import ChangeLanguage from "../../ChangeLanguage";
import { Selector } from "@reduxjs/toolkit";

interface IHeaderComponent {
  profile?: User;
}

const HeaderComponentSelector: Selector<RootState, IHeaderComponent> = ( state: RootState ) => {
  return {
    profile: state.profile.user,
  };
};

const HeaderComponent = () => {
  const { profile } = useSelector( HeaderComponentSelector );
  const { detailListGroup } = listGroupPresenter;
  const [ detailListGroupcall ] = useAsync( detailListGroup );

  // JUST LOGIN
  const history = useHistory();
  useEffect( () => {
    if ( profile == null ) {
      return;
    }
    const groupId = profile.groupId;
    if ( profile.is_level == 0 ) {
      detailListGroupcall.execute( groupId ).then( ( res ) => {
        const linkImage = res?.groupImage;
        store.dispatch( profileStore.actions.saveImageGroup( linkImage ) );
      } );
    }
  }, [ profile ] );
  if ( profile == null ) {
    return null;
  }

  return (
    <div className="header-component">
      <div className="header-component__language">
        <ChangeLanguage />
      </div>

       <div className="header-component__dropdown"
        onClick={() => history.push("/basic-infor")}>
        {profile?.userAvatar ? (
          <div className="dropdown__profile__img">
            <img alt="" className="" src={profile?.userAvatar} />
          </div>
        ) : (
          <div className="header-component__dropdown-avatar">
            <span className="icon__avatar">
              <i className="fas fa-user" />
            </span>
          </div>
        )}
      </div>
      <div
        className="header-component__identify"
        onClick={ () => history.push( "/basic-infor" ) }
      >
        <h4 className="identify__admin">{ profile.userName }</h4>
        <p className="identify__hi" >
          { profile.role ? profile.role?.roleName : "Admin" }
        </p>
      </div>
    </div>
  );
};

export default HeaderComponent;
