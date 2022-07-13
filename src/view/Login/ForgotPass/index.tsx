import { useTranslate } from "@view/shared/hook/useTranslate";
import { common } from "@view/shared/translateKey";
import { Button, Card, } from "antd";
import React, { useCallback, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import "./styles.scss";

import authenticationPresenter from "@modules/authentication/presenter";
import { useAsync } from "@view/shared/hook/useAsync";
import ChangeLanguage from "@view/shared/components/ChangeLanguage";

const logo = require("@view/shared/assets/images/logo.png");

const Login = (props) => {
  const language = localStorage.getItem('__INIT__CURRENT_LANGUAGE__')
  //state
  const [formData, setFormData] = useState({ language: language });
  const [checkErrorEmail, setCheckErrorEmail] = useState<boolean>(false);
  const [checkSuccessEmail, setCheckSuccessEmail] = useState<boolean>(false);

  const history = useHistory();

  const { FORGOT_PASS_TITLE, BACK_SIGNIN, SEND, ERROR_EMAIL, ENTER_EMAIL, PASS_RECOVER, CLICK_LINK } = useTranslate("common");

  const { forgotPass } = authenticationPresenter;
  const [forgotPasscall] = useAsync(forgotPass);
  const handleSubmit = () => {
    forgotPasscall.execute(formData).then((res) => {
      setCheckSuccessEmail(true)
    })
      .catch(err => {
        setCheckErrorEmail(true)
      })
  };

  const handleChange = (e) => {
    const target = e.target;
    const value =
      target.type === "checkbox"
        ? target.checked
        : target.value.substr(0, 50);
    const name = target.name;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleKeyPress = (e) => {
    e.charCode == 13 && handleSubmit();
  };

  return (
    <div className="Authen forgot-password">
      <ChangeLanguage className='label-langue-forgot-pass' />
      <Card >
        <div className="label-logo" >
          <img className='label-logo-forgot' src={logo} />
        </div>
        <div className="Authen_content">
          <div className='mb-3 label-sign'>{FORGOT_PASS_TITLE}</div>
          {
            checkSuccessEmail ? (
              <>
                <div className='label-des-forgotpass mb-3'>{PASS_RECOVER}</div>
                <div className='label-des-forgotpass'>{CLICK_LINK}</div>
              </>
            ) : (
              <>
                <div className='label-des-forgotpass mb-5'>{ENTER_EMAIL}</div>
                <div className='quang-tran-form'>
                  <div className="form-group">
                    <label className='w-100'>Email</label>
                    <input
                      name="email"
                      className={checkErrorEmail === true ? 'err-email' : ''}
                      placeholder="Your email-address"
                      onChange={handleChange}
                      autoComplete="off"
                      required
                      onKeyDown={handleKeyPress}
                    />
                    <div className='text-left'>{checkErrorEmail === true ? (<span className='text-err'>{ERROR_EMAIL}</span>) : ''}</div>
                  </div>
                </div>
                <div className="authen_button">
                  <Button
                    className=" form-signin-submit-btn normal-button"
                    onClick={() => handleSubmit()}
                    loading={forgotPasscall.status == "loading"}
                  >
                    <span className={` `}>{SEND}</span>
                  </Button>
                </div>
              </>
            )
          }
        </div>
      </Card>
      <div>
        <p className="forgot">
          <a onClick={() => history.push("/login")}>{BACK_SIGNIN}</a>
        </p>
      </div>
    </div>
  );
};
export default withRouter(Login);
