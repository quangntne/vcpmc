import { useTranslate } from "@view/shared/hook/useTranslate";
import { common } from "@view/shared/translateKey";
import { Button, Card, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./styles.scss";

import authenticationPresenter from "@modules/authentication/presenter";
import { checkValidSpaces } from "@view/shared/helper/functions";
import { useForm } from "antd/lib/form/Form";
import { useAsync } from "@view/shared/hook/useAsync";
import ChangeLanguage from "@view/shared/components/ChangeLanguage";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const logo = require("@view/shared/assets/images/logo.png");

const Reset = () => {
  //state
  const [checkOTP, setCheckOTP] = useState<Boolean>(true);
  const history = useHistory();
  const [form] = useForm();

  const { resetPass, checkOtb } = authenticationPresenter;

  const [checkOtbCall] = useAsync(checkOtb);

  const [{ execute: resetPasscall, status }] = useAsync(resetPass);

  const { RESETPASS, NEWPASS, CONFIRM_PASS, UPDATE, BACK_SIGNIN, UNABLE_CONNECT, THERE_SEEMS, REQUEST, REQUEST_LINK, UPDATE_PASS } = useTranslate("common");

  const { otp } = useParams<{ otp: any }>();
  console.log('otp', otp);

  useEffect(() => {
    checkOtbCall.execute(otp).then(res => {
      console.log('res', res);
    })
      .catch(err => {
        console.log('err', err);
        setCheckOTP(false)
      })
  }, [])


  const handleFinish = (values) => {
    resetPasscall(values, otp).then((res) => {
      history.push("/login");
    });
  };

  const handleKeyPress = (e) => {
    e.charCode == 13 && form.submit();
  };
  return (
    <div className="Authen quang-tran-form">
      <ChangeLanguage className='label-langue-confirm' />
      <div className="Authen_companyName">
        <img src={logo} className='label-logo-login' />
      </div>
      <div className="Authen_resetpass">
        {
          checkOTP ? (
            <>
              <div className='label-sign'>{RESETPASS}</div>
              <Form
                onFinish={handleFinish}
                form={form}
                className="form-reset-pass"
                layout="vertical"
                autoComplete='off'
              >
                <Form.Item
                  label={NEWPASS}
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input Password!",
                    },
                    {
                      validator: (rule, value) =>
                        checkValidSpaces(rule, value, "userPass"),
                    },
                  ]}
                >
                  <Input.Password className="main-form-reset"
                    iconRender={
                      (visible) => (visible ? <EyeInvisibleOutlined /> : <EyeOutlined />)
                    } />
                </Form.Item>
                <Form.Item
                  label={CONFIRM_PASS}
                  name="confirmPassword"
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: "Please input confirm Password!",
                    },
                    {
                      validator: (rule, value) =>
                        checkValidSpaces(rule, value, "confirmPassword"),
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(
                            "The two passwords that you entered do not match!"
                          )
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    className="main-form-reset"
                    onKeyDown={handleKeyPress}
                    iconRender={
                      (visible) => (visible ? <EyeInvisibleOutlined /> : <EyeOutlined />)
                    } />
                </Form.Item>

                <div className='text-center mt-3'>
                  <Button
                    className="btn-save-form btn-request-repass"
                    onClick={form.submit}
                    loading={status == "loading"}
                  >
                    {UPDATE_PASS}
                  </Button>
                </div>
              </Form>
            </>
          ) : (
            <>
              <div className='label-sign-err'>{UNABLE_CONNECT}</div>
              <div className='mb-5 text-center'>
                <label>
                  <span>
                    {THERE_SEEMS} <br /> {REQUEST}
                  </span>
                </label>
              </div>
              <div className='text-center'>
                <Button
                  className="btn-cancel-form btn-request-repass"
                  // onClick={form.submit}
                  loading={status == "loading"}
                >
                  {REQUEST_LINK}
                </Button>
              </div>
            </>
          )
        }
      </div>
      {
        checkOTP === true ? '' : (
          <div>
            <p className="forgot">
              <a onClick={() => history.push("/login")}>{BACK_SIGNIN}</a>
            </p>
          </div>
        )
      }

    </div>
  );
};
export default Reset;
